(function(PLUGINS,undefined) {
  var source = (function() {

    var CLIENT_ID = 'e754600a-667f-4a89-8c08-afd9364f9bb7';
    var CLIENT_SECRET = 'SEcSAp6McVPL4Y2zOo0q1AquFGIOdrmcbuu6P_FkR0TQ0ANYp4GgtmgFH-_1odSRkFgdpuUAiABaf2J0o_6pQQ';

    function _init() {

    }

    function _get_media(url) {
      return new Promise(function(resolve, reject) {
        // CORS proxy script
        fetch('plugins/brightcove/tokenProxy.php', {
          method: 'POST',
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(json) {
          var details = new FormData()
          var accountId = url.split('.net/')[1].split('/')[0]
          details.append('accountId',accountId)
          var videoId = url.split('videoId=')[1]
          details.append('videoId',videoId)
          details.append('token',json.access_token)
          fetch('plugins/brightcove/contentProxy.php', {
            method: 'POST',
            body: details
          })
          .then(function(response) {
            return response.json()
          })
          .then(function(json) {
            resolve({
              name: 'Brightcove Media',
              src: json[0].src.replace('http','https'),
              poster: '',
              mime: json[0].type,
              sources: ['']
            })
          })
        })
      })
    }

    return {
      name: 'brightcove',
      init: _init,
      get_media: _get_media
    }

  })()

  PLUGINS.push(source)
})(window.V2S.plugins = window.V2S.plugins || [])