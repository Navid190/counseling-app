@echo off
echo ========================================
echo NGROK MOBILE SETUP HELPER
echo ========================================
echo.
echo STEP 1: Start ngrok for BACKEND
echo --------------------------------
echo Open a NEW terminal and run:
echo    cd C:\ngrok\ngrok-v3-stable-windows-amd64
echo    ngrok http 5174
echo.
echo You will see a URL like: https://abc123.ngrok.io
echo.
set /p BACKEND_URL="Enter your Backend ngrok URL (e.g., https://abc123.ngrok.io): "

echo.
echo ========================================
echo Updating frontend configuration...
echo ========================================

cd frontend

:: Create a temporary file with the updated configuration
powershell -Command "(Get-Content app.js) -replace \"const API_BASE_URL = 'http://localhost:5174/api';\", \"const API_BASE_URL = '%BACKEND_URL%/api';\" | Set-Content app.js"

echo.
echo ✓ Frontend configuration updated!
echo ✓ API_BASE_URL is now: %BACKEND_URL%/api
echo.
echo ========================================
echo STEP 2: Start ngrok for FRONTEND
echo --------------------------------
echo Open ANOTHER terminal and run:
echo    cd C:\ngrok\ngrok-v3-stable-windows-amd64
echo    ngrok http 5173
echo.
echo You will see a URL like: https://xyz789.ngrok.io
echo.
echo ========================================
echo STEP 3: Access on Mobile
echo --------------------------------
echo Open your mobile browser and go to the FRONTEND ngrok URL
echo.
echo ✅ Your app is ready for mobile access!
echo ========================================
echo.
pause
