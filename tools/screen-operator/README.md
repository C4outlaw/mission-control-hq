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

## Run
```powershell
cd tools\screen-operator
py -m pip install -r requirements.txt
$env:SCREEN_OPERATOR_TOKEN="set-a-long-random-token"
py server.py
```

## Example
```powershell
$h=@{Authorization="Bearer $env:SCREEN_OPERATOR_TOKEN";"Content-Type"="application/json"}
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8787/mouse/click -Headers $h -Body '{"x":500,"y":400}'
```
