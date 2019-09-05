(function(PLUGINS, undefined) {
  
  var source = (function() {
    function _init() {
      document.getElementById('dailymotionSearch').addEventListener('click', function(e) {
        if (document.getElementById('dailymotionQuery').value) {
          var query = new URLSearchParams();
          query.append('query',document.getElementById('dailymotionQuery').value);
          fetch('/plugins/dailymotion/search.php', {
            method: 'post',
            body: query,
            headers: { 'Content-type': 'application/x-www-form-urlencoded' }
          })
          .then(function(response) {
            console.warn(response)
            return response.json()
          })
          .then(function(content) {
            _render_thumbs(content.list)
          })
        } else {
          window.alert('Search cannot be empty')
        }
      })
    }

    function _render_thumbs(data) {
      var output = []
      if (data.length) {
        data.forEach(function(video) {
          output.push(`<figure class='search-result' data-plugin='dailymotion' data-id='${video.id}' data-duration='${video.duration}'>
                      <img src='${video.thumbnail_720_url}' alt='${video.created_time}'>
                      <figcaption>${video.title}</figcaption>
                      <small>${video['channel.name']}</small>
                      </figure>`)
        })
      } else {
        output.push(`
          <div class="uk-card uk-card-default uk-card-body">
              <h3 class="uk-card-title">No results</h3>
              <p>Try expanding your search terms, or check your spelling.</p>
          </div>
          `)
      }
      document.getElementById('dailymotionResults').innerHTML = output.join('')
    }

    function _get_media(id) {
      return new Promise(function(resolve, reject) {
        resolve({
          src: 'https://www.dailymotion.com/embed/video/'+id,
          poster: 'https://www.dailymotion.com/thumbnail/video/'+id,
          sources: ["https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.11/renderers/dailymotion.min.js"],
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