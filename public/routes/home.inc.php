	<div class="uk-section uk-background-primary">
		<div class="uk-container">
			<div class="uk-child-width-1-2@m uk-light" uk-grid>
				<div>
					<h1>Video to Scorm</h1>
					<p class="uk-text-lead">Be a media ninja! Convert video and audio files to a HTML5 SCORM package. Get a completion for watching some or all of a video.</p>
					<p>Works with YouTube, Vimeo, SoundCloud, or upload your own video. More formats coming soon!</p>
				</div>
				<div>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/Zih2i9CY2hE" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</div>

	<div class="uk-section uk-background-muted">
		<div class="uk-container">
			<h3>Add completions to your video</h3>
			<p>It’s never been easier to ensure you have a SCORM compliant video format. This elearning authoring tool will wrap content that is hosted by streaming providers such as YouTube, SoundCloud and Vimeo in a special player that knows how far through a user has watched.</p>
			<p>You can optionally hide the "scrubber" bar (the draggable item that lets users skip ahead or back in a video) so your learners can't skip ahead.</p>
			<p>Then simply set a condition regarding when to mark the media as completed - typically by setting a time/percentage watched. After that marker is reached, we send a SCORM completion to your LMS. We also record how much of the video has been watched. This has two benefits:</p>
			<ul>
				<li>for the learner it means they can exit the activity and come back another time and have the video pick back up where they left off</li>
				<li>for the trainer it means you can report on exactly how much of the media an individual is actually watching or listening to.</li>
			</ul>

			<h3>Why track videos with SCORM?</h3>
			<p>Let's say your learners need to watch material in order to gain a Continuing Professional Development (CPD) credit. Their industries' rules state that they need to watch at least 45 minutes of a 1 hour video in order to gain 1 point.</p>
			<p>With Media Ninja you can do that. You can specify a video URL, set the completion requirement to 75%, and publish it as a SCORM package. You then just drop this into your LMS and start recording the completions.</p>

			<h3>Why support streaming media such as YouTube or Vimeo?</h3>
			<p>YouTube, Vimeo and SoundCloud all work very hard to support the widest range of browsers and platforms for their content - it’s in their best interest.</p>
			<p>This means that your media will play in desktop, tablet and phone devices alike.</p>
			<p class='uk-text-bold'>Maximum flexibility and compatibility</p>
			<p>We use their standard players (not custom 'skins' or players). Embedding media means also embedding a range of possible players, skins, and script files to account for different devices, different browser capabilities, and so on (in most cases duplicating the media in multiple formats). It's much harder, more bug-prone, less customisable, and makes huge files to deal with.</p>
			<p class='uk-text-bold'>Saves you money and time</p>
			<p>Using streaming services is cheaper for you. It saves your servers bandwidth (data-transfer quota and costs per megabyte) from serving potentially large media files. Media is uploaded only once - but can be used in multiple courses and sites, in formats that are correct for the client’s browsers or devices.</p>
			<p>If changes are made to the media, all courses and sites using that media will all automatically get the most current version of the material.</p>
		</div>
	</div>

	<div class="uk-section uk-background-muted">
		<div class="uk-container uk-margin-large uk-padding-large uk-text-center">
			<h2>Browser requirements</h2>
			<p class="uk-hidden@m uk-text-emphasis my-peek uk-box-shadow-medium uk-border-rounded">Web-based app requires a modern Desktop browser</p>
			<div uk-grid="" class="uk-grid-small uk-flex uk-flex-nowrap uk-grid-divider uk-grid">
				<div class="uk-width-2-4 uk-first-column">
					<h3>Develop on</h3>
					<div uk-grid="" class="uk-flex uk-flex-nowrap uk-grid-small uk-child-width-1-6 uk-text-center uk-grid">
						<div class="uk-first-column">
							<img src="assets/screen.svg" class="uk-responsive-width"><p>Desktop</p>
						</div>
						<div>
							<img src="assets/chrome.svg" class="uk-responsive-width"><p>Chrome</p>
						</div>
						<div>
							<img src="assets/firefox.svg" class="uk-responsive-width"><p>Firefox</p>
						</div>
					</div>
				</div>
				<div class="uk-width-2-4">
					<h3>Deliver on</h3>
					<div uk-grid="" class="uk-grid-small uk-child-width-1-6 uk-text-center uk-grid">
						<div class="uk-first-column">
							<img src="assets/deliver.svg" class="uk-responsive-width"><p>All devices</p>
						</div>
						<div>
							<img src="assets/edge.svg" class="uk-responsive-width"><p>IE11/Edge</p>
						</div>
						<div>
							<img src="assets/safari.svg" class="uk-responsive-width"><p>Safari</p>
						</div>
						<div>
							<img src="assets/chrome.svg" class="uk-responsive-width"><p>Chrome</p>
						</div>
						<div>
							<img src="assets/firefox.svg" class="uk-responsive-width"><p>Firefox</p>
						</div>
						<div>
							<img src="assets/opera.svg" class="uk-responsive-width"><p>Opera</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="uk-section uk-background-muted">
		<div class="uk-container uk-margin-large uk-padding-large uk-text-center">
			<nav uk-navbar class="my-launch-bottom"><div class="uk-navbar-center"><?php include "_launch.inc.php"; ?></div></nav>
		</div>
	</div>


	<?php include "_api.inc.php"; ?>