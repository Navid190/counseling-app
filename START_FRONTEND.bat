@echo off
echo ========================================
echo Starting Frontend Server
echo ========================================
echo.

cd frontend

if not exist node_modules (
    echo ERROR: Node modules not found!
    echo Installing now...
    npm install
)

echo.
echo Starting Vite server on http://localhost:5173
echo.
npm run dev

pause
