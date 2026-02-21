@echo off
echo ===============================================
echo   Reset to Local Development Mode
echo ===============================================
echo.
echo Resetting frontend/index.html to use local proxy...

REM Create a temporary PowerShell script to reset the file
echo $content = Get-Content "frontend/index.html" -Raw > tmp_reset.ps1
echo $content = $content -replace "window.BACKEND_URL = 'https://.*?/api';", "// window.BACKEND_URL = 'https://YOUR-BACKEND-URL.ngrok.io/api';" >> tmp_reset.ps1
echo Set-Content "frontend/index.html" $content >> tmp_reset.ps1

powershell -ExecutionPolicy Bypass -File tmp_reset.ps1
del tmp_reset.ps1

echo.
echo ===============================================
echo   Reset Complete!
echo ===============================================
echo.
echo The app is now configured for local development.
echo API calls will use the Vite proxy (/api -^> localhost:5174/api)
echo.
pause
