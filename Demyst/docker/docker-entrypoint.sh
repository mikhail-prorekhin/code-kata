#!/bin/bash

cd /var/www/html/frontend

if [ ! -d ./node_modules ]; then
  npm cache clean -f  &&  npm install
fi;
npm run build 


cd /var/www/html/website

if [ ! -d ./node_modules ]; then
  npm cache clean -f  &&  npm install
fi;

npm run build 

mkdir build/public
cp -a /var/www/html/frontend/build/.  ./build/public

npm run start
