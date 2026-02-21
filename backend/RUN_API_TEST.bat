@echo off
echo ========================================
echo Testing API Keys
echo ========================================
echo.

if not exist venv (
    echo ERROR: Virtual environment not found!
    echo Please run TEST_INSTALLATION.bat first.
    pause
    exit /b 1
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Running API tests...
echo.
python test_api_keys.py

echo.
pause
