param(
  [string]$Caption = "Mission Control local automation test ✅",
  [string]$LogPath = "C:\Users\email\.openclaw\workspace\mission-control\automation\facebook-post-test.log"
)

$ErrorActionPreference = 'Stop'
$py = "C:\Users\email\.openclaw\workspace\mission-control\automation\tmp_fb_post_test.py"

@"
import time, subprocess, importlib.util, pyperclip
mod_path = r"C:\Users\email\.openclaw\workspace\skills\desktop-control\__init__.py"
spec = importlib.util.spec_from_file_location("desktop_control_skill", mod_path)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
DesktopController = mod.DesktopController

text = r'''$Caption'''
subprocess.Popen(["cmd","/c","start","","chrome","https://www.facebook.com"], shell=False)
time.sleep(5)
ctrl = DesktopController(failsafe=True, require_approval=False)
ctrl.hotkey('ctrl','l')
ctrl.type_text('https://www.facebook.com')
ctrl.press('enter')
time.sleep(6)
ctrl.click(int(ctrl.screen_width*0.43), int(ctrl.screen_height*0.34))
time.sleep(1.2)
pyperclip.copy(text)
ctrl.hotkey('ctrl','v')
time.sleep(1)
ctrl.hotkey('ctrl','enter')
time.sleep(2)
print('done')
"@ | Set-Content -Encoding UTF8 $py

"[$(Get-Date -Format s)] starting" | Out-File -FilePath $LogPath -Append -Encoding utf8
py $py *>> $LogPath
"[$(Get-Date -Format s)] finished" | Out-File -FilePath $LogPath -Append -Encoding utf8
Write-Host "Facebook local post test executed. Log: $LogPath"
