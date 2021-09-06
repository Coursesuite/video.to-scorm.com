;(function(V2S, App, undefined) {

	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							DOWNLOAD
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */

	V2S.Downloader = (function () {

		// entry point - works out which button was clicked
		_init = function (uiButtonInstance) {
			var destination = uiButtonInstance.el.dataset.destination;
			switch (destination) {
				case "download":
					_createPackage(_saveAs, uiButtonInstance);
				break;

				case "publish":
					_createPackage(_publishTo, uiButtonInstance);
				break;
			}

		};

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


		// perform a PUT/POST to the destination url
		var _publishTo = function (content, name) {
			const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
			let fd = new FormData();

			let App = {
				Method: "PUT",
				Publish: "https://some-endpoint-dot-com/upload/"
			}
			const button = document.querySelector("div.progress-button[data-destination='publish']");
			const span = button.querySelector("button>span");
			const html = button.innerHTML;
			const progress = document.createElement("progress");
			span.innerHTML = "<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...";
			fd.append("file", content, name);
			xhr.open(App.Method, App.Publish, true);
			xhr.onload = function (result) {
				if (this.status == 200) {
					span.innerHTML = "Uploaded";
				} else {
					span.innerHTML = "Failed";
				}
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
			// xhr.setRequestHeader("content-type", "application/octet-stream");
			xhr.setRequestHeader("Authorization", "Bearer " + App.Bearer);
			xhr.setRequestHeader("X-Filename", name);
			span.innerHTML = ''; span.appendChild(progress);
			xhr.send(fd);
		}

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