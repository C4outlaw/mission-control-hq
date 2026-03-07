import os
from typing import List, Optional

import pyautogui
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Screen Operator", version="0.1.0")
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.05

TOKEN = os.getenv("SCREEN_OPERATOR_TOKEN", "")
HOST = os.getenv("SCREEN_OPERATOR_HOST", "127.0.0.1")
PORT = int(os.getenv("SCREEN_OPERATOR_PORT", "8787"))

MIN_X = int(os.getenv("SCREEN_OPERATOR_MIN_X", "0"))
MIN_Y = int(os.getenv("SCREEN_OPERATOR_MIN_Y", "0"))
MAX_X = int(os.getenv("SCREEN_OPERATOR_MAX_X", str(pyautogui.size().width - 1)))
MAX_Y = int(os.getenv("SCREEN_OPERATOR_MAX_Y", str(pyautogui.size().height - 1)))


class Point(BaseModel):
    x: int
    y: int
    durationMs: Optional[int] = 0


class Click(BaseModel):
    x: int
    y: int
    button: Optional[str] = "left"
    clicks: Optional[int] = 1


class TypeText(BaseModel):
    text: str
    intervalMs: Optional[int] = 0


class PressKey(BaseModel):
    key: str
    presses: Optional[int] = 1


class Hotkey(BaseModel):
    keys: List[str]


class Shot(BaseModel):
    path: str


def auth(authorization: Optional[str]):
    if not TOKEN:
      raise HTTPException(status_code=500, detail="SCREEN_OPERATOR_TOKEN not configured")
    if not authorization or not authorization.startswith("Bearer "):
      raise HTTPException(status_code=401, detail="Missing bearer token")
    if authorization.split(" ", 1)[1] != TOKEN:
      raise HTTPException(status_code=403, detail="Invalid token")


def check_bounds(x: int, y: int):
    if x < MIN_X or y < MIN_Y or x > MAX_X or y > MAX_Y:
        raise HTTPException(status_code=400, detail=f"Coordinates out of allowed bounds ({MIN_X},{MIN_Y})-({MAX_X},{MAX_Y})")


@app.get("/health")
def health():
    w, h = pyautogui.size()
    return {"ok": True, "screen": {"width": w, "height": h}, "bounds": {"minX": MIN_X, "minY": MIN_Y, "maxX": MAX_X, "maxY": MAX_Y}}


@app.post("/mouse/move")
def mouse_move(body: Point, authorization: Optional[str] = Header(default=None)):
    auth(authorization)
    check_bounds(body.x, body.y)
    pyautogui.moveTo(body.x, body.y, duration=max(0, body.durationMs or 0) / 1000)
    return {"ok": True}


@app.post("/mouse/click")
def mouse_click(body: Click, authorization: Optional[str] = Header(default=None)):
    auth(authorization)
    check_bounds(body.x, body.y)
    pyautogui.click(x=body.x, y=body.y, button=body.button or "left", clicks=max(1, body.clicks or 1))
    return {"ok": True}


@app.post("/keyboard/type")
def keyboard_type(body: TypeText, authorization: Optional[str] = Header(default=None)):
    auth(authorization)
    pyautogui.write(body.text, interval=max(0, body.intervalMs or 0) / 1000)
    return {"ok": True}


@app.post("/keyboard/press")
def keyboard_press(body: PressKey, authorization: Optional[str] = Header(default=None)):
    auth(authorization)
    pyautogui.press(body.key, presses=max(1, body.presses or 1))
    return {"ok": True}


@app.post("/keyboard/hotkey")
def keyboard_hotkey(body: Hotkey, authorization: Optional[str] = Header(default=None)):
    auth(authorization)
    if not body.keys:
        raise HTTPException(status_code=400, detail="No keys provided")
    pyautogui.hotkey(*body.keys)
    return {"ok": True}


@app.post("/screen/screenshot")
def screenshot(body: Shot, authorization: Optional[str] = Header(default=None)):
    auth(authorization)
    os.makedirs(os.path.dirname(body.path), exist_ok=True)
    img = pyautogui.screenshot()
    img.save(body.path)
    return {"ok": True, "path": body.path}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=HOST, port=PORT)
