(function(PLUGINS, undefined) {
  var source = (function() {
    function _init() {
    }

    function _get_media() {
      return new Promise(function(resolve, reject) {
        var url = document.getElementById('soundcloudUrl').value
        url = unescape(url.replace("https://w.soundcloud.com/player/?url=", "").split("&")[0])
        var regExp = /https?:\/\/(?:w\.|api\.)?(soundcloud.com|snd.sc)\/(.*)/
        var parseUrl = regExp.exec(url)
        var oembed = "https://soundcloud.com/oembed?format=json&url=https://soundcloud.com/" + parseUrl[2]
        if (parseUrl[2].indexOf("tracks/")===0) oembed = oembed.replace("url=https://soundcloud", "url=https://api.soundcloud")
        
        fetch(oembed)
        .then(function(response) {
          return response.json()
        })
        .then(function(json) {
          var doc = document.implementation.createHTMLDocument('doc')
          doc.body.innerHTML = json.html
          url = doc.querySelector('iframe').src
          var scId = unescape(url).replace(/\u0026/,"&").split("/tracks/")[1].split("&")[0];
          resolve({
            src: 'https://api.soundcloud.com/tracks/'+scId+'/stream?client_id=95f22ed54a5c297b1c41f72d713623ef',//url,
            poster: json.thumbnail_url,
            sources: [],
          })
        })
      })
    }

    return {
      name: 'soundcloud',
      playerType: 'mediaelement',
      init: _init,
      get_media: _get_media,
    }
  })()

  PLUGINS.push(source)

})(window.v2s.plugins = window.v2s.plugins || [])