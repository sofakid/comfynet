(function (){

  const { cacheKeys, save, retrieve } = require('./cache')

  const justgo = (onFound, onNotFound = () => {}) => {
    const key = cacheKeys.justgo_aliases
    const mail = `${key}.mail`
    const amazon = `${key}.amazon`
    const ebay = `${key}.ebay`
      
    const o = {}

    retrieve(mail, (x) => {
      o.mail = x
      retrieve(amazon, (y) => {
        o.amazon = y
        retrieve(ebay, (z) => {
          o.ebay = z
          onFound(o)
        }, onNotFound)  
      }, onNotFound)
    }, onNotFound)

  }

  const gigablast = (onFound, onNotFound = () => {}) => {
    const key = cacheKeys.gigablast_api_key
    const userid_key = `${key}.userid`  
    const code_key = `${key}.code`

    const o = {}
    retrieve(userid_key, (x) => {
      o.userid = x

      retrieve(code_key, (y) => {
        o.code = y
        onFound(o)
      }, onNotFound)

    }, onNotFound)
  }

  const binance = (onFound, onNotFound = () => {}) => {
    const key = cacheKeys.binance_api_key
    const api_key = `${key}.api_key`

    const o = {}

    retrieve(api_key, (y) => {
      o.api_key = y
      onFound(o)
    }, onNotFound)

  }

  const coinmarketcap = (onFound, onNotFound = () => {}) => {
    const key = cacheKeys.coinmarketcap_api_key
    const key_key = `${key}.key`

    const o = {}

    retrieve(key_key, (y) => {
      o.key = y
      onFound(o)
    }, onNotFound)

  }

  const coinmarketcal = (onFound, onNotFound = () => {}) => {
    const key = cacheKeys.coinmarketcal_api_key
    const key_key = `${key}.key` 

    const o = {}

    retrieve(key_key, (y) => {
      o.key = y
      onFound(o)
    }, onNotFound)

  }

  const coinapi_io = (onFound, onNotFound = () => {}) => {
    const key = cacheKeys.coinapi_io_api_key
    const key_key = `${key}.key`

    const o = {}

    retrieve(key_key, (y) => {
      o.key = y
      onFound(o)
    }, onNotFound)

  }

  const openai = (onFound, onNotFound = () => {}) => {
    const key = cacheKeys.openai_api_key
    const key_key = `${key}.key`

    const o = {}

    retrieve(key_key, (y) => {
      o.key = y
      onFound(o)
    }, onNotFound)

  }


  // --- exports ---------------------------------------
  exports.gigablast_api = gigablast
  exports.binance_api = binance
  exports.coinapi_io_api = coinapi_io
  exports.coinmarketcap_api = coinmarketcap
  exports.coinmarketcal_api = coinmarketcal
  exports.openai_api = openai
  exports.justgo_aliases = justgo

}).call(this)