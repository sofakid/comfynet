(function() {

  const comfyCache = 'comfyCache'
  const axios = require('axios')

  const cacheKeys = {
    gigablast_api_key: 'gigablast_api_key',
    binance_api_key: 'binance_api_key',
    coinmarketcap_api_key: 'coinmarketcap_api_key',
    coinmarketcal_api_key: 'coinmarketcal_api_key',
    coinapi_io_api_key: 'coinapi_io_api_key',
    cache_date_key: 'cache_date',
    openai_api_key: 'openai_api_key',
    justgo_alises: 'justgo',
  }



  const save = (key, value, onFinished) => {
    const now = new Date().getTime()
    const o = {}
    o[key] = value
    console.log("Saving to local storage.")
    chrome.storage.local.set(o, onFinished)
  }

  const retrieve = (key, onFound, onNotFound) => {
    console.log("Retrieving from local storage.")
    chrome.storage.local.get([key], (x) => {
      const o = x[key]
      if (o !== undefined) {
        onFound(o)
      }
      else {
        onNotFound()
      }
    })
  }

  const retrieve_expiring = (cache_key, mins, onFound, onNotFound, dataGetter = ((x) => x.data)) => {
    const now = new Date().getTime()
    const { cache_date_key } = cacheKeys
    
    retrieve(cache_key, (found) => 
      {
        const d = found[cache_date_key]
        let expired = (d === undefined)
        if (d !== undefined) {
          const mins_ms = mins * 60 * 1000
          
          const delta = now - d
          if (delta > mins_ms) {
            console.log(`${cache_key} - EXPIRED - ${delta} > ${mins_ms}`)
            expired = true
          }
        }

        if (expired) {
          onNotFound()
        }
        else {
          onFound(found)
        }
      }, 
      onNotFound
    )
  }
  
  const caching_axios = (cache_key, url, headers, onData, onError) => {
    retrieve(cache_key, (found) => 
      {
        onData(found)
      }, 
      () => {
        console.log("Cache not found, HITTING API", cache_key)
        axios.get(url, headers)
          .then((response) => {
            const y = response.data
            save(cache_key, y)
            onData(y)
          })
          .catch((err) => {
            onError(err.message)
          })
    })
  }

  

  const caching_axios_expiring = (cache_key, mins, url, headers, onData, onError, dataGetter = ((x) => x.data)) => {
    const { cache_date_key } = cacheKeys
    const now = new Date().getTime()

    const cae_prime = () => {
      console.log("CACHE EXPIRED, HITTING API", cache_key)
      axios.get(url, headers)
      .then((response) => {
        const y = dataGetter(response)
        y[cache_date_key] = now
        save(cache_key, y)
        onData(y)
      })
      .catch((err) => {
        onError(err.message)
      })
    }
    
    retrieve(cache_key, (found) => 
      {
        const d = found[cache_date_key]
        let expired = (d === undefined)
        if (d !== undefined) {
          const mins_ms = mins * 60 * 1000
          
          const delta = now - d
          if (delta > mins_ms) {
            console.log(`${cache_key} - EXPIRED - ${delta} > ${mins_ms}`)
            expired = true
          }
        }

        if (expired) {
          cae_prime()
        }
        else {
          onData(found)
        }
      }, 
    
      () => {
        cae_prime()
      })
  }
  
  const clear_cache = () => {
    chrome.storage.local.clear()
  }

  // --- exports ----------------------------------------------
  exports.save = save
  exports.retrieve = retrieve
  exports.retrieve_expiring = retrieve_expiring
  exports.caching_axios = caching_axios
  exports.caching_axios_expiring = caching_axios_expiring
  exports.clear_cache = clear_cache

  exports.cacheKeys = cacheKeys

}).call(this);