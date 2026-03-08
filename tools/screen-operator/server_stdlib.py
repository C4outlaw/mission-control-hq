import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

import pyautogui

pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.05

TOKEN = os.getenv("SCREEN_OPERATOR_TOKEN", "")
HOST = os.getenv("SCREEN_OPERATOR_HOST", "127.0.0.1")
PORT = int(os.getenv("SCREEN_OPERATOR_PORT", "8787"))

MIN_X = int(os.getenv("SCREEN_OPERATOR_MIN_X", "0"))
MIN_Y = int(os.getenv("SCREEN_OPERATOR_MIN_Y", "0"))
MAX_X = int(os.getenv("SCREEN_OPERATOR_MAX_X", str(pyautogui.size().width - 1)))
MAX_Y = int(os.getenv("SCREEN_OPERATOR_MAX_Y", str(pyautogui.size().height - 1)))


def in_bounds(x, y):
    return MIN_X <= x <= MAX_X and MIN_Y <= y <= MAX_Y


class Handler(BaseHTTPRequestHandler):
    def _json(self, code, payload):
        data = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _auth(self):
        if not TOKEN:
            self._json(500, {"ok": False, "error": "SCREEN_OPERATOR_TOKEN not configured"})
            return False
        auth = self.headers.get("Authorization", "")
        if auth != f"Bearer {TOKEN}":
            self._json(401, {"ok": False, "error": "Unauthorized"})
            return False
        return True

    def do_GET(self):
        if self.path == "/health":
            w, h = pyautogui.size()
            self._json(200, {"ok": True, "screen": {"width": w, "height": h}, "bounds": {"minX": MIN_X, "minY": MIN_Y, "maxX": MAX_X, "maxY": MAX_Y}})
            return
        self._json(404, {"ok": False, "error": "not found"})

    def do_POST(self):
        if not self._auth():
            return
        length = int(self.headers.get("Content-Length", "0"))
        body_raw = self.rfile.read(length) if length else b"{}"
        try:
            body = json.loads(body_raw.decode("utf-8") or "{}")
        except Exception:
            self._json(400, {"ok": False, "error": "invalid json"})
            return

        try:
            if self.path == "/mouse/move":
                x, y = int(body["x"]), int(body["y"])
                if not in_bounds(x, y):
                    raise ValueError("out of bounds")
                pyautogui.moveTo(x, y, duration=max(0, int(body.get("durationMs", 0))) / 1000)
                self._json(200, {"ok": True})
                return

            if self.path == "/mouse/click":
                x, y = int(body["x"]), int(body["y"])
                if not in_bounds(x, y):
                    raise ValueError("out of bounds")
                button = body.get("button", "left")
                clicks = max(1, int(body.get("clicks", 1)))
                pyautogui.click(x=x, y=y, button=button, clicks=clicks)
                self._json(200, {"ok": True})
                return

            if self.path == "/keyboard/type":
                text = str(body.get("text", ""))
                interval = max(0, int(body.get("intervalMs", 0))) / 1000
                pyautogui.write(text, interval=interval)
                self._json(200, {"ok": True})
                return

            if self.path == "/keyboard/press":
                key = str(body.get("key", ""))
                presses = max(1, int(body.get("presses", 1)))
                pyautogui.press(key, presses=presses)
                self._json(200, {"ok": True})
                return

            if self.path == "/keyboard/hotkey":
                keys = body.get("keys", [])
                if not keys:
                    raise ValueError("no keys")
                pyautogui.hotkey(*keys)
                self._json(200, {"ok": True})
                return

            if self.path == "/screen/screenshot":
                path = str(body.get("path", "")).strip()
                if not path:
                    raise ValueError("path required")
                os.makedirs(os.path.dirname(path), exist_ok=True)
                pyautogui.screenshot().save(path)
                self._json(200, {"ok": True, "path": path})
                return

            self._json(404, {"ok": False, "error": "not found"})
        except Exception as e:
            self._json(400, {"ok": False, "error": str(e)})


if __name__ == "__main__":
    print(f"Screen Operator stdlib listening on http://{HOST}:{PORT}")
    HTTPServer((HOST, PORT), Handler).serve_forever()
