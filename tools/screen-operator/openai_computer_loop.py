import base64
import json
import os
from pathlib import Path

import requests
from openai import OpenAI

# --- Config ---
MODEL = os.getenv("SCREEN_OPERATOR_MODEL", "gpt-5")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OP_TOKEN = os.getenv("SCREEN_OPERATOR_TOKEN", "")
OP_BASE = os.getenv("SCREEN_OPERATOR_BASE", "http://127.0.0.1:8787")
MAX_STEPS = int(os.getenv("SCREEN_OPERATOR_MAX_STEPS", "25"))

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is required")
if not OP_TOKEN:
    raise RuntimeError("SCREEN_OPERATOR_TOKEN is required")

client = OpenAI(api_key=OPENAI_API_KEY)
HEADERS = {"Authorization": f"Bearer {OP_TOKEN}", "Content-Type": "application/json"}


def op_get_health():
    r = requests.get(f"{OP_BASE}/health", timeout=15)
    r.raise_for_status()
    return r.json()


def op_post(path: str, payload: dict):
    r = requests.post(f"{OP_BASE}{path}", headers=HEADERS, json=payload, timeout=20)
    r.raise_for_status()
    return r.json()


def capture_screenshot(step: int) -> str:
    out = str(Path(__file__).resolve().parent / "shots" / f"step-{step:03d}.png")
    Path(out).parent.mkdir(parents=True, exist_ok=True)
    op_post("/screen/screenshot", {"path": out})
    return out


def b64_image(path: str) -> str:
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def execute_action(action: dict):
    kind = action.get("kind")
    if kind == "click":
        return op_post("/mouse/click", {"x": int(action["x"]), "y": int(action["y"]), "button": action.get("button", "left")})
    if kind == "move":
        return op_post("/mouse/move", {"x": int(action["x"]), "y": int(action["y"]), "durationMs": int(action.get("durationMs", 0))})
    if kind == "type":
        return op_post("/keyboard/type", {"text": action.get("text", ""), "intervalMs": int(action.get("intervalMs", 0))})
    if kind == "press":
        return op_post("/keyboard/press", {"key": action.get("key", "enter"), "presses": int(action.get("presses", 1))})
    if kind == "hotkey":
        return op_post("/keyboard/hotkey", {"keys": action.get("keys", [])})
    if kind == "done":
        return {"ok": True, "done": True, "reason": action.get("reason", "task complete")}
    return {"ok": False, "error": f"unknown action kind: {kind}"}


def prompt_for_actions(user_goal: str, image_b64: str, health: dict, history: list):
    system = (
        "You control a Windows desktop through a local tool API. "
        "Return STRICT JSON only with this schema: {\"actions\":[...]} where each action has kind in "
        "[click,move,type,press,hotkey,done]. For click/move include x,y integers in screen bounds. "
        "Use minimal safe steps. If task is complete, return done."
    )

    user = {
        "goal": user_goal,
        "screen": health.get("screen", {}),
        "bounds": health.get("bounds", {}),
        "history": history[-8:],
        "required_output_example": {
            "actions": [
                {"kind": "click", "x": 100, "y": 100},
                {"kind": "type", "text": "example"},
                {"kind": "done", "reason": "finished"},
            ]
        },
    }

    resp = client.responses.create(
        model=MODEL,
        input=[
            {"role": "system", "content": system},
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": json.dumps(user)},
                    {"type": "input_image", "image_url": f"data:image/png;base64,{image_b64}"},
                ],
            },
        ],
    )

    text = (resp.output_text or "").strip()
    if text.startswith("```"):
        text = text.strip("`")
        if text.lower().startswith("json"):
            text = text[4:].strip()
    return json.loads(text)


def run(goal: str):
    health = op_get_health()
    history = []

    for step in range(1, MAX_STEPS + 1):
        shot = capture_screenshot(step)
        actions_obj = prompt_for_actions(goal, b64_image(shot), health, history)
        actions = actions_obj.get("actions", [])

        if not actions:
            history.append({"step": step, "error": "no actions returned"})
            continue

        for action in actions:
            result = execute_action(action)
            history.append({"step": step, "action": action, "result": result})
            if action.get("kind") == "done":
                print(json.dumps({"ok": True, "history": history}, indent=2))
                return

    print(json.dumps({"ok": False, "error": "max steps reached", "history": history}, indent=2))


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("goal", help="What to do on the computer")
    args = parser.parse_args()
    run(args.goal)
