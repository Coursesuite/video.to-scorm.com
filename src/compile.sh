#!/bin/bash

TS=$(date +"%Y%m%d%H%M%S")


echo "Compiling templates"
handlebars handlebars/ -f js/templates.js

echo "Minifying CSS"

rm -f css/app.min*.css
php ./importcss.php -icss/app.css -ocss/app.min.$TS.css

# echo "Minifying javascript"
# cd js
# rm -f app.min*.js
# uglifyjs --keep-fnames templates.js main.js download.js --output app.min.$TS.js --source-map
# cd ..

echo "prepping app folder"

cd ..
cd public

cd app
rm -rf *

cp -R ../../src/* .

rm -rf ./handlebars
rm -rf importcss.php

cd plugins
rm -rf _*

cd ..

rm compile.sh
rm load.php

echo "Creating app loader"
echo "<?php" > load.php
echo "defined('APP')?assert(true):die();" >> load.php
echo "require_once('../../vendor/autoload.php');" >> load.php
echo "session_start();" >> load.php
echo "if (!isset(\$_SESSION['sesskey'])) \$_SESSION['sesskey'] = md5(time());" >> load.php
echo "\$verifier = (new CoursesuiteValidator())->Validate(\$_GET);" >> load.php
echo "\$verifier->code->minified = true;" >> load.php
echo "\$timestamp = '$TS';" >> load.php
echo "\$minified_css = 'css/app.min.$TS.css';" >> load.php
echo "\$minified_app = 'js/app.min.$TS.js';" >> load.php
echo "?>" >> load.php

cd ..
cd ..
cd src
