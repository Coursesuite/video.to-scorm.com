(function (PLUGINS, undefined) {
  
  var source = (function() {
    
    function _init() {
    }

    function _get_media(id) {
    }

    function _handle_upload(file) {
      return new Promise(function _local_upload_promise(resolve,reject){
        var sourceType = file.type
        var fileBlob = URL.createObjectURL(file)

        window.v2s.plugin = 'upload'
        window.v2s.id = undefined
        window.v2s.source = {
          src: fileBlob,
          mime: sourceType,
          sources: '',
          original: file, // actual file object
          poster: ''
        }
        window.initMediaElementPlayer(window.v2s.source)
        .then(function() {
          window.v2s['player'].setCurrentTime(0.1)
          resolve()
        })


        // window.v2s['player'].source = {
        //   type: window.v2s.source.mime.split('/')[0],
        //   sources: [{
        //     src: window.v2s.source.src
        //   }]
        // }
        // Get duration of uploaded file
        // var tempEl = (sourceType.split('/')[0] === 'video')?document.createElement('video'):document.createElement('audio')
        // tempEl.preload = 'metadata'
        // tempEl.onloadedmetadata = function() {
        //   window.v2s.duration = tempEl.duration
        //   tempEl = undefined
        //   resolve()
        // }
        // tempEl.src = fileBlob
      })
    }

    return {
      type: "local",
      name: "upload",
      playerType: 'mediaelement',
      init: _init,
      handleFileUpload: _handle_upload
    }
  })()

  PLUGINS.push(source)

}(window.v2s.plugins = window.v2s.plugins || []))