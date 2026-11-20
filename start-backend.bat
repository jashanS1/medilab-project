@echo off
title MediLab Backend Server
echo Starting MediLab Backend Server on http://localhost:3333...
cd /d %~dp0backend
npm start
pause
