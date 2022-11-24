(function() {

  const xregexp = require('xregexp')
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')
  
  const { gigablastSearch, search_type_normal, search_type_news } = require('../apis/gigablast')
  
  const { metadata, quoteById } = require('../apis/coinmarketcap')
  const { events } = require('../apis/coinmarketcal')
  const { assets } = require('../apis/lunarcrush')
  const { getTradingPairs } = require('../apis/binance')
  
  const { ComfyThing } = require('../comfy_objects')
  const { ColourRGB, FullColour, C } = require('../colour')
  const { Dagger } = require('../daggers')
  
  const { SimpleFrame, ScrollFrame } = require('../tui/frame_things')
  const { Label, Box } = require('../tui/things')
  const { TuiThing, TuiLine } = require('../tui/tui')
  const { SearchResults } = require('../tui/search_results')
  const { SelectionBox, SelectionBoxContent } = require('../tui/selection')
  const { Ray } = require('../tui/simple_plot')
  
  const { Klines } = require('../coin/klines')
  const { CoinMetadata } = require('../coin/metadata')
  const { Header } = require('../coin/header')

  const config = new ProgramConfig()
  config.cmds = ['coin']
  
  const re_nonprintable = xregexp("[^\\PC\n]")
  const re_domain_from_url = xregexp("https?://([^/]*)/?\.")
  const clean = (s) => xregexp.replace(s, re_nonprintable, '', 'all')

  const domain_from_url = (s) => {
    const x = xregexp.exec(s, re_domain_from_url)
    if (x === null) {
      return ""
    }
    return x[1]
  }

  // --- TUI ----------------------------------------------------------
  class TradingPair extends SelectionBoxContent {
    constructor(tui, option, selectionConfig) {
      super(tui, option, selectionConfig)
      const { base, quote } = option
      this.base = base
      this.quote = quote
      this.n_rows = 1

      //console.log("new TradingPair()", selectionConfig)
      const { fc_selected, fc_unselected, fc_border } = selectionConfig
      this.c_selected = fc_selected.ansi
      this.c_unselected = fc_unselected.ansi
      this.c_border = fc_border.ansi

      this.selected = false
    }

    get desiredCols() {
      const { base, quote } = this
      return `${base}/${quote}`.length
    }

    preRender() {
      const { bounds, prSelected, prUnselected, 
              c_selected, c_unselected, base, quote } = this
      const { row, col } = bounds
      
      //console.log('TradingPair.preRender', c_selected, c_unselected)
      const sSelected = `${c_selected}${base}/${quote}`
      const sUnselected = `${c_unselected}${base}/${quote}`
      
      prSelected.push(new TuiLine(row, col, sSelected))
      prUnselected.push(new TuiLine(row, col, sUnselected))
    }
  }

  class TradingPairMenu extends TuiThing {
    constructor(tui, symbol) {
      super(tui)
      this.symbol = symbol

      this.bg = new Box(tui, ' ', C.bg_blue.bg_ansi)
      this.addNode(this.bg)

      const fc_selected = new FullColour(C.white, C.bg_blue)
      const fc_unselected = new FullColour(C.yellow, C.bg_blue)
      const fc_border = new FullColour(C.bg_blue, C.black) 
      
      this.selectionBox = new SelectionBox(tui, (o) => {
        // o was selected
        tui.root.tradingPairChosen(o)
      }, () => {
        // cancelled
        console.log("Selection CANCELLED")
      }, 
      fc_selected, fc_unselected, fc_border, TradingPair
      )
      this.addNode(this.selectionBox)
      
      const quad_BL = '\u258C';    // ▌
      const quad_BR = '\u2590';    // ▐
      const quad_UB = '\u2580'    // ▀
      
      const { ansi: border_ansi } = fc_border
      const bottom_l = `${border_ansi}${quad_BR}`
      const bottom_r = `${border_ansi}${quad_BL}`
      this.bottom_l = new Label(tui, bottom_l, 1)
      this.bottom_r = new Label(tui, bottom_r, 1)
      this.bottom = new Ray(tui, fc_border, quad_UB)

      this.addNode(this.bottom_l)
      this.addNode(this.bottom)
      this.addNode(this.bottom_r)

      const hit = (e) => (
        this.hitTest(e.row, e.col)
      )
      const d = new Dagger('TradingPairMenu')
      d.emenations = {
        'onClick': hit,
        'onMousePos': hit,
      }
      this.tuiFocusedDagger = d
      this.tuiBlurredDagger = d
      
      this.load()
      console.log("TradingPairMenu constructed.")

    }

    load() {
      const { tui, symbol, selectionBox } = this
      getTradingPairs(symbol, (x) => {
        const options = x.map((y) => ({ base: symbol, quote: y }))
        selectionBox.load(options)
        tui.root.onResize()
        
      }, () => {
        console.log("No trading pairs for ", symbol)
      })
      
    }

    get desiredRows() {
      const { selectionBox } = this
      const padding = 1
      return selectionBox.desiredRows + padding
    }

    get desiredCols() {
      const { selectionBox } = this
      const { desiredCols: selections } = selectionBox
      return selections
    }

    onResize() {
      const { bounds, selectionBox, bg, bottom, bottom_l, bottom_r } = this
      const { copy: r } = bounds
      const pad = 1
      const r_bottom = r.removeFromBottom(pad)
      bg.setBounds(r)
      bottom_l.setBounds(r_bottom.removeFromLeft(1))
      bottom_r.setBounds(r_bottom.removeFromRight(1))
      bottom.setBounds(r_bottom)
      selectionBox.setBounds(r)
    }
  }

  class CoinFrame extends SimpleFrame {
    constructor(tui) {
      super(tui)
      console.log("CoinFrame constructor")

      const { cmd, argv } = tui.comfyProgram
      const arg = argv[0].text

      this.header = new Header(tui)
      this.addNode(this.header)

      this.coinMetadata = new CoinMetadata(tui)
      this.addNode(this.coinMetadata)

      this.searchResults = new SearchResults(tui)
      this.scrollFrame = new ScrollFrame(tui, this.searchResults)
      this.addNode(this.scrollFrame)

      this.klines = new Klines(tui)
      this.addNode(this.klines)

      this.tradingPairMenu = null

      this.symbol = ''

      console.log("CoinFrame constructed")
    }

    onResize() {
      super.onResize()
      const { bounds, header, coinMetadata, scrollFrame, klines, tradingPairMenu } = this
      const { copy: r } = bounds
      
      header.setBounds(r)
      const { desiredRows: h_rows } = header
      header.setBounds(r.removeFromTop(h_rows))
      
      coinMetadata.setBounds(r.removeFromTop(13))
      
      r.removeFromTop(1)
      const r_klines = r.removeFromTop(16)
      klines.setBounds(r_klines)
      if (tradingPairMenu !== null) {
        const { desiredCols: w_tp, desiredRows: h_tp } = tradingPairMenu
        const r_tp = r_klines.removeFromLeft(w_tp)
        r_tp.rows = h_tp  
        tradingPairMenu.setBounds(r_tp)
      }
      
      r.removeFromTop(1)
      scrollFrame.setBounds(r)
    }
    
    tradingPair() {
      const { tui, symbol } = this
      this.tradingPairMenu = new TradingPairMenu(tui, symbol) 
      this.addNodeAndDagger (this.tradingPairMenu)
      this.tradingPairMenu.load()
      this.onResize()
    }

    tradingPairChosen(o) {
      console.log("chosen", o)
      const yesAlsoCleanNodes = true
      this.removeNode(this.tradingPairMenu, yesAlsoCleanNodes)
      this.tradingPairMenu = null
      this.onResize()
      const { base, quote } = o
      this.klines.loadTradingPair(base, quote)
    }
    
    candles() {
      this.klines.candles()
    }

    infoCoin(coin) {
      console.log('coins', coin)
      const { coinMetadata, tui } = this
      
      metadata(coin, (data) => {
        const id = Object.keys(data)[0]
        const o = data[id]
        console.log("metadata", o, data)
        coinMetadata.onMetadata(o)

        quoteById(id, (data) => {
          console.log("quote", data)
          coinMetadata.onQuote(data[id])
          this.onResize()
          tui.makeDirty()
        },
        (err) => {
          console.error(err)
        })

        const { symbol } = o
        this.symbol = symbol
        events(symbol, (x) => {
          console.log("Events: ", o, x)
          if (x !== null) {
            //alert('events works now')
          }
        }, (err) => {
          console.error(err)
        })

        this.klines.loadData(symbol)
        
        // assets(symbol, (x) => {
        //   coinMetadata.onLunarCrushAssets(x)
        // },
        // (err) => {
        //   console.error(err)
        // })

        const { searchResults, scrollFrame } = this
        searchResults.onInitSearch(search_type_normal)

        const domain = domain_from_url(o.description)
        const search_terms = `${o.name} ${domain}`

        console.log("Searching for: ", search_terms)
        gigablastSearch(search_terms, 0, search_type_news, (x) => {
          if (x !== undefined) {
            console.log("Search results:", x.results)
            searchResults.onResults(x.results)
            const { cols } = scrollFrame.bounds
            scrollFrame.resizeView(searchResults.desiredRows, cols)
            this.onResize()
          }
        }, (err) => {
          console.error(err)
        })

        // coins((x) => {
        //   console.log("Coins: ", o, x)
        // }, (err) => {
        //   console.error(err)
        // })

      }, (err) => {
        console.error(err)
      })
    }


    scrollPageUp() {
      const didScroll = this.scrollFrame.scrollPageUp()
      if (didScroll) {
        this.searchResults.selectTopResult(this.scrollFrame)
      }
    }

    scrollPageDown() {
      const didScroll = this.scrollFrame.scrollPageDown()
      if (didScroll) {
        this.searchResults.selectTopResult(this.scrollFrame)
      }
    }

    selectLastResult() {
      const { tradingPairMenu, searchResults, scrollFrame } = this
      if (tradingPairMenu !== null) {
        console.log("selectLastResult", tradingPairMenu)
        tradingPairMenu.selectionBox.selectLast()
      }
      else {
        const selected = searchResults.selectLastResult()
        if (selected) {
          scrollFrame.scrollToPageForNode(selected)
        }
      }
    }

    selectNextResult() {
      const { tradingPairMenu, searchResults, scrollFrame } = this
      if (tradingPairMenu !== null) {
        console.log("selectNextResult", tradingPairMenu)
        tradingPairMenu.selectionBox.selectNext()
      }
      else {
        const selected = this.searchResults.selectNextResult()
        if (selected) {
          this.scrollFrame.scrollToPageForNode(selected)
        }
      }
    }
  }

  // --- Program ------------------------------------------------------
  class CoinProgramLauncher extends ProgramLauncher {
    onCmd(cmd, args, spot) {
      console.log("CoinProgramLauncher", cmd, args)
      const a = args.length > 0 ? args : ['BTC']
      this.launch(spot).start(cmd, a)
    }
  }

  class CoinProgram extends Program {
    constructor(spot) {
      super('Coin', spot, CoinFrame)
      console.log("CoinProgram constructor")
    }

    start(cmd, args) {
      super.start(cmd, args)
      console.log("CoinProgram starting", cmd, args)

      if (Array.isArray(args)) {
        const arg0 = args.shift()
        const s = arg0 instanceof ComfyThing ? arg0.text : arg0
        console.log("CoinProgram info", s)

        this.tuiRoot.infoCoin(s)
        this.tui.makeDirty()
      }
    }

    
    news() {
      //this.initSearch(this.searchText, search_type_news)
      //this.performSearch()
    }

    normal() {
      //this.initSearch(this.searchText, search_type_normal)
      //this.performSearch()
    }

    candles() {
      this.tuiRoot.candles()
    }

  }

  
  // --- exports --------------------------
  exports.programLauncher = new CoinProgramLauncher(CoinProgram, "Coin")
  exports.config = config

}).call(this)
