(function(PLUGINS, undefined) {

  var source = (function() {
    function _init() {

    }
    function _get_media(id) {
      return new Promise(function(resolve, reject) {
        resolve({
          src: id,
          poster: '',
          sources: [],
        })
      })
    }
    return {
      name: 'facebook',
      playerType: 'mediaelement',
      init: _init,
      get_media: _get_media,
    }
  })()

  PLUGINS.push(source)

})(window.v2s.plugins = window.v2s.plugins || [])