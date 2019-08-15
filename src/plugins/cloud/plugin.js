(function(PLUGIN, undefined) {

  var source = (function() {
    
    function _init() {
      document.getElementById('kloudlessUpload').addEventListener('click', function(e) {
        window.KLOUDLESS_INPUT.choose()
      }) 
    }

    function _handle_file_upload(file) {
      return new Promise(function(resolve, reject) {
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
          window.v2s.plugin = 'cloud'
          window.v2s.id = undefined
          window.v2s.source = {
            src: blobUrl,
            sources: '',
            original: blob,
            mime: blob.type
          }
          window.v2s['player'].source = {
            type: window.v2s.source.mime.split('/')[0],
            sources: [{
              src: window.v2s.source.src
            }]
          }
          var tempEl = (window.v2s.source.mime.split('/')[0] === 'video')?document.createElement('video'):document.createElement('audio')
          tempEl.preload = 'metadata'
          tempEl.onloadedmetadata = function() {
            window.v2s.duration = tempEl.duration
            tempEl = undefined
            resolve()
          }
          tempEl.src = blobUrl
        })
      })
    }

    function _re_upload(blob) {
      var blobUrl = URL.createObjectURL(blob)
      window.v2s.source = {
        src: blobUrl,
        sources: '',
        original: blob,
        mime: blob.type
      }
      window.v2s['player'].source = {
        type: window.v2s.source.mime.split('/')[0],
        sources: [{
          src: window.v2s.source.src
        }]
      }
    }

    return {
      name: 'cloud',
      type: 'cloud', 
      init: _init,
      handleFileUpload: _handle_file_upload,
      reUpload: _re_upload,
    }

  })()

  PLUGIN.push(source)

})(window.v2s.plugins = window.v2s.plugins || [])