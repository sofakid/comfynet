(function () {

  const axios = require('axios')

  const { gigablast_api } = require('../settings')
  const search_type_normal = 0
  const search_type_news   = 1
  const search_type_images = 2

  const searchUrl = (text, s, suffix) => (
    `https://www.gigablast.com/search?q=${encodeURIComponent(text)}&s=${s}${suffix}`
  )

  const searchNewsUrl = (text, s, suffix) => (
    `https://www.gigablast.com/search?q=${encodeURIComponent(text)}&s=${s}&searchtype=news${suffix}`
  )

  const searchImagesUrl = (text, s, suffix) => (
    `https://www.gigablast.com/search?q=${encodeURIComponent(text)}&s=${s}&searchtype=images${suffix}`
  )
  
  // ----------------------------------------------------------------------------------------
  //    exports
  // ----------------------------------------------------------------------------------------
  exports.gigablastSearch = function(searchText, nextS, searchType, onResults, onError) {
    const onApiKeysFound = (o) => {
      const { userid, code } = o
      const suffix = `&userid=${userid}&code=${code}&format=json`

      let url = ''
      if (searchType === search_type_images) {
        url = searchImagesUrl(searchText, nextS, suffix)
      }
      else if (searchType === search_type_news) {
        url = searchNewsUrl(searchText, nextS, suffix)
      }
      else {
        url = searchUrl(searchText, nextS, suffix)
      }

      axios.get(url)
        .then((response) => {
          //console.log('response', response)
          onResults(response.data)
        })
        .catch((err) => {
          onError(err.message)
        }
      )

    }

    const onApiKeysNotFound = () => {
      console.log("Gigablast api keys not found, run settings.")
    }

    gigablast_api(onApiKeysFound, onApiKeysNotFound)
  }

  exports.search_type_normal = search_type_normal
  exports.search_type_news = search_type_news
  exports.search_type_images = search_type_images

  exports.searchUrl = searchUrl
  exports.searchNewsUrl = searchNewsUrl
  exports.searchImagesUrl = searchImagesUrl

}).call(this);