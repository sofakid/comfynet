(function () {

  const axios = require('axios')
  const { save, retrieve, retrieve_expiring, caching_axios, caching_axios_expiring, cacheKeys } = require('../cache')
  const { coinmarketcap_api } = require('../settings')
  
  const serverUrl = 'https://pro-api.coinmarketcap.com'
  
  const key_prefix = 'coinmarketcap_api_'

  const gen_headers = (key) => ({
    headers: {
      'Accept': 'application/json', 
      //'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': key,
    } 
  })

  const onNoKeysFound = () => {
    console.log("No coinmarketcap api keys found, run settings.")
  }

  class CoinMarketCapIdMaps {
    constructor(data) {
      this.id = {}
      this.name = {}
      this.symbol = {}
      this.slug = {}

      this.names = []
      this.symbols = []
      this.slugs = []

      // todo, duplicates
      data.forEach((x, i) => {
        this.id[x.id] = x
        this.name[x.name] = x
        console.log("adding x.symbol", x.symbol)
        this.symbol[x.symbol] = x
        this.slug[x.slug] = x

        this.names.push(x.name)
        this.symbols.push(x.symbol)
        this.slugs.push(x.slug)
      })

      const { cache_date_key } = cacheKeys
      const now = new Date().getTime()
      this[cache_date_key] = now
    }
  }

  const id_map = (onResults, onNotFound) => {
    const command = `${serverUrl}/v1/cryptocurrency/map`
    
    const api_cache_key = `${key_prefix}id_map_api`
    const cache_key = `${key_prefix}CoinMarketCapIdMaps`

    const a_week = 60 * 24 * 7

    retrieve_expiring(cache_key, a_week, (found) => {
      onResults(found)
    }, () => {

      const onData = (data) => {
        const o = new CoinMarketCapIdMaps(data.data)
        save(cache_key, o, () => {
          onResults(o)
        })
      }

      const onError = (err) => {
        console.error(err)
        onNotFound()
      }
  
      const onApiKeysFound = (keys) => {
        const headers = gen_headers(keys.key)
        console.log("ID_MAP")
        caching_axios_expiring(api_cache_key, a_week, command, headers, onData, onError)
      }
  
      coinmarketcap_api(onApiKeysFound, onNoKeysFound)
    })
  }

  const getAllNames = (onFound, onNotFound) => {
    id_map((m) => {
      console.log("getAllNames", m)
      onFound(m.names)
    }, onNotFound)
  }

  const getAllSymbols = (onFound, onNotFound) => {
    id_map((m) => {
      console.log("getAllSymbols", m)
      onFound(m.symbols)
    }, onNotFound);    
  }

  const getAllSlugs = (onFound, onNotFound) => {
    id_map((m) => {
      console.log("getAllSlugs", m)
      onFound(m.slugs)
    }, onNotFound);    
  }

  const getAssetById = (id, onFound, onNotFound) => {
    id_map((m) => {
      console.log("getAssetById", id, m)
      const o = m.id[id]
      if (o !== undefined) {
        onFound(o)
      }
      else {
        onNotFound()
      }
    }, onNotFound)
  }

  const getAssetByName = (name, onFound, onNotFound) => {
    id_map((m) => {
      console.log("getAssetByName", name, m)
      const o = m.name[name]
      if (o !== undefined) {
        onFound(o)
      }
      else {
        onNotFound()
      }
      
    }, onNotFound)
  }

  const getAssetBySymbol = (symbol, onFound, onNotFound) => {
    id_map((m) => {
      console.log("getAssetBySymbol", symbol, m)
      const o = m.symbol[symbol]
      if (o !== undefined) {
        onFound(o)
      }
      else {
        onNotFound()
      }
      
    }, onNotFound)
  }

  const getAssetBySlug = (slug, onFound, onNotFound) => {
    id_map((m) => {
      console.log("getAssetBySlug", slug, m)
      const o = m.slug[slug]
      if (o !== undefined) {
        onFound(o)
      }
      else {
        onNotFound()
      }
      
    }, onNotFound)
  }

  // --- metadata -----------------------------------
  /*
  Query Parameters ?
    id string
      One or more comma-separated CoinMarketCap cryptocurrency IDs. Example: "1,2"

    slug string
      Alternatively pass a comma-separated list of cryptocurrency slugs. Example: "bitcoin,ethereum"

    symbol string
      Alternatively pass one or more comma-separated cryptocurrency symbols. Example: "BTC,ETH". At least one "id" or "slug" or "symbol" is required for this request.

    aux string
      "urls,logo,description,tags,platform,date_added,notice"
      Optionally specify a comma-separated list of supplemental data fields to return. Pass urls,logo,description,tags,platform,date_added,notice,status to include all auxiliary fields.
  */
  const metadata = (symbol, onResults, onError) => {
    const command = `${serverUrl}/v2/cryptocurrency/info`

    getAssetBySymbol(symbol, (found) => {
      const { id } = found
      const url = `${command}?id=${id}`
      
      const cache_key = `${key_prefix}metadata_${id}`
  
      const onData = (data) => {
        onResults(data.data)
      }
  
      const a_year_in_min = 60 * 24 * 365
  
      const onApiKeysFound = (keys) => {
        const headers = gen_headers(keys.key)
        console.log("METADATA")
        caching_axios_expiring(cache_key, a_year_in_min, url, headers, onData, onError)
      }
  
      coinmarketcap_api(onApiKeysFound, onNoKeysFound)
    }, 
    
    // onNotFound
    () => {})

  }

  const quoteBySymbol = (symbol, onResults, onError) => {
    const command = `${serverUrl}/v1/cryptocurrency/quotes/latest`

    getAssetBySymbol(symbol, (found) => {
      const url = `${command}?id=${id}`

      const onApiKeysFound = (keys) => {
        const headers = gen_headers(keys.key)
        console.log("quoteBySymbol search: ", url)
        axios.get(url, headers)
          .then((response) => {
            console.log("quoteBySymbol response", response)
            onResults(response.data.data)
          })
          .catch((err) => {
            onError(err.message)
          })
      }

      coinmarketcap_api(onApiKeysFound, onNoKeysFound)
    }, 
    
    // onNotFound
    () => {})
  }

  const quoteById = (id, onResults, onError) => {
    const command = `${serverUrl}/v1/cryptocurrency/quotes/latest`
    const url = `${command}?id=${id}`

    const onApiKeysFound = (keys) => {
      const headers = gen_headers(keys.key)
      console.log("quoteById search: ", url)
      axios.get(url, headers)
        .then((response) => {
          console.log("quoteById response", response)
          onResults(response.data.data)
        })
        .catch((err) => {
          onError(err.message)
        })
    }
    
    coinmarketcap_api(onApiKeysFound, onNoKeysFound)
  }

  // ----------------------------------------------------------------------------------------
  //    exports
  // ----------------------------------------------------------------------------------------
  
  exports.id_map = id_map
  exports.metadata = metadata
  exports.quoteById = quoteById
  exports.quoteBySymbol = quoteBySymbol

  exports.getAllNames = getAllNames
  exports.getAllSymbols = getAllSymbols
  exports.getAllSlugs = getAllSlugs
  exports.getAssetById = getAssetById
  exports.getAssetByName = getAssetByName
  exports.getAssetBySymbol = getAssetBySymbol
  exports.getAssetBySlug = getAssetBySlug

}).call(this);