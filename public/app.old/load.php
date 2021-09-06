<?php
defined('APP')?assert(true):die();

session_start();
if (!isset($_SESSION['sesskey'])) {
	$_SESSION['sesskey'] = md5(time());
}

require_once('../../vendor/autoload.php');
$verifier = new stdClass();

$verifier = new \stdClass();
$verifier->valid = true;
$verifier->home = '/app.old/';

$verifier->licence = new \stdClass();
$verifier->licence->tier = 0;
$verifier->licence->seats = 1;
$verifier->licence->remaining = 1;

$verifier->code = new \stdClass();
$verifier->code->minified = false;
$verifier->code->debug = true;

$verifier->api = new \stdClass();
$verifier->api->bearer = null;
$verifier->api->publish = "";
$verifier->api->header = new \stdClass();
$verifier->api->header->html = null;
$verifier->api->header->css = null;

$verifier->user = new \stdClass();
$verifier->user->container = "";
$verifier->user->email = "";

$verifier->app = new \stdClass();
$verifier->app->addons = array();

$timestamp = time();
$themes = "";

$minified_css = "css/app.min.20180605155850.css";
$minified_app = "js/app.min.20180605155850.js";
$minified_head = "js/head.min.20180605155850.js";
