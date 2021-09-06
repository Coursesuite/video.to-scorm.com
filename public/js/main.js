localforage.config({ name: 'video2scorm' });

// ;(function(V2S, App, undefined) {
V2S = {};
V2S.plugins = [];
V2S.source = {};

window.addEventListener("DOMContentLoaded", function domContentLoaded() {
	document.body.addEventListener("click", globalClickHandler)
	window.addEventListener("resize", setPlayerWorkAreaSize, false);

	function globalClickHandler(e) {
		if (!e.target) return;
		switch (e.target.dataset.action) {
			case 'clear-storage':
				e.preventDefault();
				localforage.clear().then(function() {
					location.reload(true)
				});
				break;
			default:
				if (e.target.classList.contains("noUi-value")) {
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
	}

	Array.prototype.forEach.call(V2S.plugins, function(plugin) {
		plugin.init(V2S);
	});

	// persist form fields to cache
	document.getElementById("settings").addEventListener('change', function settings_change(event) {
		saveCache();
	});

	document.querySelector("a[data-action='clear-storage']").addEventListener('click', function click_reset(e) {
		localforage.setItem("cache", undefined);
		location.reload();
	});

	localforage.getItem("cache").then(function(value) {
		if (value) {
			V2S['plugin'] = value.plugin;
			V2S['id']  = (value.id)?value.id:undefined;
			V2S['duration'] = ~~value.duration;
			V2S['ranges'] = value.ranges;
			V2S['playerType'] = value.playerType;

			// select the plugin tab, on the video source page
			var tab = document.querySelector("section.section-source .uk-tab");
			for (var n=tab.querySelectorAll("li"), i=0,j=n.length;i<j;i++) {
				if (n[i].firstElementChild.textContent===value.plugin) UIkit.tab(tab).show(i);
			}

			document.getElementById("ocn").value = value['option-course-name'];
			document.getElementById("ocd").value = value['option-course-description'];
			document.getElementById("occ").value = value['option-course-copyright'];
			document.getElementById("gax").value = value['option-ga-id'];

			document.querySelector("input[name='option-toggle-scrub'][value='" + (value['option-toggle-scrub'] || "false") + "']").checked = true;
			document.querySelector("input[name='option-api'][value='" + (value['option-api'] || "scorm12") + "']").checked = true;

			if (value.plugin === 'upload' || (value.plugin === 'cloud' && value.original)) { // locally uploaded file
				V2S['original'] = value.original;
				document.getElementById('upload-FileName').textContent = value.original.name;
				// var p = V2S.plugins.find(function(el){return el.type === 'local'});
		        createVideo({
		          raw: value.original,
		          mime: value.original.type,
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

	bindDownloadButtons();

});

/* -----------------------------------------
	bind download button animation
----------------------------------------- */
function bindDownloadButtons() {
	[].forEach.call(document.querySelectorAll("div[data-destination]"), function (elm, idx) {
		new UIProgressButton(elm, {
			callback: function core_download_button_callback(instance) {
				// DocNinja.routines.Statistics(instance.el.getAttribute("data-destination")); //,App);
			},
			onbegin: V2S.Downloader.Begin
		});
	});
}

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
			dash: {
				debug: false
			},
			poster: source.poster,
			// showPosterWhenPaused: true,
			showPosterWhenEnded: true,
			stretching: 'auto',
			videoHeight: '100%',
			videoWidth: '100%',
			src: source.src,
			success: function(me, node, instance) {
				// Hacktastic function to wait for the duration because the loadedmetadata event hasn't been implemented in me.js
				var once = false;
				function timeout() {
 					setTimeout(function() {
 						// Streaming files don't get duration
 						var urlAr = V2S.id ? V2S.id.split('.') : [];
						if (me.duration || urlAr[urlAr.length-1] === 'm3u8') {
							V2S.duration = me.duration;
							resolve();
						} else {
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
	// destroying a player that is already undefine crashes the plugin renderer - mediaelement doesn't handle it internally
	if (V2S.player) { try { V2S.player.remove(); } catch(ex) {} }
	V2S.player = undefined;
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
	  case 'youtube': case 'dailymotion': case 'soundcloud': case 'facebook': case 'cloud': case 'upload': case 'dacast': case 'wistia': case 'direct': case 'brightcove':
			current_plugin
			.get_media(V2S.id, media)
			.then(function(source) {
				V2S['source'] = source;
				return window.initMediaElementPlayer(source);
			})
			.then(function() {
				if (current_plugin.name !== "upload") document.getElementById(current_plugin.name+'-LoadingIcon').innerHTML = '';

				// Try and get streaming media duration
				function testDuration(){
					return new Promise(function(resolve,reject) {
						function timeout(){
							setTimeout(function(){
								if (V2S.player.duration) {
									// console.log('v2s.player.duration = '+V2S.player.duration)
									V2S.player.pause();
									V2S.duration = V2S.player.duration;
									resolve();
								} else {
									V2S.player.play(); // Play/pause usually gets the duration
									timeout();
								}
							}, 500);
						}
						timeout();
					})
				}
				testDuration()
				.then(function() {
					createSlider();
					setPlayerWorkAreaSize();
					window.dispatchEvent(new Event('resize'));
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
	});

	range.noUiSlider.on('end', function () {
		saveCache();
	});

	document.querySelector("a[href='#range']").click();
	saveCache();
}

// out in global scope for now
function timeString(val) {
	var date = new Date(null);
	date.setSeconds(val);
	var fmt = date.toISOString();
	return (val < 3600) ? fmt.substr(14,5) : fmt.substr(11, 8); // trim hours
}

function highestZindex() {
    return Array.from(document.querySelectorAll("body *")).map(function(a) {
        return parseFloat(window.getComputedStyle(a).zIndex)
    }).filter(function(a) {
        return !isNaN(a)
    }).sort(function(a, b) {
        return a - b
    }).pop()
}

function popIframe(url) {
	if (x = document.getElementById("cs-overlay")) return document.body.style.overflow = "auto", document.body.removeChild(x), !1;
    document.body.insertAdjacentHTML("beforeend", Handlebars.templates['popup']({
    	zindex: highestZindex() + 1,
    	url: url
    }));
}

function isJson(json) {
	try {
		const foo = JSON.parse(json);
	} catch (ex) {
		return false;
	}
	return true;
}