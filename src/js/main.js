window.v2s = {plugins:[]};

window.addEventListener("DOMContentLoaded", function domContentLoaded() {
	document.body.addEventListener("click", globalClickHandler);

	function globalClickHandler(e) {
		if (!e.target) return;
		if (e.target.parentNode.dataset.plugin) {
			window.v2s['plugin'] = e.target.parentNode.dataset.plugin;
			window.v2s['id']  = e.target.parentNode.dataset.id;
			window.v2s['duration'] = ~~e.target.parentNode.dataset.duration;
			createVideo();
		}
	}

	[].forEach.call(window.v2s.plugins, function(plugin) {
		plugin.init();
	});
});

function createVideo() {
	var current_plugin = window.v2s.plugins.find(function(obj) {
			return (obj.name === window.v2s.plugin);
		});

	window.v2s['player'] = new MediaElementPlayer(document.querySelector("#video-player"), {
        pluginPath: 'https://cdn.jsdelivr.net/npm/mediaelement@4.2.7/build/',
        success: function (e) {}
	});

	window.v2s['player'].setSrc(current_plugin.get_media(window.v2s.id));
	window.v2s['player'].setPoster('');
	window.v2s['player'].load();

	createSlider();
}

function createSlider() {
	var range = document.getElementById('range');
	if (range.noUiSlider) range.noUiSlider.destroy();
	noUiSlider.create(range, {
		range: {
			'min': [0],
			'max': [window.v2s.duration]
		},
		start: [0, window.v2s.duration * .75, window.v2s.duration],
		pips: {
			mode: 'values',
			values: (function () {
				var r = []; for(var i=0;i<window.v2s.duration; i+=10) r.push(i); r.push(window.v2s.duration); return r;
			})(),
			density: function () {
				return 3;
				// TODO: sort this out for long videos
				// the value represents how many pips are placed per 1% of the timeline
				// theres giong go be a large one for every minute, you need to determine how many there are between that fit
				// this will almost certainly rely on magic numbers.
				return window.v2s.duration / 10;
			},
			filter: function (value, type) {
				if (value === 0 || value === window.v2s.duration) return 3;
				return value % 60 ? 2 : 1;
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

	document.querySelector(".video-container").closest("section").scrollIntoView({behaviour:"smooth",duration:1000});

}

function timeString(val) {
	var date = new Date(null);
	date.setSeconds(val);
	var fmt = date.toISOString();
	return (val < 3600) ? fmt.substr(14,5) : fmt.substr(11, 8); // trim hours
}