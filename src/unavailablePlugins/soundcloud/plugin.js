(function(PLUGINS, undefined) {
  var source = (function() {
    function _init() {
    }

    function _get_media() {
      return new Promise(function(resolve, reject) {
        var url = document.getElementById('soundcloudUrl').value
        // url = unescape(url.replace("https://w.soundcloud.com/player/?url=", "").split("&")[0])
        // var regExp = /https?:\/\/(?:w\.|api\.)?(soundcloud.com|snd.sc)\/(.*)/
        // var parseUrl = regExp.exec(url)
        // var oembed = "https://soundcloud.com/oembed?format=json&url=https://soundcloud.com/" + parseUrl[2]
        // if (parseUrl[2].indexOf("tracks/")===0) oembed = oembed.replace("url=https://soundcloud", "url=https://api.soundcloud")
        
        // fetch(oembed)


        var fd = new FormData()
        fd.append("format", "json")
        fd.append("url", url)

        fetch('http://soundcloud.com/oembed', {
          method: 'POST',
          body: fd,
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(json) {
          resolve(json.html)
        })


        // CURRENT
        // var formdata = new FormData()
        // formdata.append('url',url)
        // fetch('plugins/soundcloud/oembed.php', {
        //   method: 'post',
        //   body: formdata,
        // })
        // .then(function(response) {
        //   return response.json()
        // })
        // .then(function(json) {
        //   console.log(json)
        //   console.log(json.html.split('src="')[1].split('">')[0])
        //   resolve({
        //     name: 'Soundcloud track',
        //     src: json.html.split('src="')[1].split('">')[0],
        //     poster: json.thumbnail_url,
        //     sources: ["https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.12/renderers/soundcloud.min.js"],
        //     mime: 'audio/soundcloud',
        //   })
        // })


          // var doc = document.implementation.createHTMLDocument('doc')
          // doc.body.innerHTML = json.html
          // url = doc.querySelector('iframe').src
          // var scId = unescape(url).replace(/\u0026/,"&").split("/tracks/")[1].split("&")[0];
          // resolve({
          //   // Probably need to do this without a client id (they seem to only work sometimes)
          //   // Getting a client id: https://stackoverflow.com/questions/40992480/getting-a-soundcloud-api-client-id
          //   // If that doesnt work: https://stackoverflow.com/questions/20870270/how-to-get-soundcloud-embed-code-by-soundcloud-com-url/27461646#27461646
          //   src: 'https://api.soundcloud.com/tracks/'+scId+'/stream?client_id=PMqlDw8l2wqV6Z8zMwqR2qequJUK5lpo',//95f22ed54a5c297b1c41f72d713623ef',//url, //2t9loNQH90kzJcsFCODdigxfp325aq4z
          //   poster: json.thumbnail_url,
          //   sources: ["https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.12/renderers/soundcloud.min.js"],
          // })
        // })
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