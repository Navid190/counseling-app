@echo off
echo ========================================
echo AI Counseling App - Installation Test
echo ========================================
echo.

echo [1/5] Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)
echo OK: Python found
echo.

echo [2/5] Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)
echo OK: Node.js found
echo.

echo [3/5] Checking npm installation...
npm --version
if errorlevel 1 (
    echo ERROR: npm is not installed
    pause
    exit /b 1
)
echo OK: npm found
echo.

echo [4/5] Setting up backend...
cd backend
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
echo Activating venv and installing dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)
echo OK: Backend dependencies installed
cd ..
echo.

echo [5/5] Setting up frontend...
cd frontend
echo Installing Node.js dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)
echo OK: Frontend dependencies installed
cd ..
echo.

echo ========================================
echo Installation Test Complete!
echo All components are ready.
echo.
echo Next steps:
echo 1. Run RUN_APP.bat to start the application
echo 2. Run NGROK_SETUP.bat for mobile testing
echo ========================================
pause
