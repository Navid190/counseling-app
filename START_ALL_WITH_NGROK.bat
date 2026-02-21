@echo off
chcp 65001 >nul
echo ========================================
echo Starting NAG AI App with ngrok
echo ========================================
echo.
echo This will open 5 windows:
echo 1. Backend Server
echo 2. Frontend Server
echo 3. ngrok Backend
echo 4. ngrok Frontend
echo 5. Instructions
echo.
pause

:: Start Backend
echo Starting Backend Server...
start "NAG AI - Backend" cmd /k "cd /d C:\xampp\htdocs\counseling-app && START_BACKEND.bat"
timeout /t 3 >nul

:: Start Frontend
echo Starting Frontend Server...
start "NAG AI - Frontend" cmd /k "cd /d C:\xampp\htdocs\counseling-app && START_FRONTEND.bat"
timeout /t 3 >nul

:: Start ngrok for Backend
echo Starting ngrok for Backend (5174)...
start "NAG AI - ngrok Backend" cmd /k "cd /d C:\ngrok\ngrok-v3-stable-windows-amd64 && ngrok http 5174"
timeout /t 3 >nul

:: Start ngrok for Frontend
echo Starting ngrok for Frontend (5173)...
start "NAG AI - ngrok Frontend" cmd /k "cd /d C:\ngrok\ngrok-v3-stable-windows-amd64 && ngrok http 5173"
timeout /t 2 >nul

:: Show instructions
start "NAG AI - Instructions" cmd /k "cd /d C:\xampp\htdocs\counseling-app && type NGROK_INSTRUCTIONS.txt && echo. && pause"

echo.
echo ========================================
echo All windows opened!
echo Follow the instructions window.
echo ========================================
pause
