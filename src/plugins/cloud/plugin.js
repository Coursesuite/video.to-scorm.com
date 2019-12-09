(function(PLUGINS, undefined) {

  // Currently no feedback when loading selected video

  var source = (function() {

    function _init() {
      document.getElementById('kloudlessUpload').addEventListener('click', function(e) {
        KLOUDLESS_INPUT.choose()
      })
      KLOUDLESS_INPUT.on('success', function(files) {
        V2S.plugin = 'cloud';
        V2S.id = undefined;
        createVideo(files[0]);
      })
    }

    function _get_media(id, file) {
      return new Promise(function _cloud_upload_promise(resolve, reject) {
        fetch("https://api.kloudless.com/v1/accounts/" + file.account + "/storage/files/" + file.id + "/contents", {
          method: 'GET',
          headers: {
            "Authorization": atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg==")
          }
        })
        .then(function(response) {
          return response.blob()
        })
        .then(function(blob) {
          resolve({
            name: file.name,
            src: URL.createObjectURL(blob),
            sources: [''],
            original: blob,
            mime: blob.type,
            poster: '',
          })
        })
      })
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