;(function(V2S, App, undefined) {

	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							DOWNLOAD
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */

	V2S.Downloader = (function () {

		// entry point - works out which button was clicked
		_init = function (uiButtonInstance) {
			var destination = uiButtonInstance.el.dataset.destination;
			switch (destination) {
				case "kloudless":
					const KLOUDLESS_OUTPUT = window.Kloudless.explorer({app_id: window.KLOUDLESS_APP_ID});

					KLOUDLESS_OUTPUT.on("cancel", function() {
						uiButtonInstance.stop(-1);
					});
					KLOUDLESS_OUTPUT.on("success", function (meta) {
						_createPackage(_kloudlessUpload, uiButtonInstance, meta);
					})
					KLOUDLESS_OUTPUT.choose();

				break;

				case "download":
					_createPackage(_saveAs, uiButtonInstance);
				break;

				case "publish":
					_createPackage(_publishTo, uiButtonInstance);
				break;

				case "preview":
					_createPackage(_openIn, uiButtonInstance);
				break;
			}

		};

//		_createPackage = function (a,b) { console.dir(arguments); }

		// build the zip package in either IMSCP or SCORM mode

		_createPackage = function (fnResult, uiButtonInstance, metadata) {
			var zip = new JSZip(),
				progress = 0,
				manifest = {};

			localforage.getItem("cache")
			.then(function start_download(value) {
				return Promise.resolve({

					provider: (value.plugin === 'upload' || value.plugin === 'cloud') ? '' : value.plugin,
					playerApi: JSON.stringify({
			        	src: value.plugin === 'upload' ? "video.mp4" : value.id,
			        	provider: value.plugin,
		      		}),
		      		isPlyr: value.playerType === 'plyr',
					videoId: value.id||'file-upload',
					starts: value.ranges[0],
					completes: value.ranges[1],
					original: value.original,
					ends: value.ranges[2],
					timestamp: (new Date().getTime()),
					mime: V2S.source.mime||'',
					isVideo: (value.plugin !== 'soundcloud') ? true : false,
					playerType: value.playerType,
					isMediaElement: value.playerType === "mediaelement",
					src: (value.plugin === 'upload' || value.plugin === 'cloud' || value.plugin === 'wistia') ? "video.mp4" : V2S.source.src,
					poster: V2S.source.poster,

					name:  			value['option-course-name'],
					description:  	value['option-course-description'],
					copyright:  	value['option-course-copyright'],
					analytics:  	value['option-ga-id'],
					hideScrub:  	value['option-toggle-scrub'] === "false",
					api: 			value['option-api'],

					hasApi:  value['option-api'] !== "none",

					files: [
						{"template":"outputcss","dest":"style.css"},
						{"template":"outputhtml","dest":"index.html"},
						{"template":"outputjs","dest":"run.js"}
					]
				});
			})
			.then(function check_settings(settings) {

				manifest = settings;

				if (manifest.name.trim() === "") {
					alert("Hang about! Something isn't right.\n\nYou need to at least name your course.");
					throw new Error('Course name was not specified');
				}

				progress += 0.1;
				uiButtonInstance.setProgress(progress);

				return Promise.resolve();

			})
			.then(function compress_files() {

				// compile player templates and add them to the zip
				for (var i=0; i<manifest.files.length; i++ ) {
					var name = manifest.files[i].dest,
						content = Handlebars.templates[manifest.files[i].template](manifest);
					zip.file(name,content);
					progress += 0.1;
					uiButtonInstance.setProgress(progress);
				}
				// attach the uploaded media, if required
				if (manifest.videoId === "file-upload" || manifest.src === "video.mp4") {
					manifest.files.push({"dest":"video.mp4"});
					zip.file("video.mp4", manifest.original); // , {base64: true});
					delete manifest.original;
				}

				// add the scorm manifest
				zip.file("imsmanifest.xml", Handlebars.templates[manifest.api + "manifest"](manifest));

				// add the settings manifest
				zip.file("v2s.ninja", JSON.stringify(manifest));

				return Promise.resolve();


			}).then(function package_fetch_api() {
				progress += 0.1;
				uiButtonInstance.setProgress(progress);
				return fetch("scorm/" + manifest.api + ".zip");

			}).then(function package_fetch_api_buffer(response) {
				progress += 0.1;
				uiButtonInstance.setProgress(progress);
				return response.arrayBuffer();

			}).then(function package_load_api_zip(buffer) {
				progress += 0.1;
				uiButtonInstance.setProgress(progress);
				return zip.loadAsync(buffer);

			}).then(function package_increment_progress(loadedZip) {
				progress += 0.1;
				uiButtonInstance.setProgress(progress);
				return loadedZip;

			}).then(function package_generate_zip(p) {

				progress += 0.1;
				uiButtonInstance.setProgress(progress);

				// compress as best we can, it's not really important how much time this adds at this point
				return zip.generateAsync({
					type: "blob",
				    compression: "DEFLATE",
				    compressionOptions: {
				        level: 9
				    },
				    comment: manifest.description
				}, function updateCallback(metadata) {
				    // console.log("progression: " + metadata.percent.toFixed(2) + " %");
				    //if(metadata.currentFile) {
				    //    console.log("current file = " + metadata.currentFile);
				    //}
				});

			}).then(function package_final_result(content) {
				var zipname = manifest.name.replace(/\s/g,"_").replace(/[^a-z0-9_]/gi,"-");
				uiButtonInstance.stop(1); // >0 = success
				fnResult(content, zipname + ".zip", manifest, metadata);

			})
			.catch(function(err) {
				console.warn(err);
				uiButtonInstance.stop(-1); // >0 = success
			});

		};


		// call the Kloudless save process
		_kloudlessUpload = function (content, name, setup, metadata) {
			const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
			let fd = new FormData();
			const button = document.querySelector("div.progress-button[data-destination='kloudless']");
			const span = button.querySelector("button>span");
			const html = button.innerHTML;
			const progress = document.createElement("progress");
			// span.innerHTML = "<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...";
			fd.append("file", content, name);
			xhr.open("POST", "https://api.kloudless.com/v1/accounts/" + metadata[0].account + "/storage/files/?overwrite=false", true);
			xhr.onload = function (result) {
				span.innerHTML = "Uploaded";
				setTimeout(function() {
					button.innerHTML = html;
				},3456);
			}
			xhr.upload.onprogress = function (e) {
				// console.dir(e);
				progress.value = e.loaded;
				progress.setAttribute("max",e.total);
			}
			xhr.onerror = function (result) {
				span.innerHTML = "<i class='fa fa-eye'></i> Failed (too big?)";
				const ui = new UIProgressButton(button); ui.stop(-1);
				if (result.type === "error") {
					setTimeout(function() {
						button.innerHTML = html;
					},3456);
				}
			}
			xhr.setRequestHeader("content-type", "application/octet-stream");
			xhr.setRequestHeader("X-Kloudless-Metadata", JSON.stringify({"parent_id": metadata[0].id, "name": name}));
			xhr.setRequestHeader("Authorization", atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg=="));
			span.innerHTML = ''; span.appendChild(progress);
			xhr.send(fd);
			// $.ajax({
			// 	beforeSend: function(xhr) {
			// 		xhr.setRequestHeader("X-Kloudless-Metadata", JSON.stringify({"parent_id": metadata[0].id, "name": name}))
			// 	},
			// 	url: "https://api.kloudless.com/v1/accounts/" + metadata[0].account + "/storage/files/?overwrite=false",
			// 	method: "POST",
			// 	contentType: "application/octet-stream",
			// 	headers: {
			// 		"Authorization": atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg==")
			// 	},
			// 	data: content,
			// 	processData: false,
			// 	success: function(status, xhr) {
			// 		alert("Your package has been uploaded.");
			// 	}
			// });
		};

		// perform a PUT/POST to the destination url
		var _publishTo = function (content, name) {
			const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
			let fd = new FormData();
			const button = document.querySelector("div.progress-button[data-destination='publish']");
			const span = button.querySelector("button>span");
			const html = button.innerHTML;
			const progress = document.createElement("progress");
			// span.innerHTML = "<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...";
			fd.append("file", content, name);
			xhr.open(App.Method, App.Publish, true);
			xhr.onload = function (result) {
				span.innerHTML = "Uploaded";
				setTimeout(function() {
					button.innerHTML = html;
					bindDownloadButtons();
				},3456);
			}
			xhr.upload.onprogress = function (e) {
				// console.dir(e);
				progress.value = e.loaded;
				progress.setAttribute("max",e.total);
			}
			xhr.onerror = function (result) {
				span.innerHTML = "<i class='fa fa-eye'></i> Failed (too big?)";
				const ui = new UIProgressButton(button); ui.stop(-1);
				if (result.type === "error") {
					setTimeout(function() {
						button.innerHTML = html;
						bindDownloadButtons();
					},3456);
				}
			}
			xhr.setRequestHeader("content-type", "application/octet-stream");
			xhr.setRequestHeader("Authorization", "Bearer " + App.Bearer);
			xhr.setRequestHeader("X-Filename", name);
			span.innerHTML = ''; span.appendChild(progress);
			xhr.send(fd);
			// var div = document.querySelector("div.progress-button[data-destination='publish']"),
			// 	$span = div.querySelector("button>span"),
			// 	_html = $span.innerHTML;
			// $span.innerHTML = "<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...";
			// var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp'),
			// 	fd = new FormData();
			// fd.append("file", content, name);
			// xhr.open(App.Method, App.Publish, true);
			// xhr.onload = function (result) {
			// 	$span.innerHTML = _html;
			// 	if (this.status == 200) {
			// 		alert("Your package has been uploaded.");
			// 	}
			// }
			// xhr.onerror = function (result) {
			// 	$span.innerHTML = "<i class='fa fa-eye'></i> Upload error (too big?)";
			// 	var ui = new UIProgressButton(div); ui.stop(-1);
			// 	if (result.type === "error") {
			// 		setTimeout(function() {
			// 			$span.innerHTML = _html;
			// 		},3456);
			// 	}
			// }
			// xhr.setRequestHeader("Authorization", "Bearer " + App.Bearer);
			// xhr.setRequestHeader("X-Filename", name);
			// xhr.send(fd);
		};

		var _openIn = function (content, name) {
			const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
			let fd = new FormData();
			const button = document.querySelector("div.progress-button[data-destination='preview']");
			const span = button.querySelector("button>span");
			const html = button.innerHTML;
			const progress = document.createElement("progress");
			fd.append("file", content, name);
			xhr.open("POST", "https://preview.coursesuite.ninja/", true);
			xhr.onload = function (result) {
				span.innerHTML = "Uploaded";
				if (this.status == 200 && isJson(this.responseText)) {
					var obj = JSON.parse(this.responseText);
					popIframe(obj.href);
					setTimeout(function() {
						button.innerHTML = html;
						button.querySelector("button").removeAttribute("disabled");
						bindDownloadButtons();
					},3456);
				} else {
					var ui = new UIProgressButton(button); ui.stop(-1);
					span.innerHTML = "<i class='fa fa-eye'></i> Failed (unauthorized?)";
					setTimeout(function() {
						button.innerHTML = html;
						button.querySelector("button").removeAttribute("disabled");
						bindDownloadButtons();
					},6789);
				}
			}
			xhr.upload.onprogress = function (e) {
				// console.dir(e);
				progress.value = e.loaded;
				progress.setAttribute("max",e.total);
			}
			xhr.onerror = function (result) {
				const ui = new UIProgressButton(button); ui.stop(-1);
				span.innerHTML = "<i class='fa fa-eye'></i> Failed (too big?)";
				if (result.type === "error") {
					setTimeout(function() {
						button.innerHTML = html;
						button.querySelector("button").removeAttribute("disabled");
						bindDownloadButtons();
					},3456);
				}
			}
			// xhr.setRequestHeader("content-type", "application/octet-stream");
			xhr.setRequestHeader("Authorization", location.search);
			xhr.setRequestHeader("X-Filename", name);
			//TODO: support telling the app name xhr.setRequestHeader("X-App", "video2scorm");
			span.innerHTML = ''; span.appendChild(progress);
			xhr.send(fd);

			// var div = document.querySelector("div.progress-button[data-destination='preview']"),
			// 	$span = div.querySelector("button>span"),
			// 	_html = $span.innerHTML;
			// $span.innerHTML = "<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...";
			// var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp'),
			// 	fd = new FormData();
			// fd.append("file", content, name);
			// xhr.open("POST", "https://preview.coursesuite.ninja/", true);
			// xhr.onload = function (e) {
			// 	$span.html(_html);
			// 	if (this.status == 200) {
			// 		var obj = JSON.parse(this.responseText);
			// 		popIframe(obj.href);
			// 		// var popup = window.open(obj.href,'previewninja');
			// 		// if (typeof popup == 'undefined' || popup == null) {
			// 		// 	alert("We tried to popup up the window, but your browser has blocked it (check your browser location bar). Please allow popups from this site, or copy and open this link:\n\n" + obj.href);
			// 		// }
			// 	}
			// }
			// xhr.onerror = function (result) {
			// 	$span.html("<i class='fa fa-eye'></i> Upload error (too big?)");
			// 	var ui = new UIProgressButton(div); ui.stop(-1);
			// 	if (result.type === "error") {
			// 		setTimeout(function() {
			// 			$span.html(_html)
			// 		},3456);
			// 	}
			// }
			// xhr.setRequestHeader("Authorization", location.search);
			// xhr.setRequestHeader("X-Filename", name);
			// xhr.send(fd);
		};

		// perform a browser save-as
		_saveAs = function (content, name, data) {
			var sa = saveAs(content, name);
			if (sa.readyState === 2) {
				content = null;
			}
		}

		// expose public methods
		return {
			Begin: _init
		}
	})();


})(window.V2S = window.V2S || {}, App, undefined);