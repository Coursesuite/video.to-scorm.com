(function(PLUGINS, undefined) {

  var source = (function() {
    var APP_ID = '3026766627365734'
    var APP_SECRET = 'd67dbbcbe84c200be4f5ae4476804d79'
    function _init() {

    }

    function _get_info(id) {
      // fetch(`https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`, {
      //   method: 'GET'
      // })
      // .then(function(response) {
      //   return response.json()
      // })
      // .then(function(jsonObj) {
      //   console.log(jsonObj)
      //   // https://www.facebook.com/elderscrollsonline.anz/videos/406758736646805/
      //   id = id.split('videos/')[1].replace('/','')
      //   console.log(id)
      //   return fetch(`https://graph.facebook.com/v4.0/${id}?access_token=${jsonObj.access_token}`)
      // })
      // .then(function(response) {
      //   return response.json()
      // })
      // .then(function(jsonObj) {
      //   console.log(jsonObj)
      // })
    }

    function _get_media(id) {
      return new Promise(function(resolve, reject) {
        resolve({
          name: 'Facebook Video',
          src: id,
          poster: '',
          sources: ["https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.12/renderers/facebook.min.js"],
          mime: 'video/facebook'
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