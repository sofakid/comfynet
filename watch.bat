@echo off

echo Skipping Building parser!
::call pegjs -o build/comfyparser.js parser/comfygrammar.pegjs

echo Watching starty.js...
call watchify scr/starty.js -o build/starty.js

echo done.