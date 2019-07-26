<?php
define("APP",true);
include("load.php");

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

$scripts[] = 'https://cdn.jsdelivr.net/combine/npm/nouislider@13.1.5,npm/uikit@3.1.5/dist/js/uikit-icons.min.js,npm/uikit@3.1.5';
$scripts[] = 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.10/mediaelement-and-player.min.js'; // not cdn.jsdeliver
$scripts[] = 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.10/renderers/dailymotion.min.js';
$scripts[] = 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.10/renderers/facebook.min.js';
$scripts[] = 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.10/renderers/soundcloud.min.js';
$scripts[] = 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.10/renderers/twitch.min.js';
$scripts[] = 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.10/renderers/vimeo.min.js';

$scripts[] = 'js/nouislider.min.js';
$scripts[] = 'js/main.js';
$css[] = 'https://cdn.jsdelivr.net/npm/uikit@3.1.5/dist/css/uikit.min.css';
$css[] = 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.10/mediaelementplayer.min.css';
$css[] = 'css/nouislider.min.css';
$css[] = 'css/app.css';

$plugins_path = realpath("./plugins");
$pfold = new DirectoryIterator($plugins_path);
foreach ($pfold as $fi) {
    if ($fi->isDot()) continue;
    if (file_exists($fi->getPathname() . '/plugin.php')) {
    	$plugins[] = $fi->getFilename();
    }
}
rsort($plugins, SORT_STRING); // think up something better to put youtube then vimeo first then the rest

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
		<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?>, Layer = new WebSocket("<?php echo $verifier->app->socket; ?>"); <?php echo $verifier->app->layer; ?>;</script>
<?php
if ($verifier->code->minified) {
	include("_head.inc.php");
}
foreach ($css as $link) {
	echo "<link rel='stylesheet' type='text/css' href='{$link}'>", PHP_EOL;
}
?>
	<script type="text/javascript" src="https://static-cdn.kloudless.com/p/platform/sdk/kloudless.explorer.js" async="true"></script>
</head>
<?php if ($verifier->valid) { ?>
<body>

<nav class="uk-navbar-container uk-margin" uk-navbar uk-sticky>
    <div class="uk-navbar-left">
        <a class="uk-navbar-item uk-logo" href="?<?php echo $_SERVER['QUERY_STRING']; ?>#top">
        	<img src="css/video-to-scorm.svg" width="300" alt="Video to Scorm">
        </a>
    </div>
    <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
            <li><a href="#">Usage Survey</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="?<?php echo $_SERVER['QUERY_STRING']; ?>#top">Reset</a></li>
        </ul>
    </div>
</nav>

<section class="uk-section uk-height-viewport">
	<div class="uk-container">
		<h2>Set up your video source</h2>
		<div class="uk-margin">

		    <ul uk-tab="swiping: false" class="uk-tab">
		<?php
		    	for ($i = 0; $i < count($plugins); $i++) {
			        echo "		", "<li", ($i===0) ? " class='uk-active'":"", "><a href='#' aria-expanded='false'>", $plugins[$i], "</a></li>", PHP_EOL;
		    	}
		?>
		        <li><a href="#" aria-expanded="false">Upload</a></li>
		        <li><a href="#" aria-expanded="false">Cloud</a></li>
		    </ul>

		    <ul class="uk-switcher uk-margin">
		<?php
			   	for ($i = 0; $i < count($plugins); $i++) {
			    	echo "		", "<li", ($i===0) ? " class='uk-active'":"", " data-plugin='", $plugins[$i], "'>", PHP_EOL;
			    	include("./plugins/" . $plugins[$i] . "/plugin.php");
			    	echo "		", "</li>", PHP_EOL;
		    	}
		?>
		        <li>
					<form>
					    <div class="uk-margin">
					        <div uk-form-custom>
					            <input type="file">
					            <button class="uk-button uk-button-default" type="button" tabindex="-1">Select mp3, mp4, m3u8, ogg to upload</button>
					        </div>
					    </div>
					</form>
		        </li>
		        <li>upload from the cloud somewhere</li>
		    </ul>
		</div>
	</div>
</section>

<?php if (0) { ?>
<section class="uk-section uk-height-viewport">
	<div class="uk-container">
		<h2>Set options</h2>

		<p>Use mediaelement.js</p>
		<p>Use plyr.io</p>
		<p>Use HLS</p>
		<p>Use Dash</p>
		<p>Select a player skin</p>
		<p>Show or hide the video controls</p>
	</div>
</section>

            <video id="mejs__player"  class="uk-responsive-width" preload="none" controls playsinline webkit-playsinline>
            </video>

<?php } ?>

<section class="uk-section uk-height-viewport">
	<div class="uk-container">
		<h2>Set the video ranges and cue points</h2>
		<p>Drag the start (<span class='m-s'>S</span>) and end (<span class='m-e'>E</span>) video markers to indicate the portion of the video you want to show. Drag the completion marker (<span class='m-c'>C</span>) to where you want the video to be complete.</p>

		<div class="video-container"><video id="video-player" width="100%" height="100%" style="width:100%;padding-top:56.25%"></video></div>

		<div class="range-container">
			<div id="range"></div>
		</div>

	</div>
</section>


<?php
	foreach ($scripts as $script) {
		echo "<script src='{$script}'></script>", PHP_EOL;
	}
} else { ?>

	<body class="buildbot-sad">

		<header>
			course alchemy
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
