@echo off
echo ===============================================
echo   Starting Counseling App for Tablet Access
echo ===============================================
echo.

REM Start Backend
echo [1/3] Starting Flask Backend...
start "Backend Server" cmd /k "cd backend && venv\Scripts\activate && python main.py"
timeout /t 3 /nobreak >nul

REM Start Frontend
echo [2/3] Starting Vite Frontend...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

REM Start ngrok
echo [3/3] Starting ngrok tunnel...
start "Ngrok Tunnel" cmd /k "ngrok http 5173"
timeout /t 5 /nobreak >nul

echo.
echo ===============================================
echo   All services started!
echo ===============================================
echo.
echo Getting your tablet URL...
timeout /t 3 /nobreak >nul

REM Get ngrok URL
powershell -Command "$url = (Invoke-RestMethod http://127.0.0.1:4040/api/tunnels).tunnels[0].public_url; Write-Host ''; Write-Host '========================================' -ForegroundColor Cyan; Write-Host '  YOUR TABLET URL:' -ForegroundColor Green; Write-Host '========================================' -ForegroundColor Cyan; Write-Host ''; Write-Host $url -ForegroundColor Yellow; Write-Host ''; Write-Host 'Open this URL on your tablet!' -ForegroundColor White; Write-Host '========================================' -ForegroundColor Cyan; Write-Host ''"

echo.
echo Press any key to return to menu...
pause >nul
