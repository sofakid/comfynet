(function () {

  const axios = require('axios')
  //const { key } = require('../../keys/lunarcrush')
  const { caching_axios_expiring } = require('../cache')
  const { lunarcrush_api } = require('../settings')
  const serverUrl = 'https://api.lunarcrush.com/v2'
  
  const headers = {
    headers: {
      'Accept': 'application/json', 
      //'Accept-Encoding': 'deflate, gzip',
      //'x-api-key': key,
    } 
  }

  const assets = (symbol, onResults, onError) => {
    const onApiKeysFound = (o) => {
      const { key } = o
      const baseUrl = `${serverUrl}?key=${key}&`
      const clean_symbol = encodeURIComponent(symbol)
      const command = `${baseUrl}data=assets&data_points=0&symbol=${clean_symbol}`

      const cache_key = `lunarcrush_assets_${clean_symbol}`
      const dataGetter = (x) => x.data.data[0]
      const a_few_mins = 5

      caching_axios_expiring(cache_key, a_few_mins, command, headers, onResults, onError, dataGetter)
    }

    const onNoKeysFound = () => {
      console.log("No lunarcrush api key set, run settings.")
    }

    lunarcrush_api(onApiKeysFound, onNoKeysFound)
    // axios.get(command, headers)
    //   .then((response) => {
    //     console.log("assets response", response, response.data.data)
    //     onResults(response)
    //   })
    //   .catch((err) => {
    //     console.error("ERROR", err)
    //     onError(err.msg)
    //   })
  }


  // ----------------------------------------------------------------------------------------
  //    exports
  // ----------------------------------------------------------------------------------------
  
  exports.assets = assets

}).call(this);