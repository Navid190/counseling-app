@echo off
echo ========================================
echo   پاکسازی و آماده‌سازی پروژه
echo ========================================
echo.

echo مرحله 1: ساخت پوشه جدید...
cd C:\
if not exist xampp\htdocs\app mkdir xampp\htdocs\app
cd C:\xampp\htdocs\app

echo مرحله 2: ساخت ساختار پوشه‌ها...
mkdir backend
mkdir financial-app
mkdir images
mkdir ".github\workflows"

echo مرحله 3: کپی فایل‌ها...
echo (این مرحله باید دستی انجام شود)
echo.
echo لطفاً فایل‌های زیر را کپی کنید:
echo - financial-app/index.html
echo - financial-app/app.js  
echo - financial-app/style.css
echo - financial-app/logo.svg
echo - financial-app/manifest.json
echo - backend/main.py
echo - backend/requirements.txt
echo.
echo به پوشه C:\xampp\htdocs\app
echo.
pause
