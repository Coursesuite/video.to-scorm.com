(function(PLUGINS, undefined) {

  var source = (function() {

    // Url can be found by viewing an S3 bucket and getting the Object url of the appropriate file
    // e.g https://fabs-test.s3-ap-southeast-2.amazonaws.com/sample.mp4

    function _init() {
      document.getElementById('amazonLoad').addEventListener('click', function(e) {
        V2S.plugin = 'amazon';
        V2S.id = document.getElementById('amazonUrl').value;
        createVideo();
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
      name: 'amazon',
      init: _init,
      get_media: _get_media
    }

  })()

  PLUGINS.push(source)

})(V2S.plugins = V2S.plugins || [])