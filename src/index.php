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
		<script type="text/javascript" src="https://static-cdn.kloudless.com/p/platform/sdk/kloudless.explorer.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.1.5/dist/css/uikit.min.css" />
		<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js" async="true"></script>
		<script src="https://cdn.jsdelivr.net/npm/localforage@1.7.3/dist/localforage.min.js" integrity="sha256-H/ZsHjKSJUnQyCQHZwPmn7VTWFeTTI+qgCP1GkiB9zI=" crossorigin="anonymous"></script>
		<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?>, Layer = new WebSocket("<?php echo $verifier->app->socket; ?>"); <?php echo $verifier->app->layer; ?>;</script>
		<script src="js/templates.js"></script>
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

<div class="uk-container-expand uk-margin-bottom" uk-sticky>
<ul class="uk-wizard uk-wizard-steps uk-grid uk-grid-collapse uk-grid-width-medium-1-2 uk-grid-width-large-1-5">
<li class="cs-logo"><img src="css/video-to-scorm.svg" width="200" alt="Video to Scorm"></li>
<li class="uk-step">
<div class="uk-step-content uk-text-truncate">
<div class="uk-wizard-icon"></div>
<div class="uk-wizard-title">Настройка базы данных</div>
<div class="uk-wizard-desc">настройка подключения к БД</div>
</div>
</li>
<li class="uk-step uk-complete">
<div class="uk-step-content">
<div class="uk-wizard-icon"></div>
<div class="uk-wizard-title">Метаданные</div>
<div class="uk-wizard-desc">настройки SEO</div>
</div>
</li>
<li class="uk-step uk-active">
<div class="uk-step-content">
<div class="uk-wizard-icon"></div>
<div class="uk-wizard-title">Аккаунт</div>
<div class="uk-wizard-desc">настройка пользователя</div>
</div>
</li>
<li class="uk-step">
<div class="uk-step-content">
<div class="uk-wizard-icon"></div>
<div class="uk-wizard-title">Все готово!</div>
<div class="uk-wizard-desc">давайте начинать</div>
</div>
</li>
</ul>
</div>

<nav class="uk-navbar-container" uk-navbar uk-sticky>
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

<section class="uk-section uk-height-viewport">
	<div class="uk-container">
		<h2>Set the video ranges and cue points</h2>
		<p>Drag the start (<span class='m-s'>S</span>) and end (<span class='m-e'>E</span>) video markers to indicate the portion of the video you want to show. Drag the completion marker (<span class='m-c'>C</span>) to where you want the video to be complete.</p>

		<div class="video-container uk-position-relative">
			<video id="video-player" autoplay="false" playsinline webkit-playsinline crossorigin style="position:absolute;width:100%;top:0;height:100%;"></video>
		</div>

		<div class="range-container">
			<div id="range"></div>
		</div>

	</div>
</section>

<section class="uk-section uk-height-viewport">
	<div class="uk-container">
		<h2>Download</h2>
		<button id="download-button">DOWNLOAD ZIP</button>
		<input type="checkbox" id="toggleScrub" name="toggleScrub">
		<label for="toggleScrub">Hide video scrub bar</label>
	</div>
</section>


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
