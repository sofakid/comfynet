@echo off

echo Building parser...
call pegjs -o build/comfyparser.js parser/comfygrammar.pegjs

echo Building starty.js...
call browserify scr/starty.js -o build/starty.js

echo done.