@echo off
echo Fixing Git issues...
cd /d "%~dp0"
git update-ref -d refs/tags/desktop.ini 2>nul
git reflog expire --expire=now --all 2>nul
git gc --prune=now --aggressive 2>nul
git rm -r --cached . 2>nul
git add .
git commit -m "Fix git issues"
git push origin main --force
pause
