<?php
defined('APP')?assert(true):die();

error_reporting(E_ERROR);
ini_set("display_errors", 1);

putenv("AUTHAPI_URL=https://coursesuite.ninja.test/api/validate/video2scorm/{hash}/");
putenv("AUTHAPI_USER=tokenuser");
putenv("AUTHAPI_PASSWORD=GEv6mJ7wJgWR");
putenv("HOME_URL=http://video.to-scorm.com.test/");

require_once('../vendor/autoload.php');
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->code->minified = false;
$verifier->valid = true;

// generate a csrf token for form postbacks
session_start();
if (empty($_SESSION['sesskey'])) {
    $_SESSION['sesskey'] = bin2hex(random_bytes(32));
}
$token = $_SESSION['sesskey'];