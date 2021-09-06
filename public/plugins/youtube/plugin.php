<section>
	<form class="uk-padding-small" method="POST">
		<input type="hidden" name="token" value="<?php echo $token; ?>">
    <fieldset class="uk-fieldset">
        <legend class="uk-legend">Search youtube, or enter a video id or url</legend>
        <p class="uk-text-small">Note: advertising and cards on YouTube content is not able to be removed or hidden.</p>
        <div class="uk-flex">
        	<div class="uk-flex-1">
	            <input class="uk-input" type="text" placeholder="Input" name="q">
	        </div>
	        <div class="uk-flex-none">
	        	<button class="uk-button uk-button-primary" data-action="yt-search">Search</button>
	        </div>
        </div>
    </fieldset>
	<div class="yt-results" data-results></div>
  <div id='youtube-LoadingIcon'></div>
</form>
</section>
