@echo off
echo ===============================================
echo   AI Counseling App - Mobile Setup Helper
echo ===============================================
echo.

REM Check if ngrok is installed
where ngrok >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] ngrok not found!
    echo Please install ngrok from https://ngrok.com/download
    echo.
    pause
    exit /b 1
)

echo Step 1: Starting Backend Server...
echo.
start "Backend Server" cmd /k "cd backend && .\venv\Scripts\Activate.ps1 && python main.py"
timeout /t 3 /nobreak >nul

echo Step 2: Starting Frontend Server...
echo.
start "Frontend Server" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo Step 3: Starting ngrok for Backend (Port 5174)...
echo.
start "ngrok Backend" cmd /k "ngrok http 5174"
timeout /t 3 /nobreak >nul

echo Step 4: Starting ngrok for Frontend (Port 5173)...
echo.
start "ngrok Frontend" cmd /k "ngrok http 5173"
timeout /t 3 /nobreak >nul

echo.
echo ===============================================
echo   All services started!
echo ===============================================
echo.
echo NEXT STEPS:
echo 1. Check the "ngrok Backend" window for your backend URL
echo    (Should look like: https://abc123.ngrok.io)
echo.
echo 2. Open frontend/index.html and update line 120:
echo    window.BACKEND_URL = 'https://YOUR-BACKEND-URL.ngrok.io/api';
echo    Replace YOUR-BACKEND-URL with the backend URL from step 1
echo.
echo 3. Check the "ngrok Frontend" window for your frontend URL
echo.
echo 4. Open the frontend URL on your mobile device!
echo.
echo ===============================================
echo.
pause
