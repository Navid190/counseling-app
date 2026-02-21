@echo off
echo ========================================
echo Building Application for Mobile Testing
echo ========================================
echo.

echo Building production version...
call npm run build

echo.
echo ========================================
echo Build Complete!
echo.
echo Output folder: dist/
echo.
echo To deploy for mobile testing:
echo 1. Copy the 'dist' folder to your web server
echo 2. OR use 'npm run preview' to test the build locally
echo 3. OR use ngrok: ngrok http 4173 (Vite preview port)
echo ========================================
echo.
echo Would you like to preview the build? (Y/N)
set /p preview=

if /i "%preview%"=="Y" (
    echo Starting preview server...
    npm run preview
) else (
    echo Build ready in dist/ folder
)

pause
