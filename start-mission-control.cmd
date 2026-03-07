@echo off
cd /d C:\Users\email\.openclaw\workspace\mission-control
start "Mission Control" powershell -NoProfile -NonInteractive -WindowStyle Hidden -Command "npm run dev -- --port 3002"
timeout /t 4 >nul
start "" http://127.0.0.1:3002
