@echo off
chcp 65001 >nul
echo ========================================
echo NAG AI - Simple Mobile Setup
echo ========================================
echo.
echo IMPORTANT: Make sure backend and frontend are already running!
echo If not, press Ctrl+C and run START_BACKEND.bat and START_FRONTEND.bat first.
echo.
pause

echo.
echo Checking for existing ngrok processes...
taskkill /F /IM ngrok.exe >nul 2>&1
timeout /t 2 >nul

echo.
echo Starting ngrok for Backend (port 5174)...
start "NAG AI - ngrok Backend" cmd /k "cd /d C:\ngrok\ngrok-v3-stable-windows-amd64 && ngrok http 5174"
timeout /t 5 >nul

echo.
echo Starting ngrok for Frontend (port 5173)...
start "NAG AI - ngrok Frontend" cmd /k "cd /d C:\ngrok\ngrok-v3-stable-windows-amd64 && ngrok http 5173"
timeout /t 3 >nul

echo.
echo ========================================
echo INSTRUCTIONS:
echo ========================================
echo.
echo 1. Look at the "NAG AI - ngrok Backend" window
echo    Copy the URL like: https://xxxxx.ngrok-free.dev
echo.
echo 2. Open a NEW CMD and run:
echo    cd C:\xampp\htdocs\counseling-app
echo    UPDATE_NGROK_URL.bat
echo    Paste the backend URL when asked
echo.
echo 3. Look at the "NAG AI - ngrok Frontend" window
echo    Copy that URL
echo.
echo 4. Open that frontend URL on your mobile!
echo.
echo ========================================
pause
