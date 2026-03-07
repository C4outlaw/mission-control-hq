param(
  [string]$ProjectPath = "C:\Users\email\.openclaw\workspace\mission-control"
)

$ErrorActionPreference = 'Stop'

Push-Location $ProjectPath
try {
  Write-Host "Running lint..."
  npm run lint

  Write-Host "Running production build..."
  npm run build

  Write-Host "Quality gate passed."
}
finally {
  Pop-Location
}
