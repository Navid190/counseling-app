@echo off
echo ========================================
echo Starting Backend Server
echo ========================================
echo.

cd backend

if not exist venv (
    echo ERROR: Virtual environment not found!
    echo Creating it now...
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)

echo.
echo Starting Flask server on http://localhost:5174
echo.
python main.py

pause
