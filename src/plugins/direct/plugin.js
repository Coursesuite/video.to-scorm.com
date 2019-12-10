(function(PLUGINS, undefined) {

  var source = (function() {

    // Any direct link to an mp4 stream
    // e.g https://fabs-test.s3-ap-southeast-2.amazonaws.com/sample.mp4

    function _init() {
      document.getElementById('directLoad').addEventListener('click', function(e) {
        V2S.plugin = 'direct';
        var url = document.getElementById('directUrl').value;
        var urlAr = url.split('.');
        if (urlAr[urlAr.length-1] === 'mp4') {
          V2S.id = url;
          createVideo();
        } else {
          alert("Invalid url");
        }
      });
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
      name: 'direct',
      init: _init,
      get_media: _get_media
    }

  })()

  PLUGINS.push(source)

})(V2S.plugins = V2S.plugins || [])