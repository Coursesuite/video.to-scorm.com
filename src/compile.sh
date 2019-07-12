#!/bin/bash

TS=$(date +"%Y%m%d%H%M%S")


echo "Compiling templates"
handlebars handlebars/ -f js/templates.js

echo "Minifying CSS"

rm -f css/app.min*.css
php ./importcss.php -icss/app.css -ocss/app.min.$TS.css
