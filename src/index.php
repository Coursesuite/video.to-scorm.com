<?php
define("APP",true);
include("load.php");

$verifier->app->socket = "ws://127.0.0.1";

$jsApp = new stdClass();
$jsApp->Home = $verifier->home;
$jsApp->Tier =  $verifier->licence->tier;
$jsApp->Api = isset($verifier->api);
$jsApp->Timestamp = "$timestamp";
$jsApp->Minified = $verifier->code->minified;
if (isset($verifier->api->publish) && !empty($verifier->api->publish)) {
	$jsApp->Publish = $verifier->api->publish;
	$jsApp->Bearer = $verifier->api->bearer;
	$jsApp->Method = "POST"; // or PUT
}

// api url = coursesuite url / api / dl / apikey / appkey / template.zip
$api_template = isset($verifier->api->template) ? $verifier->api->template : "";

$plugins = [];
$scripts = [];
$css = [];

$scripts[] = 'https://cdn.jsdelivr.net/combine/npm/nouislider@14.0.2,npm/uikit@3.1.5/dist/js/uikit-icons.min.js,npm/uikit@3.1.5';
$scripts[] = 'https://cdn.plyr.io/3.5.6/plyr.js';
$scripts[] = 'js/main.js';

$css[] = 'https://cdn.jsdelivr.net/combine/npm/uikit@3.1.5/dist/css/uikit.min.css,npm/nouislider@14.0.2/distribute/nouislider.min.css';
$css[] = 'https://cdn.plyr.io/3.5.6/plyr.css'; // can't be combined because of relative pathing
$css[] = 'css/app.css';
$css[] = 'css/wizard.css';

$plugins_path = realpath("./plugins");
$pfold = new DirectoryIterator($plugins_path);
foreach ($pfold as $fi) {
    if ($fi->isDot()) continue;
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
	$scripts[] = 'plugins' . substr($file[0], strlen($plugins_path));
}
$iter = new RegexIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($plugins_path)), '/^.+\.css$/', RecursiveRegexIterator::GET_MATCH);
foreach ($iter as $file) {
	$css[] = 'plugins' . substr($file[0], strlen($plugins_path));
}


?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Video to Scorm</title>
		<meta name="description" content="Add an audio track to your scorm-enabled slide presentation" />
		<meta name="keywords" content="scorm, scorm wrapper, scorm content, content packaging, ims manifest, coursesuite ninja, scorm ninja" />
		<meta name="author" content="coursesuite pty ltd" />
		<link rel="shortcut icon" href="/favicon.ico">
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.1.5/dist/css/uikit.min.css" />
		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/mediaelementplayer.min.css">

		<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		<script type="text/javascript" src="https://static-cdn.kloudless.com/p/platform/sdk/kloudless.explorer.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/mediaelement-and-player.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/renderers/dailymotion.min.js"></script>
		<!-- script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/renderers/vimeo.min.js"></script -->
		<!-- script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.12/renderers/soundcloud.min.js"></script -->
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.12/renderers/facebook.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/localforage@1.7.3/dist/localforage.min.js" integrity="sha256-H/ZsHjKSJUnQyCQHZwPmn7VTWFeTTI+qgCP1GkiB9zI=" crossorigin="anonymous"></script>
		<!--script type="text/javascript" src="https://connect.soundcloud.com/sdk/sdk-3.3.2.js"></script-->
		<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?>, Layer = new WebSocket("<?php echo $verifier->app->socket; ?>"); <?php echo $verifier->app->layer; ?>;</script>
		<script src="js/templates.js"></script>
<?php
if ($verifier->code->minified) {
	include("_head.inc.php");
}
foreach ($css as $link) {
	echo "		", "<link rel='stylesheet' type='text/css' href='{$link}'>", PHP_EOL;
}
?>
</head>
<?php if ($verifier->valid) { ?>
<body class="uk-light">

<header id="banner" uk-sticky class="uk-padding-small uk-padding-small uk-padding-remove-bottom">
<nav class="uk-child-width-1-2@m uk-child-width-1-1@s" uk-grid="margin:uk-margin-small">
	<div class="uk-width-1-2@m uk-width-1-1@s">
		<div class="uk-text-center@s uk-text-left@m">
	        <a href="?<?php echo $_SERVER['QUERY_STRING']; ?>#top">
	        	<img src="css/video-to-scorm.svg" class="v2s-logo" alt="Video to Scorm">
	        </a>
	    </div>
	</div>
	<div class="uk-width-1-2@m uk-width-1-1@s">
	    <div class="uk-text-center@s uk-text-right@m">
	        <a href="#" class="uk-button v2s-survey">Usage Survey</a>
	        <a href="#" class="uk-button v2s-doco">Documentation</a>
	        <a href="#" class="uk-button v2s-reset" data-action="clear-storage">Reset</a>
	    </div>
	</div>
    <div class="uk-width-1-1">
		<div class="uk-flex uk-flex-center">
			<ul class="uk-subnav uk-margin-remove uk-subnav-pill v2s-nav-arrows uk-position-relative" uk-switcher="connect:#switchers">
				<li><a href="#source">Select video source</a></li>
				<li><a href="#range">Specify ranges</a></li>
				<li><a href="#download">Download your package</a></li>
			</ul>
		</div>
	</div>
</nav>
</header>

<div id="switchers" class="uk-switcher uk-margin">
	<section class="uk-section uk-padding-remove-vertical">
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
	<section class="uk-section uk-padding-remove-vertical">
		<div class="uk-container">
			<p id="range-intro">Drag the start (<span class='m-s'>S</span>) and end (<span class='m-e'>E</span>) video markers to indicate the portion of the video you want to show. Drag the completion marker (<span class='m-c'>C</span>) to where you want the video to be considered complete.</p>

			<div id="videoContainer" class="video-container uk-position-relative"></div>

			<div class="range-container">
				<div id="range"></div>
			</div>

		</div>
	</section>
	<section class="uk-section uk-padding-remove-vertical">
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
							<input type="radio" name="toggleScrub" value="false" checked>
							<?php include("img/hide.svg"); ?>
							<p>Hide the video range controls</p>
						</label>
						<label>
							<input type="radio" name="toggleScrub" value="true">
							<?php include("img/show.svg"); ?>
							<p>Show the video range controls</p>
						</label>
					</div>
				</fieldset>

				<fieldset class="radio-panel uk-margin-remove-vertical">
					<legend>Compatibility</legend>
					<div class="grid-h grid-3">
						<label>
							<input type="radio" name="api" value="scorm12" checked>
							<?php include("img/scorm.svg"); ?>
							<p>Scorm 1.2 (default)</p>
						</label>
						<label>
							<input type="radio" name="api" value="scorm2004">
							<?php include("img/scorm.svg"); ?>
							<p>Scorm 2004</p>
						</label>
						<label>
							<input type="radio" name="api" value="none">
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

				<div class="progress-button elastic" data-destination="kloudless">
					<button><span><i class="ninja-upload2"></i> Save to Cloud</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>

				<div class="progress-button elastic" data-destination="preview">
					<button><span><i class="fa fa-eye"></i> Preview</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" /></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2" /><path d="m31.5,46.5l-8.5,-7.1" /></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3" /><path d="m35,35l9.3,9.3" /><path d="m35,35l-9.3,9.3" /><path d="m35,35l9.3,-9.3" /></svg>
				</div>

<?php if (isset($verifier->api->publish) && !empty($verifier->api->publish)) { ?>
				<div class="progress-button elastic" data-destination="publish">
					<button><span><i class="ninja-upload"></i> Publish to LMS</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>
<?php } ?>
			</div>

		</div>
		</div>


	</section>
</div>

	<footer>
		<a href="/">Video to Scorm</a> |
		<a href="https://help.coursesuite.ninja/" target="_blank">Report a problem</a> |
		App by <a href="https://www.coursesuite.com/" target="_blank">Coursesuite</a>.
	</footer>

<?php
	foreach ($scripts as $script) {
		echo "<script src='{$script}'></script>", PHP_EOL;
	}
} else { ?>

	<body class="buildbot-sad">

		<header>
			video 2 scorm
		</header>

		<main>
			<h1>Your beaker has exploded.</h1>
			<h2><?php
			switch ($verifier->licence->error) {
				case "bad-token":
					echo "Your licence or subscription key is missing or invalid.";
					break;
				case "licence-key-expired":
					echo "Your licence key has expired.";
					break;

				default:
					echo "Something went horribly wrong. ", $verifier->licence->error;
					break;
			}
			?></h2>
			<p><a href="<?php echo getenv("HOME_URL"); ?>">Home</a></p>
		</main>

	<?php } ?>

</body>
</html>
