<?php

define("APP",true);
include("load.php");

$jsApp = new stdClass();
$jsApp->Home = $verifier->home;
$jsApp->Tier =  $verifier->licence->tier;
$jsApp->Api = isset($verifier->api);
$jsApp->Timestamp = "$timestamp";
$jsApp->Minified = $verifier->code->minified;
$jsApp->Themes = [$themes];
if (isset($verifier->api->publish) && !empty($verifier->api->publish)) {
	if (strpos($verifier->api->publish,"https:") === false) {
		$jsApp->Publish = "publish.php?dest=" . rawurlencode($verifier->api->publish) . "&sesskey=" . $sesskey;
	} else {
		$jsApp->Publish = $verifier->api->publish;
	}
	$jsApp->Bearer = $verifier->api->bearer;
	$jsApp->Method = "POST"; // or PUT
}

// api url = coursesuite url / api / dl / apikey / appkey / template.zip
$api_template = isset($verifier->api->template) ? $verifier->api->template : "";

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Video 2 Scorm</title>
		<meta name="description" content="Watch some or all of a video, get a SCORM completion" />
		<meta name="keywords" content="scorm, scorm wrapper, scorm content, content packaging, ims manifest, coursesuite" />
		<meta name="copyright" content="tim st.clair" />
		<meta name="author" content="tim@coursesuite.com" />
		<link rel="shortcut icon" href="/favicon.ico">
		<link rel="icon" href="/favicon.ico" type="image/x-icon">
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" type="text/css">
		<link href="css/scormninja/style.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/plyr/2.0.17/plyr.css" rel="stylesheet">
		<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?> ?>;</script>
<?php if ($verifier->code->minified) {?>
		<link rel="stylesheet" type="text/css" href="<?php echo $minified_css; ?>" />
		<script src="<?php echo $minified_head; ?>"></script>
<?php } else { ?>
		<link rel="stylesheet" type="text/css" href="css/normalise.css" />
		<link rel="stylesheet" type="text/css" href="css/spectrum.css" />
		<link rel="stylesheet" type="text/css" href="css/CircularProgressButton.css" />
		<link rel="stylesheet" type="text/css" href="css/app.css" />
		<script src="js/snap.svg-min.js"></script>
		<script src="js/modernizr.custom.js"></script>
<?php } ?>
		<!--[if IE]>
  		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
<?php if ($verifier->code->minified) {?>
		<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-68767047-4', 'auto');
		ga('send', 'pageview');

		</script>
<?php }
if (isset($verifier->api->header->css) && !empty($verifier->api->header->css)) {
	echo "		<style>" . $verifier->api->header->css . "</style>";
}
?>
		<style id="fiddle"></style>

	</head>
	<body class="media-source">

		<section class="page-fixed-top">
			<header id="banner"><?php
			if (isset($verifier->api->header->html) && !empty($verifier->api->header->html)) {
				echo $verifier->api->header->html;
			} else {
				echo "<div class='cs-banner'><img src='/assets/video-to-scorm.svg' height='40' title='Video 2 Scorm, by Coursesuite (formerly Media Ninja)'></div>";
			}
			?></header>

			<nav id="tabs">
				<a href="javascript:;" data-tab="media-source" class="current"><i class="ninja-add-documents"></i> Media source</a>
				<a href="javascript:;" data-tab="edit-timeline"><i class="ninja-fiddle"></i> Set completion</a>
				<?php if (false) { ?><a href="javascript:;" data-tab="change-settings"><i class="ninja-fiddle"></i> Choose a design</a><?php } ?>
				<a href="javascript:;" data-tab="download-zip"><i class="ninja-floppy-disk3"></i> Download your package</a>
				<span class="btn toolbar"><a href="https://guide.coursesuite.ninja/medianinja/usage" data-action="pop-help" target="app_help">
					<i class="ninja-help"></i> Help</a>
				</span>
				<span class='btn'>
					<a href="javascript:;" id="clearStorage" title="Clear all files and settings and start over">
						<span class="reset"><i class="ninja-reset"></i> <span id="reset-hint-text">Reset</span></span>
					</a>
					<span id="confirm"><a class="ok" href="javascript:;" id="confirmReset" title="This wipes all files and settings (no undo)!">Yes!</a><a href="javascript:" id="cancelReset" title="Don't reset anything">No!</a></span>
				</span>
			</nav>
		</section>

		<main>
			<section id="grey"></section>
			<section id="media-source"  class="current">
				<div class="standard-width">
					<article class='intro'>
						<h1>Choose your media source</h1>
						<p>Copy the URL from your YouTube, Vimeo or SoundCloud hosted media and paste it into the field below to get started.
						<?php if ($verifier->licence->tier > 2) { ?>You can also upload media or link to media hosted on Dropbox.<?php } ?>
						Click Help for more information on files and formats.</p>
					</article>
					<section class="media-selection">
						<div class="flexible-row">
							<span><b id="b">Paste</b> URL below and then hit Enter</span>
							<?php if ($verifier->licence->tier > 99) { ?>
							<span><small>&hellip;or&hellip;&nbsp;</small></span>
							<span>
								<input type="file" id="provider-upload-input" style="display:none" onchange="manualUpload(this.files)" accept="video/mp4,video/ogg,video/webm">
								<a href="javascript:;" data-provider="provider-dropbox" class="load" data-embed="link"><i class='ninja-dropbox'></i> Dropbox</a>
								<a href="javascript:;" data-provider="provider-upload" class="load"><i class='ninja-upload'></i> Upload</a>
							</span>
							<?php } ?>
						</div>
						<!-- https://vimeo.com/160978792 https://www.youtube.com/watch?v=OUPBEpfBEXo -->
						<input id="media-url-input" autofocus autocomplete="off" placeholder="e.g. https://vimeo.com/160978792">
						<div id="media-url-feedback"></div>
						<section class="media-surface"></section>
						<div class="media-action-button">
							<a href="javascript:;" class="continue">Video ready - continue</a>
						</div>
					</section>
				</div>
			</section>
			<?php if (true) { ?>
			<section id="edit-timeline">
				<div class="standard-width flex-row-fit">
					<article class="intro">
						<h1>Choose when completion occurs</h1>
						<p>Play or scrub the media up until the point you want it to be considered "complete", then set a completion marker using the <em>Set Marker</em> button.</p>
					</article>
					<section class="media-surface">Please set the media source first.</section>
					<section class="marker flex-row-all">
						<div class="text-center">
							<label for='hhmmss'>Completion Marker:</label> <output id='hhmmss'>00:00:00</output> <span>(<input title='You can also type in a number (1-100) here' class='transparent' type="text" pattern="[0-9]*" size="3" maxlength="3" id='pc' value='0'>%)</span> <a href='javascript:;' id='marker-button' class='white-button'>Set Marker</a>
						</div>
						<div class="text-center inline-controls">
							<div class="colour-picker">
								<label for="playerColour">Player theme:</label>
								<input type='text' id='playerColour' name='playerColour' />
							</div>
							<div class="scrub-control">
								<div class="can-toggle">
									<label for="scrub">Seek bar:</label>
									<select id="scrub">
										<option value="true" selected>Visible</option>
										<option value="false">Hidden</option>
									</select>
								</div>
							</div>
						</div>
					</section>

				</div>
			</section>
			<?php } else { ?>
			<section id="edit-timeline">
				<div class="standard-width">
					<article class='intro'>
						<h1>Add events to the media timeline</h1>
						<p>Play (or scrub) your video then add a marker or action at that position (cue point).</p>
					</article>
					<article class="media-surface">Please choose your media source first.</article>
					<nav id="timeline-actions">
						<span>Add a Marker:</span>
						<a href="javascript:marker('score');">Score</a>
						<a href="javascript:marker('jump');">Jump</a>
						<a href="javascript:marker('name');">Name</a>
						<a href="javascript:marker('stop');">Stop</a>
						<span>Add an Action:</span>
						<a href="javascript:marker('action','caption');">Caption</a>
						<a href="javascript:marker('action','rect');">Annotation</a>
						<a href="javascript:marker('image');">Image</a>
					</nav>
					<section id="timeline-surface">
						<table>
							<thead><tr><th>Timestamp</th><th>Details</th><th>Action</th></tr></thead>
							<tbody>
								<tr><td>00:00:00</td><td>Start of video</td><td><a href="#">-</a></td></tr>
								<tr><td>32:59:59</td><td>Marker: "annotation"</td><td><a href="#">Remove</a></td></tr>
								<tr><td>33:00:00</td><td>Annotation- Rect:[10%,75%,80%,20%], Link:"important", Border: rgb(192,224,61), Duration: 30s, Value: "Click Here"</td><td><a href="#">Edit</a> <a href="#">Remove</a></td></tr>
								<tr><td>33:00:31</td><td>Annotation- Rect:[10%,75%,80%,20%], Link:"important", Border: rgb(255,224,127), Duration: 30s, Value: "I said Click Here"</td><td><a href="#">Edit</a> <a href="#">Remove</a></td></tr>
								<tr><td>33:01:00</td><td>Stop</td><td><a href="#">Remove</a></td></tr>
								<tr><td>33:33:33</td><td>Marker: "important"</td><td><a href="#">Remove</a></td></tr>
								<tr><td>33:33:34</td><td>Score: +50</td><td><a href="#">Edit</a> <a href="#">Remove</a></td></tr>
								<tr><td>33:34:30</td><td>Caption: Duration: 30s, Value: "Moving on ..."</td><td><a href="#">Remove</a></td></tr>
								<tr><td>33:34:35</td><td>Jump: "the_rest"</td><td><a href="#">Remove</a></td></tr>
								<tr><td>33:35:00</td><td>Stop</td><td><a href="#">Remove</a></td></tr>
								<tr><td>32:59:59</td><td>Marker: "the_rest"</td><td><a href="#">Remove</a></td></tr>
								<tr><td>59:59:59</td><td>End of video</td><td><a href="#">-</a></td></tr>
							</tbody>
						</table>
					</section>
				</div>
			</section>
			<?php } ?>
			<?php if (false) { ?>
			<section id="change-settings">
				<div class="standard-width">
					<article class='intro'>
						<h1>Choose your design & settings</h1>
					</article>
				</div>
				<div class="standard-width flex-row">
					<article class="media-surface">Please choose your media source first.</article>
					<aside>
						<h2>Video size</h2>
						<p>Choose whether your video uses the standard small/large sizes reccomended by the video host, or stretch the media to fill available space.</p>
						<div class="block-label">
							<label><input type="radio" name="video-size" value="small" checked> Small</label>
							<label><input type="radio" name="video-size" value="large" checked> Large</label>
							<label><input type="radio" name="video-size" value="maximum" checked> Maximum</label>
						</div>
						<h2>Player controls</h2>
						<p>Choose a theme for the playback controls.</p>
						<div class="block-label">
							<label><input type="radio" name="video-theme" value="default" checked> Default</label>
						</div>
					</aside>
				</div>
			</section>
			<?php } ?>

			<section id="download-zip">
				<form id="settings">

					<section id="basic-options" class="settings-panel standard-width">
						<div class="content">
							<div class="field-row">
								<label for="ocn">Package Name (required)</label>
								<div class="input">
									<input type="text" class="text-input" size="30" placeholder="Course name" name="option-course-name" id="ocn">
								</div>
							</div>
							<div class="field-row">
								<label for="ocd">Description (short, optional)</label>
								<div class="input">
									<textarea  rows="2" class="text-multiline" cols="30" placeholder="Description (optional)" name="option-course-description" id="ocd"></textarea>
								</div>
							</div>
							<div class="field-row">
								<label for="occ">Copyright (optional)</label>
								<div class="input">
									<input type="text" class="text-input" size="30" placeholder="Copyright statement" name="option-course-copyright" id="occ">
								</div>
							</div>
							<?php if (false) {?>
							<div class="field-row">
								<label>Completion</label>
								<div class="input">
									<div class="row"><input type="radio" name="rule" value="last" checked> Learner views whole video</div>
									<div class="row"><input type="radio" name="rule" value="count" data-select="show-enough"> Learner achieves score <input type="number" min="1" max="100" value="1" step="1" size="3">.</div>
								</div>
							</div>
							<?php } ?>
							<div class="field-row">
								<label>Packaging</label>
								<div class="input">
									<div class="row"><input type="radio" name="api" value="scorm12" checked> Scorm 1.2 (most common format)</div>
									<div class="row"><input type="radio" name="api" value="scorm2004"> Scorm 2004</div>
									<div class="row"><input type="radio" name="api" value="none"> No wrapper</div>
								</div>
							</div>
						</div>
					</section>

				</form>

				<div id="download-button-container" class="standard-width">
				<div class="button-row">

					<div class="progress-button elastic" data-destination="download">
						<button><span><i class="ninja-download"></i> Download zip ...</span></button>
						<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" /></svg>
						<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2" /><path d="m31.5,46.5l-8.5,-7.1" /></svg>
						<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3" /><path d="m35,35l9.3,9.3" /><path d="m35,35l-9.3,9.3" /><path d="m35,35l9.3,-9.3" /></svg>
					</div><!-- /progress-button -->

					<div class="progress-button elastic" data-destination="kloudless">
						<button><span><i class="ninja-upload2"></i> Save to Cloud ...</span></button>
						<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
						<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
						<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
					</div>

					<div class="progress-button elastic" data-destination="preview">
						<button><span><i class="fa fa-eye"></i> Open in Preview Ninja</span></button>
						<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" /></svg>
						<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2" /><path d="m31.5,46.5l-8.5,-7.1" /></svg>
						<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3" /><path d="m35,35l9.3,9.3" /><path d="m35,35l-9.3,9.3" /><path d="m35,35l9.3,-9.3" /></svg>
					</div>

<?php if (isset($verifier->api->publish) && !empty($verifier->api->publish)) { ?>
					<div class="progress-button elastic" data-destination="publish">
						<button><span><i class="ninja-upload"></i> Publish to LMS ...</span></button>
						<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
						<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
						<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
					</div>
<?php } ?>

				</div>

				<div class="did-you-know">
					<h3>Did you know?</h3>
					<p>You can go back and fiddle some more at any time.<br/>Your files will stay loaded until you press reset.</p>
					<div id="onsell"></div>
				</div>

				</div>
			</section>

		</main>

		<div id="alert">
			<section class="message-body">
				<div><i class="ninja-warning"></i></div>
				<div id="alert-text"><h3>alert title</h3><p>Insert the alert text in this space.</p></div>
			</section>
			<section class="message-action">
				<button>Okay</button>
			</section>
		</div>

		<div id="loader" class="pageload-overlay" data-opening="M 40,-65 145,80 -65,80 40,-65" data-closing="m 40,-65 0,0 L -65,80 40,-65">
			<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none">
				<path d="M 40,-65 145,80 40,-65"/>
			</svg>
		</div>

		<div id="cog">
			<a data-action='toggle-settings' href="javascript:;" title="App defaults"><i class="fa fa-fw fa-cog"></i></a>
			<div>
				<p data-action='toggle-mute'><a href="javascript:;"><i class="fa fa-fw fa-volume-up"></i> Swoosh sound</a></p>
			</div>
		</div>

		<div id="poweredby">
			Powered by <a href="https://www.coursesuite.ninja/" target="_blank">CourseSuite</a>
		</div>

		<script src="//code.jquery.com/jquery-3.0.0.js" integrity="sha256-jrPLZ+8vDxt2FnE1zvZXCkCcebI/C8Dt5xyaQBjxQIo=" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/plyr/2.0.17/plyr.js"></script>
		<script src="https://cdn.rangetouch.com/0.0.9/rangetouch.js" async></script>
<?php if ($verifier->code->minified) { ?>
		<script src="<?php echo $minified_app; ?>"></script>
<?php } else { ?>

	<?php if (false) { ?>
		<script src="//www.youtube.com/player_api"></script>
		<script src="//f.vimeocdn.com/js/froogaloop2.min.js"></script>
		<script src="//w.soundcloud.com/player/api.js" type="text/javascript"></script>

		<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="iuifa113z5wu3wc"></script>
		<!-- script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" async defer id="dropboxjs" data-app-key="dp6c6o6z0nnsbwp"></script -->
		<script>window.___gcfg = { parsetags: 'explicit' };</script>
		<script src="https://apis.google.com/js/platform.js" async defer></script>

	<?php } ?>
		<script language="JavaScript" type="text/javascript" src="//admin.brightcove.com/js/BrightcoveExperiences.js"></script>
		<script type="text/javascript" src="//admin.brightcove.com/js/api/SmartPlayerAPI.js"></script>

		<script type="text/javascript" src="js/jszip.min.js"></script>
		<script type="text/javascript" src="js/localforage-1.5/localforage.min.js"></script>
		<script type="text/javascript" src="js/lib.js"></script>
		<script type="text/javascript" src="js/spectrum.js"></script>
		<script type="text/javascript" src="js/classie.js"></script>
		<script type="text/javascript" src="js/templates.js"></script>
		<script type="text/javascript" src="js/svgLoader.js"></script>
		<script type="text/javascript" src="js/uiProgressButton.js"></script>
		<script type="text/javascript" src="js/app.js"></script>
<?php } ?>
	</body>
</html>
