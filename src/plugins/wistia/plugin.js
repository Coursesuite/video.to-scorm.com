(function(PLUGINS, undefined) {
  var APIKEY = 'f9376abd56b76f1bea7c5a4ef74cd388690b868b3d79aa282881ae64ea71272d'
  var source = (function(){
    function _init() {
    }

    function _get_media(url) {
      return new Promise(function(resolve, reject) {
        if (url.indexOf('/medias/') === -1) {
          window.alert('invalid url')
          reject()
        }
        var id = url.split('/medias/')[1]
        fetch('https://api.wistia.com/v1/medias/'+id+'.json?api_password='+APIKEY)
        .then(function(response) {
          return response.json()
        })
        .then(function(json) {
          return fetch(json.assets[0].url)
        })
        .then(function(response) {
          return response.blob()
        })
        .then(function(blob) {
          console.log(blob)
          resolve({
            name: 'WistiaMedia',
            src: URL.createObjectURL(blob),
            poster: '',
            original: blob,
            mime: 'video/wistia',
            sources: ['']
          })
        })
      })
    }

    return {
      name: 'wistia',
      init: _init,
      get_media: _get_media,
    }
  })()

  PLUGINS.push(source)

})(window.v2s.plugins = window.v2s.plugins || [])