#Requires AutoHotkey v2.0
#SingleInstance Force

; FB Post Macro (Chrome)
; Hotkey: Ctrl + Alt + F
; Assumes user is already logged in to Facebook in Chrome.

^!f:: {
    try {
        ; Step 1: Collect inputs
        imagePath := InputBox("Enter full image path to upload:", "Facebook Post Macro", "w460 h140")
        if (imagePath.Result != "OK" || Trim(imagePath.Value) = "") {
            MsgBox "Canceled (no image path)."
            return
        }

        caption := InputBox("Enter caption text:", "Facebook Post Macro", "w520 h220")
        if (caption.Result != "OK") {
            MsgBox "Canceled."
            return
        }

        ; Step 2: Bring Chrome + Facebook front
        if !WinExist("ahk_exe chrome.exe") {
            Run "chrome.exe https://www.facebook.com"
            Sleep 5000
        } else {
            WinActivate "ahk_exe chrome.exe"
            Sleep 500
            Send "^l"
            Sleep 120
            SendText "https://www.facebook.com"
            Send "{Enter}"
            Sleep 4500
        }

        ; Step 3: Open composer area (screen-relative click)
        ; Tuned for 1920x1080; adjust if needed.
        ; Approx 'What\'s on your mind?' area on Home feed.
        Click 820, 365
        Sleep 1800

        ; Step 4: Click Photo/video button in composer dialog
        Click 825, 700
        Sleep 1700

        ; Step 5: File picker -> paste image path -> Enter
        A_Clipboard := Trim(imagePath.Value)
        Sleep 120
        Send "^v"
        Sleep 150
        Send "{Enter}"
        Sleep 3500

        ; Step 6: Focus text box and paste caption
        Click 840, 425
        Sleep 180
        A_Clipboard := caption.Value
        Sleep 120
        Send "^v"
        Sleep 700

        ; Step 7: Try posting (click Post button area)
        Click 1210, 745
        Sleep 1200

        MsgBox "Post flow executed. Please confirm it published on timeline."
    } catch Error as e {
        MsgBox "Macro error: " e.Message
    }
}
