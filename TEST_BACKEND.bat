@echo off
echo Testing Backend API...
echo.
echo Testing health endpoint...
curl http://localhost:5174/api/health
echo.
echo.
echo Testing API keys...
curl http://localhost:5174/api/test-keys
echo.
echo.
echo If you see JSON responses above, backend is working!
echo If you see errors, backend is not running properly.
echo.
pause
