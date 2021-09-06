<?php
defined('APP')?assert(true):die();

session_start();
if (!isset($_SESSION['sesskey'])) {
	$_SESSION['sesskey'] = md5(time());
}

error_reporting(E_ERROR);
ini_set("display_errors", 1);

putenv("AUTHAPI_URL=https://coursesuite.ninja.test/api/validate/vidninja/{hash}/");
putenv("AUTHAPI_USER=tokenuser");
putenv("AUTHAPI_PASSWORD=GEv6mJ7wJgWR");
putenv("HOME_URL=http://video.to-scorm.com.test/");

require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->code->minified = true;

$minified_css = "css/app.min.20180605155850.css";
$minified_app = "js/app.min.20180605155850.js";
$minified_head = "js/head.min.20180605155850.js";


// $verifier = new \stdClass();
// $verifier->home = "https://video.to-scorm.com";
// $verifier->valid = true;

// $verifier->licence = new \stdClass();
// $verifier->licence->tier = 1;
// $verifier->licence->seats = 1;
// $verifier->licence->remaining = 1;

// $verifier->code = new \stdClass();
// $verifier->code->minified = true;
// $verifier->code->debug = false;

// $verifier->api = new \stdClass();
// $verifier->api->bearer = null;
// $verifier->api->publish = "";
// $verifier->api->header = new \stdClass();
// $verifier->api->header->html = null;
// $verifier->api->header->css = null;

// $verifier->user = new \stdClass();
// $verifier->user->container = "";
// $verifier->user->email = "";

// $verifier->app = new \stdClass();
// $verifier->app->addons = array();
// $verifier->app->socket = "wss://www.coursesuite.ninja/licence";
// $verifier->app->layer = "window.onbeforeunload = function(){ Layer.onclose=function(){}; Layer.close(); }; Layer.onmessage = function(event) { var msg = JSON.parse(event.data); switch (msg.command) { case 'open':case 'close':location.href = App.Home; window.close(); break; default: console.log(msg); }}";
