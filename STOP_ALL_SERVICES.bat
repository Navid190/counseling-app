@echo off
echo ===============================================
echo   Stopping All Counseling App Services
echo ===============================================
echo.

echo Stopping ngrok...
taskkill /F /IM ngrok.exe 2>nul
if %errorlevel% equ 0 (
    echo [OK] ngrok stopped
) else (
    echo [INFO] ngrok was not running
)

echo Stopping Python/Flask backend...
taskkill /F /IM python.exe /FI "WINDOWTITLE eq *main.py*" 2>nul
if %errorlevel% equ 0 (
    echo [OK] Backend stopped
) else (
    echo [INFO] Backend was not running
)

echo Stopping Node/Vite frontend...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo [OK] Frontend stopped
) else (
    echo [INFO] Frontend was not running
)

echo.
echo ===============================================
echo   All services stopped!
echo ===============================================
echo.
pause
