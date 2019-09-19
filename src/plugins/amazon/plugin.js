(function(PLUGINS, undefined) {

  var source = (function() {

    function _init() {

    }

    function _get_media(url) {
      return new Promise(function(resolve, reject) {
        var split = url.split('/')
        var fileName = split[split.length-1]
        resolve({
          name: fileName,
          src: url,
          poster: '',
          mime: '',
          sources: ['']
        })
      })
    }

    return {
      name: 'amazon',
      init: _init,
      get_media: _get_media
    }

  })()

  PLUGINS.push(source)

})(window.v2s.plugins = window.v2s.plugins || [])