@echo off
echo ========================================
echo AI School Counseling Application
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd backend && .\venv\Scripts\Activate.ps1 && python main.py"

timeout /t 3

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Application is starting...
echo Backend: http://localhost:5174
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit this window...
pause
