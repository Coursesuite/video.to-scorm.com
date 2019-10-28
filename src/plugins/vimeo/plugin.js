(function (PLUGINS, undefined) {

	var source = (function () {
		function _init() {
			document.getElementById('vimeoSearch').addEventListener("click", function (e) {
				e.preventDefault()
				document.getElementById('vimeo-LoadingIcon').innerHTML = "<img src='css/Infinity-1.5s-50px.svg'>"
				var form = e.target.closest("form")
				fetch('plugins/' + form.closest("li").dataset.plugin + '/search.php', {
					method: 'post',
					body: new URLSearchParams(Array.from(new FormData(form))).toString(), // https://stackoverflow.com/a/44033425/1238884
					headers: { 'Content-type': 'application/x-www-form-urlencoded' } // https://stackoverflow.com/q/36669911/1238884
				}).then(function(response) {
					return response.json()
				}).then(function(jdata) {
					_render_thumbs(jdata)
				})
			})
		}

		function _render_thumbs(data) {
			var output = [];
			if (data.results.length) {
			data.results.forEach(function(video) {
				output.push(`<figure class='search-result' data-plugin='vimeo' data-id='${video.id}' data-duration='${video.duration}'>
				            <img src='${video.thumbnail}' alt='${video.published}'>
				            <figcaption>${video.title}</figcaption>
				            <small>${video.channel}</small>
			    </figure>`)
			});
			} else {
				output.push(`
					<div class="uk-card uk-card-default uk-card-body">
					    <h3 class="uk-card-title">No results</h3>
					    <p>Try expanding your search terms, or check your spelling.</p>
					</div>
		    	`)
			}
			document.querySelector(".vim-results").innerHTML = output.join('')
			document.getElementById('vimeo-LoadingIcon').innerHTML = ''
		}

		function _get_media(id) {
			// return new Promise(function(resolve, reject) {
			// 	fetch('http://vimeo.com/api/v2/video/'+id+'.json', {
			// 		method: 'GET',
			// 	})
			// 	.then(function(result) {
			// 		return result.json()
			// 	})
			// 	.then(function(obj) {
			// 		resolve({
			// 			src: "https://player.vimeo.com/video/" + id + "?title=0&amp;byline=0&amp;portrait=0&amp;badge=0",
			// 			poster: obj[0].thumbnail_large,
			// 			// mime: ["video/vimeo", "video/x-vimeo"],
			// 			// sources: ['https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.10/renderers/vimeo.min.js']
			// 		})
			// 	})
			// })
			// return new Promise(function(resolve, reject) {
				// resolve({
				return {
					name: 'Vimeo Video',
					src: "https://player.vimeo.com/video/" + id + "?loop=0&amp;byline=0&amp;portrait=0&amp;title=0&amp;speed=1&amp;transparent=0&amp;gesture=media&amp;badge=0",
					mime: ["video/vimeo", "video/x-vimeo"],
					sources: ['https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/renderers/vimeo.min.js']
				}
				// })
			// })
		}

		function _package() {
			return {
				// this would be a list of the files in this plugin folder that are needed for the runtime, which might be templated somehow so you can inject values into it?
			}
		}

		return {
			type: "video",
			name: "vimeo",
			playerType: 'plyr',
			init: _init,
			get_media: _get_media
		}

	})()

	PLUGINS.push(source)

})(window.V2S.plugins = window.V2S.plugins || [])