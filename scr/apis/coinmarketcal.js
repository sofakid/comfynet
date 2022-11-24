(function () {

  const axios = require('axios')
  const { caching_axios_expiring } = require('../cache')
  const { coinmarketcal_api } = require('../settings')

  const serverUrl = 'https://developers.coinmarketcal.com/v1'
  
  const gen_headers = (key) => ({
    headers: {
      'Accept': 'application/json', 
      //'Accept-Encoding': 'deflate, gzip',
      'x-api-key': key,
    } 
  })

  const onNoKeysFound = () => {
    console.log("No coinmarketcal api keys found, run settings.")
  }

  // --- events -----------------------------------
  const events = (symbol, onResults, onError) => {

    const onApiKeysFound = (keys) => {
      const headers = gen_headers(keys.key)
      const command = `${serverUrl}/events`
      const clean_symbol = encodeURIComponent(symbol)
      
      coin_by_symbol(clean_symbol, (o) => {
        console.log("coin_by_symbol()", o)
        const { id: coin_id } = o
        const url = `${command}?coins=${coin_id}`
    
        console.log("events search: ", url)
        axios.get(url, headers)
          .then((response) => {
            console.log("events response", response)
            onResults(response.data.body)
          })
          .catch((err) => {
            console.error("ERROR", err)
            onError(err.message)
          })
  
      }, onError)
    }

    coinmarketcal_api(onApiKeysFound, onNoKeysFound)
  }

  const coins = (onData, onError) => {
    const command = `${serverUrl}/coins`
    const cache_key = 'coinmarketcal/coins'
    const one_day_in_min = 24 * 60

    const onApiKeysFound = (keys) => {
      const headers = gen_headers(keys.key)
      caching_axios_expiring(cache_key, one_day_in_min, command, headers, onData, onError)
    }

    coinmarketcal_api(onApiKeysFound, onNoKeysFound)
  }

  coin_by_symbol = (symbol, onData, onError) => {
    coins((x) => {
      const o = x.body.filter((y) => y.symbol === symbol)[0]
      if (o) {
        onData(o)
      } else {
        onError("not found")
      }
    }, onError);    
  }

  // ----------------------------------------------------------------------------------------
  //    exports
  // ----------------------------------------------------------------------------------------
  
  exports.events = events
  exports.coins = coins

}).call(this);