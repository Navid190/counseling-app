@echo off
echo ========================================
echo Ngrok Mobile Testing Setup
echo ========================================
echo.
echo STEP 1: Make sure the backend and frontend are running first!
echo Run RUN_APP.bat before this script.
echo.
echo STEP 2: This will open TWO ngrok tunnels:
echo - One for Frontend (port 5173)
echo - One for Backend (port 5174)
echo.
echo STEP 3: Update the API_BASE_URL in frontend/app.js
echo with your ngrok backend URL before accessing on mobile.
echo.
pause

echo.
echo Starting Frontend ngrok tunnel...
start cmd /k "cd C:\ngrok\ngrok-v3-stable-windows-amd64 && ngrok http 5173"

timeout /t 2

echo Starting Backend ngrok tunnel...
start cmd /k "cd C:\ngrok\ngrok-v3-stable-windows-amd64 && ngrok http 5174"

echo.
echo ========================================
echo Ngrok tunnels are starting!
echo.
echo Remember to:
echo 1. Copy the Backend ngrok URL
echo 2. Update API_BASE_URL in frontend/app.js
echo 3. Access Frontend ngrok URL on your mobile
echo ========================================
pause
