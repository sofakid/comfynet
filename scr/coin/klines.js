(function() {
  const { klines, kline_intervals, getTradingPairs } = require('../apis/binance')
  const { TuiThing } = require('../tui/tui')
  const { ColourRGB } = require('../colour')
  const { Plot } = require('../tui/simple_plot')
  const { Label } = require('../tui/things')
  const { ansiColours } = require('../picasso')

  // ----------------------------------------------------
  //   Klines stuff 
  // ----------------------------------------------------

  const c_white = new ColourRGB(200, 200, 200)
  const c_green = new ColourRGB(0, 255, 0)
  const c_green_wick = new ColourRGB(10, 180, 10)
  const c_red = new ColourRGB(255, 0, 20)
  const c_red_wick = new ColourRGB(180, 0, 20)
  const c_blue = new ColourRGB(100, 100, 255)
  
  class Kline {
    constructor(a) {
      this.open_time = a.shift()
      this.open = parseFloat(a.shift())
      this.high = parseFloat(a.shift())
      this.low = parseFloat(a.shift())
      this.close = parseFloat(a.shift())
      this.volume = parseFloat(a.shift())
      this.close_time = a.shift()
      this.quote_asset_volume = parseFloat(a.shift())
      this.n_trades = a.shift()
      this.taker_buy_base_asset_volume = parseFloat(a.shift())
      this.taker_buy_quote_asset_volume = parseFloat(a.shift())
    }
  }

  class KlinesIntervalCycle {
    constructor() {
      const x = kline_intervals
      this.intervals = [
        x.fifteen_m,
        x.thirty_m,
        x.one_d,
        x.one_w,
        x.one_M
      ]
      this.i = 0
    }

    get interval() {
      const { intervals, i } = this
      return intervals[i]
    }

    next() {
      const { length: n } = this.intervals
      this.i = (this.i + 1) % n
    }
  }

  class Klines extends TuiThing {
    constructor(tui) {
      super(tui)
      this.symbol = ''
      this.quote = ''
      this.klines = []
      this.croppedKlines = []
      this.onData = this.onData.bind(this)
      this.max = 0
      this.min = 0
      this.plot = new Plot(tui)
      this.addNode(this.plot)
      this.intervals = new KlinesIntervalCycle()
      this.label = new Label(tui)
      this.addNode(this.label)
      this.tp_symbol = ''
      this.tp_symbol_text = ''
    }

    loadData(symbol) {
      this.symbol = symbol
      const { intervals } = this

      getTradingPairs(symbol, (found) => {
        console.log("getTradingPairs found", found)
        const { symbol: base } = this
        const quote = found[0]
        this.quote = quote
        this.tp_symbol = `${base}${quote}`
        this.tp_symbol_text = `${base}/${quote}`

        klines(this.tp_symbol, intervals.interval, this.onData, (err) => {
          console.error(err)
        })

      }, () => {
        
      })
    }

    loadTradingPair(base, quote) {
      this.symbol = base
      this.quote = quote
      const { intervals } = this
      
      this.tp_symbol = `${base}${quote}`
      this.tp_symbol_text = `${base}/${quote}`

      klines(this.tp_symbol, intervals.interval, this.onData, (err) => {
        console.error(err)
      })
    }


    candles() {
      const { intervals, symbol, quote } = this
      intervals.next()
      this.loadTradingPair(symbol, quote)
    }

    plotKline(x, kline) {
      //console.log("Plotting kLine", kline)
      const { bounds, max, min, plot } = this
      const { rows } = bounds

      // squash to (min, max)
      const h1 = max - min
      const h = h1 === 0 ? 1 : h1
      
      const xx = (rows - 1) * 2 / h
      const squash = (p) => {
        //console.log('squash(p), p, p - min, p-min/h', p, p - min, (p-min)/h, (p-min)/h * rows)
        // if (p < min) {
        //   console.log("WTF", max, min, low, h, p)
        // }
        return Math.floor((p - min) * xx) 
      }
      
      
      const { open, high, low, close } = kline
      const c_stick = open < close ? c_green : c_red
      const c_wick = open < close ? c_green_wick : c_red_wick

      // plot high to low
      //console.log("plot high to low squash(high), squash(low)", squash(high), squash(low))

      for (let y = squash(high); y >= squash(low); --y) {
        //console.log("Plotting y, squash(y)", y, squash(y))

        plot.plot(x, y, c_wick)
      }

      // plot open to close
      if (open < close) {
        //console.log("plot open < close squash(open), squash(close)", squash(open), squash(close))

        for (let y = squash(open); y <= squash(close); ++y) {
          plot.plot(x, y, c_stick)
        }
      }
      else {
        for (let y = squash(open); y >= squash(close); --y) {
          plot.plot(x, y, c_stick)
        }
      }
    }

    onData(response) {
      const { data: a } = response
      //console.log('Klines.onData', a)
      this.klines = a.map((x) => new Kline(x))
      this.klines.reverse()
      this.onResize()
    }

    onResize() {
      const { bounds, plot, klines, label, tp_symbol_text, intervals } = this
      const { copy: r } = bounds
      const { rst, hi_yellow: c_label, yellow: c_dim } = ansiColours

      label.text = `  ${c_label}${tp_symbol_text} ${c_dim}-- ${c_label}${intervals.interval}${rst}`
      label.setBounds(r.removeFromTop(1))

      const { rows: h, cols: w, row, col } = r
      plot.setBounds(r)
      plot.clear()

      //for (let i = 0; i < w; ++i) {
      //  plot.plot(i, h - 1, c_blue)
      //}
      this.croppedKlines = klines.filter((x, i) => i < w)
      
      const { croppedKlines } = this
      croppedKlines.reverse()
      
      let max = 0
      let min = 1499040000000
      croppedKlines.forEach((o) => {
        if (o.low < min) {
          min = o.low
        }
        if (o.high > max) {
          max = o.high
        }
      })
      this.max = max
      this.min = min

      croppedKlines.forEach((kline, x) => {
        this.plotKline(x, kline)
      })
    }

  }

  // --- exports --------------------------------------------
  exports.Kline = Kline
  exports.KlinesIntervalCycle = KlinesIntervalCycle
  exports.Klines = Klines
  
}).call(this)