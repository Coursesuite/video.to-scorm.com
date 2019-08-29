window['v2s'] = {plugins:[],source:{}}
window.KLOUDLESS_APP_ID = atob("VU5oR1p2bXpzc3VQQ25Kdm5NZ19FYlF5MVo5a0s1el9nUU1PRk01cXhUU0VnSmxx")
window.KLOUDLESS_INPUT = window.Kloudless.explorer({app_id: KLOUDLESS_APP_ID})
localforage.config({ name: 'video2scorm' })

window.addEventListener("DOMContentLoaded", function domContentLoaded() {
	document.body.addEventListener("click", globalClickHandler)

	function globalClickHandler(e) {
		if (!e.target) return;
		if (e.target.id === 'download-button') {
			downloadZip()
		} else if (e.target.classList.contains("noUi-value")) { // click a pip
			var pip = Number(e.target.dataset.value),
				range = document.getElementById('range'),
				curr = range.noUiSlider.get().map(Number)
			curr[1] = pip
			range.noUiSlider.set(curr)
		} else if (e.target.parentNode.dataset.plugin) { // click a video
			window.v2s['plugin'] = e.target.parentNode.dataset.plugin
			window.v2s['id']  = e.target.parentNode.dataset.id
			window.v2s['duration'] = ~~e.target.parentNode.dataset.duration
			createVideo()
			saveCache()
		}
	}

	Array.prototype.forEach.call(window.v2s.plugins, function(plugin) {
		plugin.init()
	})

	// Local upload listener
	document.getElementById('localUpload').addEventListener('change', function _file_upload(e) {
		window.v2s.plugins.find(function(el){return el.name === 'upload'}).handleFileUpload(e.target.files[0])
		.then(function(){
			e.target.value = null
			createSlider()
			saveCache()
		})
	})

	//Kloudless upload listener
	KLOUDLESS_INPUT.on('success', function(files) {
		document.getElementById('cloud-LoadingIcon').innerHTML = "<img src='css/Infinity-1.5s-50px.svg'>"
		window.v2s.plugins.find(function(el){return el.name === 'cloud'}).handleFileUpload(files[0])
		.then(function() {
			createSlider()
			window.v2s.player.setCurrentTime(0.1)
			saveCache()
			document.getElementById('cloud-LoadingIcon').innerHTML = ''
		})
	})

	//Soundcloud upload listener
	document.getElementById('soundcloudLoad').addEventListener('click', function(e) {
		window.v2s.plugin = 'soundcloud'
		window.v2s.id = document.getElementById('soundcloudUrl').value
		createVideo()
	})

	//Facebook upload listener
	document.getElementById('facebookLoad').addEventListener('click', function(e) {
		window.v2s.plugin = 'facebook'
		window.v2s.id = document.getElementById('facebookUrl').value
		createVideo()
	})

	// window.v2s['player'] = new Plyr('#video-player',{
	// 	debug: false,
	// 	settings: ['quality','speed'],
	// 	youtube: { noCookie: true }
	// });
	// if (window.v2s['player']) window.v2s['player'].remove()

	// window.v2s['player'] = new MediaElementPlayer("video-player", {
 //    //pluginPath: 'https://cdn.jsdelivr.net/npm/mediaelement@4.2.7/build/',
 //    success: function (media,node) {
 //    	console.log(media,node)
 //    },
	// 	features: ['playpause','current', 'duration', 'volume', 'progress'],
	// 	startVolume: 0.5,
	// 	youtube: {
	// 		nocookie: true,
	// 		autoplay: 0,
	// 		controls: 0,
	// 		modestbranding: 1
	// 	},
	// 	showPosterWhenPaused: true,
	// 	showPosterWhenEnded: true,
	// 	alwaysShowControls: true,
	// });

	localforage.getItem("cache").then(function(value) {
		if (value) {
			window.v2s['plugin'] = value.plugin
			window.v2s['id']  = (value.id)?value.id:undefined
			window.v2s['duration'] = ~~value.duration
			window.v2s['ranges'] = value.ranges
			window.v2s['playerType'] = value.playerType
			if (value.plugin === 'upload') { // locally uploaded file
				window.v2s['original'] = value.original
				window.v2s.plugins.find(function(el){return el.type === 'local'}).handleFileUpload(value.original)
				.then(function() {
					if (!window.v2s['player'].paused) window.v2s['player'].pause()
					createSlider()
					window.v2s.player.setCurrentTime(0.1)
				})
			} else if (value.plugin === 'cloud') { // Kloudless uploaded file
				window.v2s['original'] = value.original
				window.v2s.plugins.find(function(el){return el.type === 'cloud'}).reUpload(value.original)
				.then(function() {
					if (!window.v2s['player'].paused) window.v2s['player'].pause()
					createSlider()
					window.v2s.player.setCurrentTime(0.1)
				})
			} else { // embeded videos
				var form = document.querySelector("li[data-plugin='" + value.plugin + "']"),
					index = Array.prototype.indexOf.call(form.parentNode.children, form)
				form.querySelector("input[name='q']").value = value.q
				UIkit.tab(document.querySelector("ul.uk-tab")).show(index)
				createVideo()
			}
		}
	});

	Array.prototype.forEach.call(document.querySelectorAll("li[data-plugin] input[name='q']"), function (el) {
		el.addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
				event.preventDefault()
				event.target.closest("section").querySelector("button[data-action]").click()
			}
		})
	})
})

window.initMediaElementPlayer = function(source) {
	return new Promise(function _init_me_promise(resolve, reject) {
		clearPlayer()
		var playerEl;
		if (source.src.indexOf('soundcloud') !== -1) {
			var audioEl = document.createElement('audio')
			audioEl.classList.add('audio-element')
			document.getElementById('videoContainer').appendChild(audioEl)
			playerEl = audioEl
		} else {
			var vidEl = document.createElement('video')
			vidEl.classList.add('video-element')
			document.getElementById('videoContainer').appendChild(vidEl)
			playerEl = vidEl
		}
		window.v2s['player'] = new MediaElementPlayer(playerEl, {
			features: ['playpause','current', 'duration', 'volume', 'progress'],
			startVolume: 0.5,
			youtube: {
				nocookie: true,
				autoplay: 0,
				controls: 0,
				modestbranding: 1
			},
			poster: source.poster,
			showPosterWhenPaused: true,
			showPosterWhenEnded: true,
			stretching: 'auto',
			videoHeight: '100%',
			videoWidth: '100%',
			src: source.src,
			success: function(me, node) {
		    me.addEventListener('loadedmetadata', function _loaded_src(e) {
 					// https://github.com/mediaelement/mediaelement/issues/2685
		      window.v2s.duration = me.duration
		      console.log(me.duration)
		      resolve()
		    })
			}
		})
		window.v2s['player'].setSrc(source.src)
		window.v2s['player'].setPoster(source.poster)
		window.v2s['player'].load()
		window.v2s.playerType = 'mediaelement'
	})

}

window.initPlyrPlayer = function(source='') {
	if (window.v2s.playerType === 'plyr' && window.v2s['player']) {
		window.v2s['player'].source = {
			type: source.mime[0].split('/')[0],
			sources: [{
				src: source.src,
				provider: window.v2s.plugin
			}]
		}
		window.v2s.playerType = 'plyr'
	}
	else {
		clearPlayer()
		var vidEl = document.createElement('video')
		vidEl.classList.add('video-element')
		document.getElementById('videoContainer').appendChild(vidEl)
		window.v2s['player'] = new Plyr(vidEl, {
			debug: false,
			settings: ['quality','speed'],
			youtube: { noCookie: true }
		});
		window.v2s.playerType = 'plyr'
	}
}

function clearPlayer() {
	// if (window.v2s.playerType === 'plyr' && window.v2s["player"]) window.v2s["player"].destroy()
	// else if (window.v2s.playerType === 'mediaelement' && window.v2s["player"]) window.v2s["player"].remove()
	window.v2s.playerType = ''
	var vidContainer = document.getElementById('videoContainer')
	if (vidContainer.children.length) {
		while (vidContainer.children.length) {
			vidContainer.children[0].parentNode.removeChild(vidContainer.children[0])	
		}
	}
}

function saveCache() {
	var query = document.querySelector("li[data-plugin='" + window.v2s.plugin + "'] input[name='q']");
	var v = {
		id: window.v2s.id,
		plugin: window.v2s.plugin,
		duration: window.v2s.duration,
		q: (query)?query.value:'',
		ranges: window.v2s.ranges,
		original: (window.v2s.source.original)?window.v2s.source.original:'',
		playerType: window.v2s.playerType,
	};
	localforage.setItem("cache", v)
}

function createVideo() {
	var current_plugin = window.v2s.plugins.find(function(obj) {
			return (obj.name === window.v2s.plugin)
	})
	document.getElementById(current_plugin.name+'-LoadingIcon').innerHTML = "<img src='css/Infinity-1.5s-50px.svg'>"
	switch (current_plugin.name) {
		case 'vimeo': // PLYR
			window.v2s['source'] = current_plugin.get_media(window.v2s.id)
			window.initPlyrPlayer(window.v2s['source'])
			window.v2s['player'].source = {
		    type: window.v2s.source.type,
		    sources: [
		      {
		        src: window.v2s.source.src, // or window.v2s.id
		        provider: (window.v2s.plugin === 'upload' || window.v2s.plugin === 'cloud') ? '':window.v2s.plugin,
		      },
		    ],
			}
			createSlider()
			document.getElementById(current_plugin.name+'-LoadingIcon').innerHTML = ''
			break
		 case 'youtube': case 'dailymotion': case 'soundcloud': case 'facebook': // MediaElement
			current_plugin.get_media(window.v2s.id)
			.then(function(source) {
				window.v2s['source'] = source
				return window.initMediaElementPlayer(source)
			})	
			.then(function() {
				createSlider()
				window.v2s['player'].setCurrentTime(0.1) // Becuase some videos start at the end // If you set it to 0 it wont buffer until you scrub manually
				document.getElementById(current_plugin.name+'-LoadingIcon').innerHTML = ''

				// Sizing stuff
				var wrapper = document.querySelector('mediaelementwrapper')
				var frame = wrapper.querySelector('iframe')
				window.v2s['player'].setPlayerSize(frame.clientWidth, frame.clientHeight)
				document.getElementById('videoContainer').style.height = frame.clientHeight+'px'
			})
			break
	} 
}

function createSlider() {
	var range = document.getElementById('range')
	if (range.noUiSlider) {
		range.noUiSlider.destroy()
		delete window.v2s.ranges
	}
	var ranges = window.v2s.ranges || [0, window.v2s.duration * .75, window.v2s.duration],
		step = (window.v2s.duration/8)

	noUiSlider.create(range, {
		range: {
			'min': [0],
			'max': [window.v2s.duration]
		},
		start: ranges,
		pips: {
			mode: 'values',
			values: (function () {
				var r = []; for(var i=0;i<window.v2s.duration; i+=step) r.push(i); r.push(window.v2s.duration); return r;
			})(),
			density: (function () {
				return 5 // 5 is the magic number
			})(),
			filter: function (value, type) {
				if (value === 0 || value === window.v2s.duration) return 3
				return value % step ? 2 : 1
			},
			format: {
				to: timeString,
				from: function (val) {
					return val
				}
			}
		},
		tooltips: [{to: timeString},{to: timeString},{to: timeString}]
	});

	range.noUiSlider.on('update', function () {
		var current_handle_time = Number(arguments[0][arguments[1]])
		var paused = window.v2s['player'].paused
		window.v2s['ranges'] = arguments[0].map(Number)
		window.v2s['player'].currentTime = current_handle_time
		if (paused) window.v2s['player'].pause()
		// arguments = (values, handle, unencoded, tap, positions) {
	    // values: Current slider values (array);
	    // handle: Handle that caused the event (number);
	    // unencoded: Slider values without formatting (array);
	    // tap: Event was caused by the user tapping the slider (boolean);
	    // positions: Left offset of the handles (array);
	});

	range.noUiSlider.on('end', function () {
		saveCache()
	});

	document.querySelector(".video-container").closest("section").scrollIntoView({behaviour:"smooth",duration:1000})
	saveCache()
}

function timeString(val) {
	var date = new Date(null)
	date.setSeconds(val)
	var fmt = date.toISOString()
	return (val < 3600) ? fmt.substr(14,5) : fmt.substr(11, 8) // trim hours
}

function downloadZip() {
	var zip = new JSZip()
	if (window.v2s.plugin === 'upload' || window.v2s.plugin === 'cloud') var uploadName = 'media.'+window.v2s.source.mime.split('/')[1]
	var current_plugin = window.v2s.plugins.find(function(obj) {
			return (obj.name === window.v2s.plugin)
	})
	var setup = {
		provider: (window.v2s.plugin === 'upload' || window.v2s.plugin === 'cloud')?'':window.v2s.plugin,
		playerApi: window.v2s.source.sources[0],
		videoId: window.v2s.id||uploadName,
		starts: window.v2s.ranges[0],
		completes: window.v2s.ranges[1],
		ends: window.v2s.ranges[2],
		timeStamp: (new Date().getTime()),
		mime: window.v2s.source.mime||'',
		hideScrub: document.getElementById('toggleScrub').checked,
		isVideo: (window.v2s.plugin !== 'soundcloud') ? true : false,
		playerType: current_plugin.playerType,
		src: (window.v2s.plugin === 'upload') ? uploadName : window.v2s.source.src,
		poster: window.v2s.source.poster
	}
	zip.file('index.html', Handlebars.templates['outputhtml'](setup))
	zip.file('_package.css', Handlebars.templates['outputcss'](setup))
	zip.file('_package.js', Handlebars.templates['outputjs'](setup))
	zip.file('imsmanifest.xml', Handlebars.templates['scorm12manifest'](setup))
	if (window.v2s.plugin === 'upload' || window.v2s.plugin === 'cloud') {
		zip.file(uploadName, window.v2s.source.original)
	}

	zip.generateAsync({
		type:"blob",
    compression: "DEFLATE",
    compressionOptions: {
        level: 9
    }
	})
	.then(function(content) {
		saveAs(content, 'v2sTest.zip')
	})
}