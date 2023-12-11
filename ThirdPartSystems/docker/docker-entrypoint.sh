#!/bin/bash

cd /var/www/html

if [ ! -d ./node_modules ]; then
  npm cache clean -f  &&  npm install
fi;

node ./index.js
