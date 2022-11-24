(function () {

  const axios = require('axios')
  const { caching_axios_expiring, retrieve_expiring, save } = require('../cache')
  const { binance_api } = require('../settings')
  const serverUrl = 'https://api.binance.com'

  const key_prefix = 'binance_api_'
  
  const gen_headers = (key) => ({
    headers: {
      'Accept': 'application/json', 
      //'Accept-Encoding': 'deflate, gzip',
      'X-MBX-APIKEY': key,
    } 
  })

  
  const onNoKeysFound = () => {
    console.log("No coinmarketcap api keys found, run settings.")
  }

  class BinanceExchangeInfo {
    constructor(results) {
      this.symbols = []
      this.tradingPairs = {}

      const { symbols, tradingPairs } = this
      results.symbols.forEach((x) => {
        const { symbol, baseAsset, quoteAsset } = x
        symbols.push(symbol)

        if (tradingPairs[baseAsset] === undefined) {
          tradingPairs[baseAsset] = [quoteAsset]
        }
        else {
          tradingPairs[baseAsset].push(quoteAsset)
        }

      })

    }
  }

  // --- exchangeInfo ---------------------------------
  const exchangeInfo = (onResults, onNotFound) => {
    const command = `${serverUrl}/api/v3/exchangeInfo`
    
    const api_cache_key = `${key_prefix}exchangeInfo`
    const cache_key = `${key_prefix}BinanceExchangeInfo`

    const a_week = 60 * 24 * 7

    retrieve_expiring(cache_key, a_week, (found) => {
      onResults(found)
    }, () => {

      const onData = (data) => {
        const o = new BinanceExchangeInfo(data)
        save(cache_key, o, () => {
          console.log("exchangeInfo, saving new results", o)
          onResults(o)
        })
      }

      const onError = (err) => {
        console.error(err)
        onNotFound()
      }
  
      const onApiKeysFound = (keys) => {
        const headers = gen_headers(keys.key)
        console.log("exchangeInfo - caching_axios_expiring")
        caching_axios_expiring(api_cache_key, a_week, command, headers, onData, onError)
      }
  
      binance_api(onApiKeysFound, onNoKeysFound)
    })
  }

  // --- getTradingPairs --------------------------------------

  const getTradingPairs = (symbol, onResults, onNoResults) => {
    exchangeInfo((found) => {
      const { symbols, tradingPairs } = found
      const tp = tradingPairs[symbol]
      if (tp !== undefined) {
        onResults(tp)
      }
      else {
        console.error('not sure if no trading pairs, or error')
        onNoResults()
      }
    }, onNoResults)
  }

  // --- klines/candlesticks -----------------------------------
  /*
  GET /api/v3/klines

  Kline/candlestick bars for a symbol.
  Klines are uniquely identified by their open time.

  Weight: 1

  Parameters:
    Name	Type	Mandatory	Description
    symbol	STRING	YES	
    interval	ENUM	YES	
    startTime	LONG	NO	
    endTime	LONG	NO	
    limit	INT	NO	Default 500; max 1000.
  If startTime and endTime are not sent, the most recent klines are returned.

  Example Response:
  [
    [
      1499040000000,      // Open time
      "0.01634790",       // Open
      "0.80000000",       // High
      "0.01575800",       // Low
      "0.01577100",       // Close
      "148976.11427815",  // Volume
      1499644799999,      // Close time
      "2434.19055334",    // Quote asset volume
      308,                // Number of trades
      "1756.87402397",    // Taker buy base asset volume
      "28.46694368",      // Taker buy quote asset volume
      "17928899.62484339" // Ignore.
    ]
  ]
*/

  const kline_intervals = {
    one_m: '1m',
    three_m: '3m',
    five_m: '5m',
    fifteen_m: '15m',
    thirty_m: '30m',
    one_h: '1h',
    two_h: '2h',
    four_h: '4h',
    six_h: '6h',
    eight_h: '8h',
    twelve_h: '12h',
    one_d: '1d',
    three_d: '3d',
    one_w: '1w',
    one_M: '1M',
  }
  
  const klines = (tp_symbol, interval, onResults, onError) => {

    const onApiKeysFound = (o) => {
      const headers = gen_headers(o.key)
      const command = `${serverUrl}/api/v3/klines`
      
      const qs = `${command}?symbol=${tp_symbol}&interval=${interval}`
    
      const cache_key = qs
      const a_few_mins = 5
      const dataGetter = (x) => x
      caching_axios_expiring (cache_key, a_few_mins, qs, headers, onResults, onError, dataGetter)
    }

    const onNoKeysFound = () => {
      console.log("Binance API keys not found, run settings.")
    }

    binance_api(onApiKeysFound, onNoKeysFound)
  }

  
  // ----------------------------------------------------------------------------------------
  //    exports
  // ----------------------------------------------------------------------------------------
  
  exports.klines = klines
  exports.kline_intervals = kline_intervals
  exports.getTradingPairs = getTradingPairs

}).call(this)