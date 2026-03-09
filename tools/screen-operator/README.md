# Screen Operator (Local)

Local-only screen control microservice for autonomous click/type workflows.

## Security model
- Binds to `127.0.0.1` only by default.
- Requires bearer token in `SCREEN_OPERATOR_TOKEN`.
- Optional coordinate allow-box via env to avoid accidental clicks.

## Endpoints
- `GET /health`
- `POST /mouse/move`
- `POST /mouse/click`
- `POST /keyboard/type`
- `POST /keyboard/press`
- `POST /keyboard/hotkey`
- `POST /screen/screenshot`

## Run (FastAPI mode)
```powershell
cd tools\screen-operator
py -m pip install -r requirements.txt
$env:SCREEN_OPERATOR_TOKEN="set-a-long-random-token"
py server.py
```

## Run (No extra deps mode - recommended fallback)
If Python package builds fail, use stdlib server:
```powershell
cd tools\screen-operator
$env:SCREEN_OPERATOR_TOKEN="set-a-long-random-token"
py server_stdlib.py
```

## Example
```powershell
$h=@{Authorization="Bearer $env:SCREEN_OPERATOR_TOKEN";"Content-Type"="application/json"}
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8787/mouse/click -Headers $h -Body '{"x":500,"y":400}'
```

## OpenAI computer-use loop wiring (autonomous)
A ready loop is included at `openai_computer_loop.py`.

1) Start screen operator (recommended stdlib mode):
```powershell
$env:SCREEN_OPERATOR_TOKEN="set-a-long-random-token"
py server_stdlib.py
```

2) In another terminal, set OpenAI key + run goal:
```powershell
$env:OPENAI_API_KEY="your_openai_key"
$env:SCREEN_OPERATOR_TOKEN="set-a-long-random-token"
py openai_computer_loop.py "Open Facebook and search for ABC News"
```

The loop captures screenshots, asks model for JSON actions, executes via local API, and stops on `done`.
