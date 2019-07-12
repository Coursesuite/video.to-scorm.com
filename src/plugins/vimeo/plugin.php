	    	<form class="uk-padding-small" method="POST">
	    		<input type="hidden" name="token" value="<?php echo $token; ?>">
			    <fieldset class="uk-fieldset">
			        <legend class="uk-legend">Search vimeo, or enter a video id or url</legend>
			        <div class="uk-flex">
			        	<div class="uk-flex-1">
				            <input class="uk-input" type="text" placeholder="Input" name="q">
				        </div>
				        <div class="uk-flex-none">
				        	<button class="uk-button uk-button-primary" data-action="vim-search">Search</button>
				        </div>
			        </div>
			    </fieldset>
				<div class="vim-results"></div>
			</form>