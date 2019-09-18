(function(PLUGINS, undefined) {
  
  var source = (function() {
    function _init() {
      document.getElementById('dailymotionSearch').addEventListener('click', function(e) {
        if (document.getElementById('dailymotionQuery').value) {
          document.getElementById('dailymotion-LoadingIcon').innerHTML = "<img src='css/Infinity-1.5s-50px.svg'>"
          var query = new URLSearchParams();
          query.append('query',document.getElementById('dailymotionQuery').value);
          fetch('/plugins/dailymotion/search.php', {
            method: 'post',
            body: query,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
          })
          .then(function(response) {
          // response.text().then(function(t){console.warn(t)})
            return response.json()
          })
          .then(function(content) {
            console.log(content)
            // Search results
            if (content.list) {_render_thumbs(content.list)}
            // Direct video link
            else {_render_thumbs(content)}
          })
          .catch(function(e) {
            console.error(e)
            window.alert('Dailymotion servers overloaded, try again later')
          })
        } else {
          window.alert('Search cannot be empty')
        }
      })
    }

    function _render_thumbs(data) {
      var output = []
      console.log(data)
      if (data.length) {
        // Search results
        data.forEach(function(video) {
          output.push(`<figure class='search-result' data-plugin='dailymotion' data-id='${video.id}' data-duration='${video.duration}'>
                      <img src='${video.thumbnail_720_url}' alt='${video.created_time}'>
                      <figcaption>${video.title}</figcaption>
                      <small>${video['channel.name']}</small>
                      </figure>`)
        })
      } else if (Object.keys(data).length) {
        // Direct video link
        output.push(`<figure class='search-result' data-plugin='dailymotion' data-id='${data.id}' data-duration='${data.duration}'>
                      <img src='${data.thumbnail_720_url}' alt='${data.created_time}'>
                      <figcaption>${data.title}</figcaption>
                      <small>${data['channel.name']}</small>
                      </figure>`)
      } else {
        // No search results
        output.push(`
          <div class="uk-card uk-card-default uk-card-body">
              <h3 class="uk-card-title">No results</h3>
              <p>Try expanding your search terms, or check your spelling.</p>
          </div>
          `)
      }
      document.getElementById('dailymotionResults').innerHTML = output.join('')
      document.getElementById('dailymotion-LoadingIcon').innerHTML = ""
    }

    function _get_media(id) {
      return new Promise(function(resolve, reject) {
        resolve({
          name: 'Dailymotion Video',
          src: 'https://www.dailymotion.com/embed/video/'+id,
          poster: 'https://www.dailymotion.com/thumbnail/video/'+id,
          sources: ["https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/renderers/dailymotion.min.js"],
          mime: 'video/dailymotion'
        })
      })
    }

    return {
      type: 'video',
      name: 'dailymotion',
      playerType: 'mediaelement',
      init: _init,
      get_media: _get_media
    }
  })()

  PLUGINS.push(source)

})(window.v2s.plugins = window.v2s.plugins || [])