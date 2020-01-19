(function(PLUGINS, undefined) {

  // Currently no feedback when loading selected video

  var source = (function() {

    function _init() {
      KLOUDLESS_APP_ID = atob("VU5oR1p2bXpzc3VQQ25Kdm5NZ19FYlF5MVo5a0s1el9nUU1PRk01cXhUU0VnSmxx")
      KLOUDLESS_INPUT = window.Kloudless.explorer({app_id: KLOUDLESS_APP_ID})
      document.getElementById('kloudlessUpload').addEventListener('click', function(e) {
        window.KLOUDLESS_INPUT.choose()
      })
      KLOUDLESS_INPUT.on('success', function(files) {
        V2S.plugin = 'cloud';

        var supported = ['video/mp4','/x-mpegurl','/ogg','video/webm'].find(function(v) { return files[0].mime_type.toLowerCase().indexOf(v) !== -1 });

        if (supported) {
          V2S.id = files[0].name;
          createVideo(files[0]);
        } else {
          console.dir(files[0]);
          alert("Not a supported video file, or was not available (check permissions?)");
        }

      })
    }

    // fetch needs to be async in order to use a reader, which we need in turn to provide download feedback
    // reference: https://javascript.info/fetch-progress
    async function download_file(file) {

      // step 1: start the fetch and obtain a reader
      let response = await fetch("https://api.kloudless.com/v1/accounts/" + file.account + "/storage/files/" + file.id + "/contents", {
        method: 'GET',
        headers: {
          "Authorization": atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg==")
        },
        cache: "force-cache"
      });

          // .then(function(response) {
          //   return response.blob()
          // })

      const reader = response.body.getReader();

      // Step 2: get total length
      const contentLength = +response.headers.get('Content-Length');

      const output = document.getElementById("cloud-LoadingIcon");

      const progress = document.createElement("progress");
      progress.setAttribute("value", 0);
      progress.setAttribute("max", contentLength);
      output.appendChild(progress);

      const feedback = document.createElement("p");
      output.appendChild(feedback);

      // Step 3: read the data
      let receivedLength = 0; // received that many bytes at the moment
      let text = '';
      let chunks = []; // array of received binary chunks (comprises the body)
      while(true) {
        const {done, value} = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;
        text = `Received ${receivedLength} of ${contentLength}`;

         // move execution of DOM updates to a different process outside async
         setTimeout(function () {
          feedback.textContent = text;
          progress.value = receivedLength;
        },0);
      }

      // step 4 - concatenate all the chunks into a blob, of type specified in the original file
      return new Blob(chunks, {type: file.mime_type});
    }

    // if the media is already loaded, return the existing media rather than downloading it again
    function _get_media(id, file) {
      return new Promise(function _cloud_upload_promise(resolve, reject) {
        if (file.raw) { // we already have a file and was passed in from localforage reloading it
          resolve({
            name: id,
            src: URL.createObjectURL(file.raw),
            sources: [''],
            original: file.raw,
            mime: file.raw.type,
            poster: '',
          });
        } else { // we didn't have an existing file; our routine will have been called from kloudless's plugin, so file is a different shape
          download_file(file)
          .then(function(blob) {
            resolve({
              name: file.name,
              src: URL.createObjectURL(blob),
              sources: [''],
              original: blob,
              mime: blob.type,
              poster: '',
            });
          });
        }
      });
    }

    function _handle_file_upload(file) {

    }

    function _re_upload(blob) {
      return new Promise(function _cloud_reupload_promise(resolve, reject) {
        var blobUrl = URL.createObjectURL(blob)
        V2S.source = {
          src: blobUrl,
          sources: [''],
          original: blob,
          mime: blob.type,
          poster: '',
        }
        // window.V2S.'player'].source = {
        //   type: window.V2S.source.mime.split('/')[0],
        //   sources: [{
        //     src: window.V2S.source.src
        //   }]
        // }
        window.initMediaElementPlayer(V2S.source)
        .then(function(){
          resolve()
        })
      })
    }

    return {
      name: 'cloud',
      type: 'cloud',
      playerType: 'mediaelement',
      init: _init,
      get_media: _get_media,
      reUpload: _re_upload,
    }

  })()

  PLUGINS.push(source)

})(V2S.plugins = V2S.plugins || [])