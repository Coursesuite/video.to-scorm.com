(function (PLUGINS, undefined) {

  var source = (function() {

    function _init(context) {
      document.getElementById('localUpload').addEventListener('change', function _file_upload(e) {
        V2S.plugin = 'upload';
        V2S.id = undefined;
        document.getElementById('upload-FileName').textContent = e.target.files[0].name;
        createVideo({
          raw: e.target.files[0],
          mime: e.target.files[0].type,
        });
      });
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

}(V2S.plugins = V2S.plugins || []))