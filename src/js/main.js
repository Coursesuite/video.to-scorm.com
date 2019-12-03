window.KLOUDLESS_APP_ID = atob("VU5oR1p2bXpzc3VQQ25Kdm5NZ19FYlF5MVo5a0s1el9nUU1PRk01cXhUU0VnSmxx")
window.KLOUDLESS_INPUT = window.Kloudless.explorer({app_id: KLOUDLESS_APP_ID})
localforage.config({ name: 'video2scorm' });

;(function(V2S, App, undefined) {

V2S.plugins = [];
V2S.source = {};

window.addEventListener("DOMContentLoaded", function domContentLoaded() {
	document.body.addEventListener("click", globalClickHandler)
	window.addEventListener("resize", setPlayerWorkAreaSize, false);

	function globalClickHandler(e) {
		if (!e.target) return;
		if (e.target.id === 'download-button') {
			downloadZip()
		} else if (e.target.id === 'reset') {
			localforage.clear().then(function() {
				location.reload(true)
			})
		} else if (e.target.classList.contains("noUi-value")) {
		  // click a pip
			var pip = Number(e.target.dataset.value),
				range = document.getElementById('range'),
				curr = range.noUiSlider.get().map(Number)
			curr[1] = pip;
			range.noUiSlider.set(curr);
		} else if (e.target.parentNode.dataset.plugin) { // click a video
			V2S['plugin'] = e.target.parentNode.dataset.plugin;
			V2S['id'] = e.target.parentNode.dataset.id;
			V2S['duration'] = ~~e.target.parentNode.dataset.duration;
			createVideo();
			saveCache();
		}
	}

	Array.prototype.forEach.call(V2S.plugins, function(plugin) {
		plugin.init();

	});

	// persist form fields to cache
	document.getElementById("settings").addEventListener('change', function settings_change(event) {
		saveCache();
	});

	// --------------- DIRECT UPLOAD LISTENERS ----------- //

	// Local upload listener
	document.getElementById('localUpload').addEventListener('change', function _file_upload(e) {
		V2S.plugin = 'upload';
		V2S.id = undefined;
		createVideo({
			raw: e.target.files[0],
			mime: e.target.files[0].type,
		});
		e.target.value = null;
	})

	// Kloudless upload listener
	KLOUDLESS_INPUT.on('success', function(files) {
		V2S.plugin = 'cloud';
		V2S.id = undefined;
		createVideo(files[0]);
	})

	// Soundcloud upload listener
	// document.getElementById('soundcloudLoad').addEventListener('click', function(e) {
	// 	V2S.plugin = 'soundcloud'
	// 	V2S.id = document.getElementById('soundcloudUrl').value
	// 	// createVideo()
	// 	embedSoundcloud()
	// })

	// Facebook upload listener
	document.getElementById('facebookLoad').addEventListener('click', function(e) {
		V2S.plugin = 'facebook';
		V2S.id = document.getElementById('facebookUrl').value;
		createVideo();
	})

	// Dacast upload listener
	document.getElementById('dacastLoad').addEventListener('click', function(e) {
		V2S.plugin = 'dacast';
		V2S.id = document.getElementById('dacastUrl').value;
		createVideo();
	})

	// Wistia upload listener
	document.getElementById('wistiaLoad').addEventListener('click', function(e) {
		V2S.plugin = 'wistia';
		V2S.id = document.getElementById('wistiaUrl').value;
		createVideo();
	})

	// Amazon upload listener
	document.getElementById('amazonLoad').addEventListener('click', function(e) {
		V2S.plugin = 'amazon';
		V2S.id = document.getElementById('amazonUrl').value;
		createVideo();
	})

	// Brightcove upload listener
	document.getElementById('brightcoveLoad').addEventListener('click', function(e) {
		V2S.plugin = 'brightcove';
		V2S.id = document.getElementById('brightcoveUrl').value;
		createVideo();
	})

	localforage.getItem("cache").then(function(value) {
		if (value) {
			V2S['plugin'] = value.plugin;
			V2S['id']  = (value.id)?value.id:undefined;
			V2S['duration'] = ~~value.duration;
			V2S['ranges'] = value.ranges;
			V2S['playerType'] = value.playerType;

			document.getElementById("ocn").value = value['option-course-name'];
			document.getElementById("ocd").value = value['option-course-description'];
			document.getElementById("occ").value = value['option-course-copyright'];
			document.getElementById("gax").value = value['option-ga-id'];
			document.querySelector("input[name='option-toggle-scrub'][value='" + (value['option-toggle-scrub'] || "false") + "']").checked = true;
			document.querySelector("input[name='option-api'][value='" + (value['option-api'] || "scorm12") + "']").checked = true;

			if (value.plugin === 'upload') { // locally uploaded file
				V2S['original'] = value.original;
				V2S.plugins
					.find(function(el){return el.type === 'local'})
					.handleFileUpload(value.original)
					.then(function() {
						if (!V2S['player'].paused) V2S['player'].pause();
						createSlider();
						V2S.player.setCurrentTime(0.001);
					});
			} else if (value.plugin === 'cloud') { // Kloudless uploaded file
				V2S['original'] = value.original;
				V2S.plugins
					.find(function(el){return el.type === 'cloud'})
					.reUpload(value.original)
					.then(function() {
						if (!V2S['player'].paused) V2S['player'].pause();
						createSlider();
						V2S.player.setCurrentTime(0.1);
					});
			} else { // embeded videos
				var form = document.querySelector("li[data-plugin='" + value.plugin + "']"),
					index = Array.prototype.indexOf.call(form.parentNode.children, form);
				form.querySelector("input[name='q']").value = value.q;
				UIkit.tab(document.querySelector("ul.uk-tab")).show(index);
				document.querySelector("#switchers .uk-switcher > .uk-active div[data-results]").innerHTML = value.searchResults || '';
				createVideo();
			}
		}
	});

	Array.prototype.forEach.call(document.querySelectorAll("li[data-plugin] input[name='q']"), function (el) {
		el.addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				event.target.closest("section").querySelector("button[data-action]").click();
			}
		})
	});

	/* -----------------------------------------
		bind download button animation
	----------------------------------------- */
	[].forEach.call(document.querySelectorAll("div[data-destination]"), function (elm, idx) {
		new UIProgressButton(elm, {
			callback: function core_download_button_callback(instance) {
				console.dir(instance);
				// DocNinja.routines.Statistics(instance.el.getAttribute("data-destination")); //,App);
			},
			onbegin: downloadZip
		});
	});

});

window.initMediaElementPlayer = function(source) {
	return new Promise(function _init_me_promise(resolve, reject) {
		clearPlayer();
		var playerEl;
		if (source.mime.indexOf('audio') !== -1) {
			var audioEl = document.createElement('audio');
			audioEl.classList.add('audio-element');
			document.getElementById('videoContainer').appendChild(audioEl);
			playerEl = audioEl;
		} else {
			var vidEl = document.createElement('video');
			vidEl.classList.add('video-element');
			document.getElementById('videoContainer').appendChild(vidEl);
			playerEl = vidEl;
		}
		V2S['player'] = new MediaElementPlayer(playerEl, {
			features: ['playpause','current', 'duration', 'volume', 'progress'],
			startVolume: 0.5,
			youtube: {
				nocookie: true,
				autoplay: 0,
				controls: 0,
				modestbranding: 1
			},
			poster: source.poster,
			// showPosterWhenPaused: true,
			showPosterWhenEnded: true,
			stretching: 'auto',
			videoHeight: '100%',
			videoWidth: '100%',
			src: source.src,
			success: function(me, node, instance) {
		    // me.addEventListener('loadedmetadata', function _loaded_src(e) {
				// https://github.com/mediaelement/mediaelement/issues/2685
				// https://stackoverflow.com/questions/57764304/mediaelement-js-loadedmetadata-event-always-returns-duration-0-for-facebook-vi

				// Hacktastic function to wait for the duration because the loadedmetadata event hasn't been implemented in me.js
				var once = false;
				function timeout() {
 					setTimeout(function() {
 						// Streaming files don't get duration
						if (me.duration || V2S.plugin === 'dacast' || V2S.plugin === 'wistia' || V2S.plugin === 'brightcove') {
							V2S.duration = me.duration;
							resolve();
						} else {
							// Direct videos get duration "after a while"
							// console.log('no duration, waiting...');
							if (V2S.plugin === 'dailymotion' && V2S['player'].paused && !once) { // Dailymotion jank
								once = true;
								V2S['player'].play();
								V2S['player'].pause();
							}
							timeout();
						}
 					}, 500);
				}
				timeout();
		    // })
			},
			error: function(error, media, node) {
				console.warn(error);
			}
		})
		V2S['player'].setSrc(source.src);
		V2S['player'].setPoster(source.poster);
		V2S['player'].load();
		V2S.playerType = 'mediaelement';
	})

}

window.initPlyrPlayer = function(source='') {
	if (V2S.playerType === 'plyr' && V2S['player']) {
		V2S['player'].source = {
			type: source.mime[0].split('/')[0],
			sources: [{
				src: source.src,
				provider: V2S.plugin
			}]
		}
		V2S.playerType = 'plyr';
	} else {
		clearPlayer();
		var vidEl = document.createElement('video');
		vidEl.classList.add('video-element');
		document.getElementById('videoContainer').appendChild(vidEl);
		V2S['player'] = new Plyr(vidEl, {
			debug: false,
			settings: ['quality','speed'],
			youtube: { noCookie: true },
			vimeo: {sidedock:0, controls:0, dnt: 1} // see https://github.com/sampotts/plyr/issues/1563
		});
		V2S.playerType = 'plyr';
	}
}

function embedSoundcloud() {
	var plugin = V2S.plugins.find(function(obj) {
		return (obj.name === 'soundcloud');
	});
	plugin
		.get_media()
		.then(function(iframe) {
			var vc = document.getElementById('videoContainer');
			vc.innerHTML = iframe;
			vc.addEventListener('time', function(e){console.log(e)});
		});
}

function setPlayerWorkAreaSize(fromEvent) {

	if (fromEvent && !document.querySelector(".section-range.uk-active")) { console.warn("bail"); return};

	var w = document.querySelector("section.uk-active .uk-container").offsetWidth, // same everywhere
		h = w * .5625, // height=56.25% of width,  or (w / 16) * 9
		a = document.querySelector('mediaelementwrapper audio');

	if (a) {
		document.getElementById("videoContainer").style.height = "auto";
	} else {
		document.getElementById("videoContainer").style.height = h + "px";
	}
	if (V2S.plugin === 'facebook') {
		document.querySelector('.video-element').style.height = remaining + 'px';
		frame.style.height = height + 'px';
	}
}

function clearPlayer() {
	V2S.playerType = '';
	document.getElementById('videoContainer').innerHTML = '';
}

function saveCache() {
	var query = document.querySelector("li[data-plugin='" + V2S.plugin + "'] input[name='q']"),
		fields = document.querySelectorAll("section.section-download input,section.section-download textarea");
	var v = {
		id: 				V2S.id,
		plugin: 			V2S.plugin,
		duration: 			V2S.duration,
		q: 					(query) ? query.value : '',
		ranges: 			V2S.ranges,
		original: 			(V2S.source.original) ? V2S.source.original : '',
		playerType: 		V2S.playerType,
		searchResults: 		document.querySelector("#switchers .uk-switcher > .uk-active div[data-results]").innerHTML,
		"option-course-name": document.getElementById("ocn").value,
		"option-course-description": document.getElementById("ocd").value,
		"option-course-copyright": document.getElementById("occ").value,
		"option-ga-id": document.getElementById("gax").value,
		"option-toggle-scrub": document.querySelector("input[name='option-toggle-scrub']:checked").value,
		"option-api": document.querySelector("input[name='option-api']:checked").value,
	};
	localforage.setItem("cache", v);
}

function createVideo(media) {
	var current_plugin = V2S.plugins.find(function(obj) {
		return (obj.name === V2S.plugin);
	});
	document.getElementById(current_plugin.name+'-LoadingIcon').innerHTML = "<img src='css/Infinity-1.5s-50px.svg'>";
	switch (current_plugin.name) {
		// PLYR
		case 'vimeo':
			V2S['source'] = current_plugin.get_media(V2S.id);
			window.initPlyrPlayer(V2S['source']);
			V2S['player'].source = {
			    type: V2S.source.type,
			    sources: [{
			        src: V2S.source.src, // or V2S.id
			        provider: V2S.plugin,
		      	}]
			}
			createSlider();
			document.getElementById(current_plugin.name+'-LoadingIcon').innerHTML = '';
			break;

		// MediaElement
	  case 'youtube': case 'dailymotion': case 'soundcloud': case 'facebook': case 'cloud': case 'upload': case 'dacast': case 'wistia': case 'amazon': case 'brightcove':
			current_plugin
				.get_media(V2S.id, media)
				.then(function(source) {
					V2S['source'] = source;
					return window.initMediaElementPlayer(source);
				})
				.then(function() {
					document.getElementById(current_plugin.name+'-LoadingIcon').innerHTML = ''

					// Try and get streaming media duration
					function testDuration(){
						return new Promise(function(resolve,reject) {
							function timeout(){
								setTimeout(function(){
									if (V2S.player.duration) {
										V2S.player.pause();
										V2S.duration = V2S.player.duration;
										resolve();
									} else {
										V2S.player.play();
										// console.info('awaiting duration...');
										timeout();
									}
								}, 500);
							}
							timeout()
						})
					}
					testDuration()
						.then(function() {

							setPlayerWorkAreaSize();


				// var wrapper = document.querySelector('mediaelementwrapper');
				// //var frame = wrapper.querySelector('iframe') || wrapper.querySelector('video');
				// var audio = wrapper.querySelector('audio');
				// if (frame && !audio) {
				// // 	// try and make fb videos fit
				// // 	if (current_plugin.name === 'facebook') {
				// // 		var height = (document.documentElement.clientHeight - bannerHeight) + 'px';
				// // 		document.getElementById('videoContainer').style.height = height;
				// // 		document.querySelector('.video-element').style.height = height;
				// // 		frame.style.height = height;
				// // 	} else {
				// // 		document.getElementById('videoContainer').style.height = frame.clientHeight+'px';
				// // 	}
				// }
				// if (audio) document.getElementById('videoContainer').style.height = 'auto';


							// Becuase some videos dont start loading until played
							// V2S['player'].play()
							// V2S['player'].pause()

							createSlider();
							V2S['player'].setCurrentTime(0.01); // Becuase some videos start at the end // If you set it to 0 it wont buffer until you scrub manually
						});
				});
			break
	}
}

function createSlider() {
	var range = document.getElementById('range');
	if (range.noUiSlider) {
		range.noUiSlider.destroy();
		delete V2S.ranges;
	}
	var ranges = V2S.ranges || [0, V2S.duration * .75, V2S.duration],
		step = (V2S.duration/8);

	noUiSlider.create(range, {
		range: {
			'min': [0],
			'max': [V2S.duration]
		},
		start: ranges,
		pips: {
			mode: 'values',
			values: (function () {
				var r = []; for(var i=0;i<V2S.duration; i+=step) r.push(i); r.push(V2S.duration); return r;
			})(),
			density: (function () {
				return 5 // 5 is the magic number
			})(),
			filter: function (value, type) {
				if (value === 0 || value === V2S.duration) return 3
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
		var current_handle_time = Number(arguments[0][arguments[1]]);
		var paused = V2S['player'].paused;
		V2S['ranges'] = arguments[0].map(Number);
		V2S['player'].currentTime = current_handle_time;
		if (paused) V2S['player'].pause();
		// arguments = (values, handle, unencoded, tap, positions) {
	    // values: Current slider values (array);
	    // handle: Handle that caused the event (number);
	    // unencoded: Slider values without formatting (array);
	    // tap: Event was caused by the user tapping the slider (boolean);
	    // positions: Left offset of the handles (array);
	});

	range.noUiSlider.on('end', function () {
		saveCache();
	});

	document.querySelector("a[href='#range']").click();
	saveCache();
}

function downloadZip() {
	var zip = new JSZip();
	var current_plugin = V2S.plugins.find(function(obj) {
		return (obj.name === V2S.plugin);
	})
	var uploadName = V2S.source.name;
	var setup = {
		provider: (V2S.plugin === 'upload' || V2S.plugin === 'cloud')?'':V2S.plugin,
		playerApi: V2S.source.sources[0],
		videoId: V2S.id||uploadName,
		starts: V2S.ranges[0],
		completes: V2S.ranges[1],
		ends: V2S.ranges[2],
		timeStamp: (new Date().getTime()),
		mime: V2S.source.mime||'',
		hideScrub: document.getElementById('toggleScrub').checked,
		isVideo: (V2S.plugin !== 'soundcloud') ? true : false,
		playerType: current_plugin.playerType,
		src: (V2S.plugin === 'upload' || V2S.plugin === 'cloud' || V2S.plugin === 'wistia') ? uploadName : V2S.source.src,
		poster: V2S.source.poster
	}
	zip.file('index.html', Handlebars.templates['outputhtml'](setup));
	zip.file('_package.css', Handlebars.templates['outputcss'](setup));
	zip.file('_package.js', Handlebars.templates['outputjs'](setup));
	zip.file('imsmanifest.xml', Handlebars.templates['scorm12manifest'](setup));
	if (V2S.plugin === 'upload' || V2S.plugin === 'cloud' || V2S.plugin === 'wistia') {
		zip.file(uploadName, V2S.source.original);
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
	});
}

})(window.V2S = window.V2S || {}, App, undefined);

// out in global scope for now
function timeString(val) {
	var date = new Date(null);
	date.setSeconds(val);
	var fmt = date.toISOString();
	return (val < 3600) ? fmt.substr(14,5) : fmt.substr(11, 8); // trim hours
}