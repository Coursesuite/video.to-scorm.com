//var V2S = new WeakMap();
//V2S.set("plugins",[]);
//V2S.set("source",{});

window['v2s'] = {plugins:[],source:{}};
localforage.config({ name: 'video2scorm' });

window.addEventListener("DOMContentLoaded", function domContentLoaded() {
	document.body.addEventListener("click", globalClickHandler);

	function globalClickHandler(e) {
		if (!e.target) return;
		if (e.target.classList.contains("noUi-value")) { // click a pip
			var pip = Number(e.target.dataset.value),
				range = document.getElementById('range'),
				curr = range.noUiSlider.get().map(Number);
			curr[1] = pip;
			range.noUiSlider.set(curr);
		} else if (e.target.parentNode.dataset.plugin) { // click a video
			window.v2s['plugin'] = e.target.parentNode.dataset.plugin;
			window.v2s['id']  = e.target.parentNode.dataset.id;
			window.v2s['duration'] = ~~e.target.parentNode.dataset.duration;
			//V2S.set('plugin', e.target.parentNode.dataset.plugin);
			//V2S.set('id', e.target.parentNode.dataset.id);
			//V2S.set('duration', ~~e.target.parentNode.dataset.duration);
			createVideo();
			saveCache();
		}
	}

	Array.prototype.forEach.call(window.v2s.plugins, function(plugin) {
		plugin.init();
	});

	window.v2s['player'] = new Plyr('#video-player',{
		debug: false,
		settings: ['quality','speed'],
		youtube: { noCookie: true }
	});

	// window.v2s['player'] = new MediaElementPlayer("video-player", {
 //        pluginPath: 'https://cdn.jsdelivr.net/npm/mediaelement@4.2.7/build/',
 //        success: function (media,node) {
 //        	// console.log(media,node);
 //        },
	// 	features: ['playpause','current', 'duration', 'volume'],
	// 	startVolume: 0.5,
	// 	youtube: {
	// 		nocookie: true,
	// 		autoplay: 0,
	// 		controls: 0,
	// 		modestbranding: 1
	// 	}
	// });

	localforage.getItem("cache").then(function(value) {
		if (value&&value.id) {
			window.v2s['plugin'] = value.plugin;
			window.v2s['id']  = value.id;
			window.v2s['duration'] = ~~value.duration;
			window.v2s['ranges'] = value.ranges;
			var form = document.querySelector("li[data-plugin='" + value.plugin + "']"),
				index = Array.prototype.indexOf.call(form.parentNode.children, form);
			form.querySelector("input[name='q']").value = value.q;
			UIkit.tab(document.querySelector("ul.uk-tab")).show(index);
			createVideo();
		}
	});

	Array.prototype.forEach.call(document.querySelectorAll("li[data-plugin] input[name='q']"), function (el) {
		el.addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				event.target.closest("form").querySelector("button[data-action]").click();
			}
		});
	});

});

function saveCache() {
	var v = {
		id: window.v2s.id,
		plugin: window.v2s.plugin,
		duration: window.v2s.duration,
		q: document.querySelector("li[data-plugin='" + window.v2s.plugin + "'] input[name='q']").value,
		ranges: window.v2s.ranges
	};
	localforage.setItem("cache", v);
}

function createVideo() {
	var current_plugin = window.v2s.plugins.find(function(obj) {
			return (obj.name === window.v2s.plugin);
		});
	window.v2s['source'] = current_plugin.get_media(window.v2s.id);

	if (!window.v2s['player'].paused) window.v2s['player'].pause();

	window.v2s['player'].source = {
	    type: window.v2s.source.type,
	    sources: [
	        {
	            src: window.v2s.source.src, // or window.v2s.id
	            provider: window.v2s.plugin,
	        },
	    ],
	};

	// window.v2s['player'].setSrc(window.v2s.source.src.replace('&amp;', '&'));
	// window.v2s['player'].setPoster('');
	// window.v2s['player'].load();

	createSlider();
}

function createSlider() {
	var range = document.getElementById('range');
	if (range.noUiSlider) {
		range.noUiSlider.destroy();
		delete window.v2s.ranges;
	}
	var ranges = window.v2s.ranges || [0, window.v2s.duration * .75, window.v2s.duration],
		step = (window.v2s.duration/8);

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
				return 5; // 5 is the magic number
			})(),
			filter: function (value, type) {
				if (value === 0 || value === window.v2s.duration) return 3;
				return value % step ? 2 : 1;
			},
			format: {
				to: timeString,
				from: function (val) {
					return val;
				}
			}
		},
		tooltips: [{to: timeString},{to: timeString},{to: timeString}]
	});

	range.noUiSlider.on('update', function () {
		var current_handle_time = arguments[0][arguments[1]];
		var paused = window.v2s['player'].paused;
		window.v2s['ranges'] = arguments[0].map(Number);
		window.v2s['player'].currentTime = current_handle_time;
		if (paused) window.v2s['player'].pause();
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

	document.querySelector(".video-container").closest("section").scrollIntoView({behaviour:"smooth",duration:1000});

}

function timeString(val) {
	var date = new Date(null);
	date.setSeconds(val);
	var fmt = date.toISOString();
	return (val < 3600) ? fmt.substr(14,5) : fmt.substr(11, 8); // trim hours
}