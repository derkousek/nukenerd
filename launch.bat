@echo off
title NukeNerd

if exist node_modules\ (
  node index.js
  pause
) else (
  call npm i >> NUL
  echo Succesfully installed, please re-run this file.
  pause
  exit
)