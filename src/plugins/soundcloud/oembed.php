<?php
// https://stackoverflow.com/a/27461646/5972025

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$url=$_POST['url'];
$getValues=file_get_contents('http://soundcloud.com/oembed?format=json&url='.$url.'&iframe=true');
echo $getValues;