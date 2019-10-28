(function (PLUGINS, undefined) {

  var source = (function() {

    function _init() {
    }

    function _get_media(id, media) {
      return new Promise(function(resolve, reject) {
        resolve({
          name: media.raw.name,
          src: URL.createObjectURL(media.raw),
          sources: [''],
          mime: media.mime,
          original: media.raw, // actual file object
          poster: ''
        })
      })
    }

    return {
      type: "local",
      name: "upload",
      playerType: 'mediaelement',
      init: _init,
      get_media: _get_media,
    }
  })()

  PLUGINS.push(source)

}(window.V2S.plugins = window.V2S.plugins || []))