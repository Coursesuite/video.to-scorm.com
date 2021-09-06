<?php

error_reporting(E_ERROR);
ini_set("display_errors", 1);

require_once('../vendor/autoload.php');

session_start();
if (empty($_SESSION['sesskey'])) {
    $_SESSION['sesskey'] = bin2hex(random_bytes(32));
}
$token = $_SESSION['sesskey'];

$plugins = [];
$scripts = [];
$css = [];

$scripts[] = 'https://cdn.jsdelivr.net/combine/npm/nouislider@14.0.2,npm/uikit@3.1.5/dist/js/uikit-icons.min.js,npm/uikit@3.1.5'; //,npm/classie@1.0.0/classie.min.js';
// $scripts[] = 'https://cdnjs.cloudflare.com/ajax/libs/classie/1.0.1/classie.min.js';
$scripts[] = 'https://cdn.plyr.io/3.5.6/plyr.js';
$scripts[] = 'js/modernizr.custom.js';
$scripts[] = 'js/uiProgressButton.js';
$scripts[] = 'js/main.js';
$scripts[] = 'js/download.js';

$css[] = 'https://cdn.jsdelivr.net/combine/npm/uikit@3.1.5/dist/css/uikit.min.css,npm/nouislider@14.0.2/distribute/nouislider.min.css';
$css[] = 'https://cdn.plyr.io/3.5.6/plyr.css'; // can't be combined because of relative pathing
$css[] = 'css/app.css';
// $css[] = 'css/wizard.css';

$plugins_path = realpath("./plugins");
$pfold = new DirectoryIterator($plugins_path);
foreach ($pfold as $fi) {
    if ($fi->isDot()) continue;
    if (substr($fi->getFilename(), 0, 1) === "_") continue;
    if (file_exists($fi->getPathname() . '/plugin.php')) {
    	$plugins[] = $fi->getFilename();
    }
}

// sort alphabetically, except put vimeo first and cloud last
function cmp($a,$b) {
	if ($a === $b) return 0;
	if ($a === 'cloud' || $b === 'vimeo') return 1;
	if ($a === 'vimeo' || $b === 'cloud') return -1;
	return ($a < $b) ? -1 : 1;
}

usort($plugins,"cmp");

// rsort($plugins, SORT_STRING); // think up something better to put youtube then vimeo first then the rest

$iter = new RegexIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($plugins_path)), '/^.+(plugin|templates)\.js$/', RecursiveRegexIterator::GET_MATCH);
foreach ($iter as $file) {
	if (substr(basename(dirname($file[0])), 0, 1) === "_") continue;
	$scripts[] = 'plugins' . substr($file[0], strlen($plugins_path));
}
$iter = new RegexIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($plugins_path)), '/^.+\.css$/', RecursiveRegexIterator::GET_MATCH);
foreach ($iter as $file) {
	if (substr(basename(dirname($file[0])), 0, 1) === "_") continue;
	$css[] = 'plugins' . substr($file[0], strlen($plugins_path));
}


?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Video to Scorm</title>
		<meta name="description" content="Add a scorm completion to your video" />
		<meta name="keywords" content="video, scorm, scorm wrapper, scorm content, content packaging, ims manifest, coursesuite" />
		<meta name="author" content="coursesuite ltd; coursesuite.com, a now defunct enterprise" />
		<link rel="shortcut icon" href="/favicon.ico">
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.1.5/dist/css/uikit.min.css" />
		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.17/mediaelementplayer.min.css">

		<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		<script type="text/javascript" src="https://static-cdn.kloudless.com/p/platform/sdk/kloudless.explorer.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.17/mediaelement-and-player.js"></script>
 		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.17/renderers/dailymotion.min.js"></script>
 		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.17/renderers/facebook.min.js"></script>
 		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.17/renderers/soundcloud.min.js"></script>
 		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.17/renderers/twitch.min.js"></script>
 		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.17/renderers/vimeo.min.js"></script>
 		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.17/renderers/youtube.min.js"></script>
 		<script src="https://cdn.jsdelivr.net/npm/localforage@1.7.3/dist/localforage.min.js" integrity="sha256-H/ZsHjKSJUnQyCQHZwPmn7VTWFeTTI+qgCP1GkiB9zI=" crossorigin="anonymous"></script>
		<script src="js/templates.js"></script>
<?php

include("_analytics.php");

foreach ($css as $link) {
	echo "		", "<link rel='stylesheet' type='text/css' href='{$link}'>", PHP_EOL;
}
?>
</head>

<body>

<header id="banner" uk-sticky class="uk-padding-small uk-light">
	<nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
		<div class="uk-navbar-left">
			<a href="/app">
				<img src="css/video-to-scorm.svg" class="v2s-logo" alt="Video to Scorm">
			</a>
		</div>
		<div class="uk-navbar-center" style="min-width: 720px">
			<ul class="uk-subnav uk-margin-remove uk-subnav-pill v2s-nav-arrows uk-position-relative" uk-switcher="connect:#switchers">
				<li><a href="#about">About</a></li>
				<li><a href="#source">Select video source</a></li>
				<li><a href="#range">Specify ranges</a></li>
				<li><a href="#download">Download your package</a></li>
			</ul>
		</div>
		<div class="uk-navbar-right">
			<a href="#" class="uk-button v2s-reset" data-action="clear-storage">Reset</a>
		</div>
	</nav>
</header>


<div id="switchers" class="uk-switcher uk-margin">
	<section class="uk-section uk-padding-remove-vertical section-source">
		<div class="uk-container">
			<div class="uk-margin">
				<h3>Add SCORM completions to your video</h3>
				<p>How can you ensure that your learners watch 45 minutes of your 1 hour induction video which is hosted on Vimeo?</p>
				<p>Video 2 Scorm lets you use Vimeo, Youtube, a HLS stream or your own uploaded files and performs a completion when the user watches a set amount of the video.</p>
				<p>You can optionally hide the "scrubber" bar (the draggable item that lets users skip ahead or back in a video) so your learners can't skip ahead, plus choose when to start and end a video (in case you only want to show a portion of a longer peice without having to edit and re-upload it).</p>
				<p>Simply select your video source, then set a marker which identifies where the video will complete, then download a SCORM-compatible ZIP file.</p>

			</div>
		</div>
	</section>

	<section class="uk-section uk-padding-remove-vertical section-source">
		<div class="uk-container">
			<div class="uk-margin">

			    <ul uk-tab="swiping: false" class="uk-tab">
			<?php
			    	for ($i = 0; $i < count($plugins); $i++) {
				        echo "		", "<li", ($i===0) ? " class='uk-active'":"", "><a href='#' aria-expanded='false'>", $plugins[$i], "</a></li>", PHP_EOL;
			    	}
			?>
			    </ul>

			    <ul class="uk-switcher uk-margin">
			<?php
				   	for ($i = 0; $i < count($plugins); $i++) {
				    	echo "		", "<li", ($i===0) ? " class='uk-active'":"", " data-plugin='", $plugins[$i], "'>", PHP_EOL;
				    	include("./plugins/" . $plugins[$i] . "/plugin.php");
				    	echo "		", "</li>", PHP_EOL;
			    	}
			?>
			    </ul>
			</div>
		</div>
	</section>
	<section class="uk-section uk-padding-remove-vertical section-range">
		<div class="uk-container">
			<p id="range-intro">Drag the start (<span class='m-s'>S</span>) and end (<span class='m-e'>E</span>) video markers to indicate the portion of the video you want to show. Drag the completion marker (<span class='m-c'>C</span>) to where you want the video to be considered complete.</p>

			<div id="videoContainer" class="video-container uk-position-relative"></div>
			<div class="range-container">
				<div id="range"></div>
			</div>

		</div>
	</section>
	<section class="uk-section uk-padding-remove-vertical section-download">
		<div class="uk-container">

		<form id="settings" class="w-80 m-lr-auto">

			<section id="basic-options" class="settings-panel">
				<label for="ocn">Package Name<small class="r">required</small></label>
				<input type="text" size="30" placeholder="Course name" name="option-course-name" id="ocn">

				<label for="ocd">Description<small>optional</small></label>
				<textarea rows="2" cols="30" placeholder="Description" name="option-course-description" id="ocd"></textarea>

				<label for="occ">Copyright<small>optional</small></label>
				<input type="text" size="30" placeholder="Copyright statement" name="option-course-copyright" id="occ">

				<label for="gax">Google Analytics Id<small>optional</small></label>
				<input type="text" size="30" placeholder="Google Analytics id (UA-XXXXXXXXX-X)" name="option-ga-id" id="gax">
			</section>

			<div class="grid-h grid-2 m-t-regular">

				<fieldset class="radio-panel uk-margin-remove-vertical">
					<legend>Navigation</legend>
					<div class="grid-h grid-3">
						<label>
							<input type="radio" name="option-toggle-scrub" value="false" checked>
							<?php include("img/hide.svg"); ?>
							<p>Hide the video range controls</p>
						</label>
						<label>
							<input type="radio" name="option-toggle-scrub" value="true">
							<?php include("img/show.svg"); ?>
							<p>Show the video range controls</p>
						</label>
					</div>
				</fieldset>

				<fieldset class="radio-panel uk-margin-remove-vertical">
					<legend>Compatibility</legend>
					<div class="grid-h grid-3">
						<label>
							<input type="radio" name="option-api" value="scorm12" checked>
							<?php include("img/scorm.svg"); ?>
							<p>Scorm 1.2 (default)</p>
						</label>
						<label>
							<input type="radio" name="option-api" value="scorm2004">
							<?php include("img/scorm.svg"); ?>
							<p>Scorm 2004</p>
						</label>
						<label>
							<input type="radio" name="option-api" value="none">
							<?php include("img/html5.svg"); ?>
							<p>Standalone</p>
						</label>
					</div>
				</fieldset>

			</div>


		</form>

		<div class="w-80 m-lr-auto m-t-regular">
			<div class='grid-h grid-c <?php echo (isset($verifier->api->publish) && !empty($verifier->api->publish)) ? 'grid-4' : 'grid-3'; ?>'>

				<div class="progress-button elastic" data-destination="download">
					<button><span><i class="ninja-download"></i> Download</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>

			</div>

		</div>
		</div>


	</section>
</div>

	<footer>
		<a href="/">Video to Scorm</a> |
		<a href="https://forms.gle/5fFKKhHXviXRfbwg7" target="_blank">Feedback</a> |
		<a href="https://www.courseassembler.com" target="_blank">Course Assembler</a>
	</footer>


<?php
	foreach ($scripts as $script) {
		echo "<script src='{$script}'></script>", PHP_EOL;
	}
?>

</body>
</html>
