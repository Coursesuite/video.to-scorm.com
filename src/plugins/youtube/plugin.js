(function (PLUGINS, undefined) {

	var source = (function () {
		function _init() {
			[].forEach.call(document.querySelectorAll("button[data-action='yt-search']"), function (button) {
				button.addEventListener("click", function (e) {
					e.preventDefault();
					var form = e.target.closest("form");
					document.querySelector(".yt-results").innerHTML = "<img src='css/Infinity-1.5s-50px.svg'>";
					fetch('plugins/' + form.closest("li").dataset.plugin + '/search.php', {
						method: 'post',
						body: new URLSearchParams(Array.from(new FormData(form))).toString(), // https://stackoverflow.com/a/44033425/1238884
						headers: { 'Content-type': 'application/x-www-form-urlencoded' } // https://stackoverflow.com/q/36669911/1238884
					}).then(function(response) {
						return response.json();
					}).then(function(jdata) {
						_render_thumbs(jdata);
					});
				});
			});
		}

		function _render_thumbs(data) {
			var output = [];
			if (data.results.length) {
			data.results.forEach(function(video) {
				output.push(`<figure class='search-result' data-plugin='youtube' data-id='${video.id}' data-duration='${video.duration}' data-length='${timeString(video.duration)}'>
				            <img src='${video.thumbnail}' alt='${video.published}'>
				            <figcaption>${video.title}</figcaption>
				            <small>${video.channel}</small>
			    </figure>`);
			});
			} else {
				output.push(`
					<div class="uk-card uk-card-default uk-card-body">
					    <h3 class="uk-card-title">No results</h3>
					    <p>Try expanding your search terms, or check your spelling.</p>
					</div>
		    	`);
			}
			document.querySelector(".yt-results").innerHTML = output.join('');
		}

		function _get_media(id) {
			return new Promise(function(resolve, reject) {
				resolve({
					name: 'YouTube Video',
					src: "https://www.youtube.com/watch?v="+id,
					poster: "https://img.youtube.com/vi/"+id+"/hqdefault.jpg",
					sources: [''],
					mime: ''
				})
			})
		}

		return {
			name: "youtube",
			playerType: 'mediaelement',
			init: _init,
			get_media: _get_media
		}

	})();

	PLUGINS.push(source);

})(window.V2S.plugins = window.V2S.plugins || []);