@echo off
echo ================================
echo    NAG AI School App Starter
echo ================================
echo.

cd /d "%~dp0backend"

echo Installing dependencies...
python -m pip install -r requirements.txt

echo.
echo Starting server...
echo Open browser: http://localhost:5000
echo.

python main.py

pause
