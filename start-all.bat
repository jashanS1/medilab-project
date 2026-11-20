@echo off
title Starting MediLab Full-Stack System
echo ========================================================
echo   Launching MediLab Diagnostics (Backend & Frontend)
echo ========================================================
echo.
echo [1/2] Starting Backend Server on http://localhost:3333...
start "MediLab Backend (Port 3333)" cmd /k "cd /d %~dp0backend && npm start"

echo.
echo [2/2] Starting Frontend App on http://localhost:3000...
start "MediLab Frontend (Port 3000)" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ========================================================
echo   Both services are launching in separate windows!
echo   Frontend will open at: http://localhost:3000
echo   Backend is active at:  http://localhost:3333
echo ========================================================
pause
