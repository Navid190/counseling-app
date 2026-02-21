@echo off
echo ======================================
echo    NAG AI - Launch Application
echo    New Path to Growth
echo ======================================
echo.

REM Get the directory where the batch file is located
set "SCRIPT_DIR=%~dp0"
set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

REM Check if Python is available for serving
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python not found. Trying to open directly...
    echo.
    echo Opening index.html in your default browser...
    start "" "%SCRIPT_DIR%\index.html"
) else (
    echo Starting local server on port 8080...
    echo.
    echo The app will open at: http://localhost:8080/financial-app/index.html
    echo.
    echo Press Ctrl+C to stop the server when done.
    echo.
    cd /d "%SCRIPT_DIR%"
    start "" http://localhost:8080/financial-app/index.html
    python -m http.server 8080
)

echo.
echo If the app doesn't open automatically, please open your browser and go to:
echo http://localhost:8080/financial-app/index.html
echo.
pause
