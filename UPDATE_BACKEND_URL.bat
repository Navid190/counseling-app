@echo off
setlocal enabledelayedexpansion

echo ===============================================
echo   Update Backend URL for Mobile Access
echo ===============================================
echo.
echo Enter your ngrok BACKEND URL (without /api):
echo Example: https://abc123.ngrok.io
echo.
set /p BACKEND_URL="Backend URL: "

if "%BACKEND_URL%"=="" (
    echo [ERROR] No URL provided!
    pause
    exit /b 1
)

REM Remove trailing slash if present
if "%BACKEND_URL:~-1%"=="/" set BACKEND_URL=%BACKEND_URL:~0,-1%

echo.
echo Updating frontend/index.html...

REM Create a temporary PowerShell script to update the file
echo $content = Get-Content "frontend/index.html" -Raw > tmp_update.ps1
echo $content = $content -replace "// window.BACKEND_URL = 'https://YOUR-BACKEND-URL.ngrok.io/api';", "window.BACKEND_URL = '%BACKEND_URL%/api';" >> tmp_update.ps1
echo $content = $content -replace "window.BACKEND_URL = 'https://.*?/api';", "window.BACKEND_URL = '%BACKEND_URL%/api';" >> tmp_update.ps1
echo Set-Content "frontend/index.html" $content >> tmp_update.ps1

powershell -ExecutionPolicy Bypass -File tmp_update.ps1
del tmp_update.ps1

echo.
echo ===============================================
echo   Backend URL Updated Successfully!
echo ===============================================
echo.
echo Configuration: window.BACKEND_URL = '%BACKEND_URL%/api'
echo.
echo You can now access the app on your mobile device!
echo.
echo To RESET for local development, run: RESET_TO_LOCAL.bat
echo.
pause
