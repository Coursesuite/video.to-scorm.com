<a href="#" class="uk-button my-launch"><span uk-icon="bolt"></span> Launch App</a>
<div uk-dropdown="mode:click; pos:bottom-justify;" class="uk-background-muted uk-text-left">
	<div>
    	<fieldset class="uk-fieldset">
		    <legend class="uk-legend">Licence Key</legend>
	        <div class="uk-margin-small uk-grid-small uk-grid">
	        	<div class="uk-width-expand">
		            <input class="uk-input uk-form-small" type="text" placeholder="Enter your licence key" name="licencekey" onchange="readify()">
		        </div>
		        <div>
		        	<button onclick="launch(this)" class="uk-button uk-button-primary uk-button-small">Go</button>
		        </div>
	        </div>
	        <div class="uk-margin-small ">
	        	<label><input class="uk-checkbox" type="checkbox" checked> Remember on this computer</label>

	        </div>
    	</fieldset>
	</div>
	<hr class="uk-divider-icon">
	<p>You need a licence to use this software: A licence is good for so many days, then it stops working. Buy only what you need, when you need.</p>
	<table class="uk-table uk-table-small uk-table-divider uk-table-hover">
	    <thead>
	        <tr>
	            <th>Licence</th>
	            <th>Price</th>
	            <th>Buy</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr>
	            <td>10 Days</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="video-to-scorm-10" data-format="%price" data-fsc-item-path-value="video-to-scorm-10">$5</td>
	            <td><a href="#" data-fsc-item-path-value="video-to-scorm-10" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>30 Days</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="video-to-scorm-30" data-format="%price" data-fsc-item-path-value="video-to-scorm-30">$13</td>
	            <td><a href="#" data-fsc-item-path-value="video-to-scorm-30" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>60 Days</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="video-to-scorm-60" data-format="%price" data-fsc-item-path-value="video-to-scorm-60">$21</td>
	            <td><a href="#" data-fsc-item-path-value="video-to-scorm-60" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>1 year</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="video-to-scorm-365" data-format="%price" data-fsc-item-path-value="video-to-scorm-365">$150</td>
	            <td><a href="#" data-fsc-item-path-value="video-to-scorm-365" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	    </tbody>
	</table>

</div>