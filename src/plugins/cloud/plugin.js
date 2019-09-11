(function(PLUGINS, undefined) {

  var source = (function() {
    
    function _init() {
      document.getElementById('kloudlessUpload').addEventListener('click', function(e) {
        window.KLOUDLESS_INPUT.choose()
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
          var blobUrl = URL.createObjectURL(blob)
          resolve({
            src: blobUrl,
            sources: '',
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
        window.v2s.source = {
          src: blobUrl,
          sources: '',
          original: blob,
          mime: blob.type,
          poster: '',
        }
        // window.v2s['player'].source = {
        //   type: window.v2s.source.mime.split('/')[0],
        //   sources: [{
        //     src: window.v2s.source.src
        //   }]
        // }
        window.initMediaElementPlayer(window.v2s.source)
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

})(window.v2s.plugins = window.v2s.plugins || [])