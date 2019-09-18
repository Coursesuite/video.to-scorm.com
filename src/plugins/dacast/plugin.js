(function(PLUGINS, undefined) {
  var APIKEY = '137022_e1d4e0f2b35db30808c0'
  var source = (function() {
    function _init() {
    }

    function _get_media(url) {
      return new Promise(function(resolve,reject) {
        var id
        if (url.indexOf('iframe') !== -1) {
          url = url.split('/')
          id = url[url.length - 1]
        }
        //http://dacasts3-vh.akamaihd.net/i/secure/137022/137022_,732677.mp4,.csmil/master.m3u8
        if (id) {
          fetch('http://api.dacast.com/v2/vod/'+id+'?apikey='+APIKEY+'&_format=JSON')
          .then(function(response) {
            return response.json()
          })
          .then(function(json){
            resolve({
              name: 'Dacast Stream',
              src: 'https://dacasts3-vh.akamaihd.net'+json.hls.replace('raw','mp4'),
              poster: json.pictures.splashscreen[0],
              mime: 'video/dacast',
              sources: ['']
            })
          })
        } else {
          window.alert('Invalid url')
          reject()
        }
        
      })
    }

    return {
      name: 'dacast',
      init: _init,
      get_media: _get_media
    }

  })()

  PLUGINS.push(source)

})(window.v2s.plugins = window.v2s.plugins || [])