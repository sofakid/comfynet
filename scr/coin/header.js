(function() {
  
  const { TuiThing } = require('../tui/tui')
  const { MenuOption, MenuLine } = require('../tui/menu')

  const enter = '\u21b5'

  const arrow_left = '\u21e6 '
  const arrow_right = '\u21e8 '
  const arrow_up = '\u21e7 '
  const arrow_down = '\u21e9 '

  // --- Header -------------------------------------------------------
  class Header extends TuiThing {
    constructor(tui) {
      super(tui)
      
      this.optioner = MenuOption.menuOptionerForTui(this.tui)
      this.options = null
      
      const { comfyProgram } = this.tui
 
      this.exitHandler = () => {
        comfyProgram.exit()
        return true
      }

      this.newsHandler = () => {
        comfyProgram.news()
        return true
      }
      
      this.normalHandler = () => {
        comfyProgram.normal()
        return true
      }

      this.candlesHandler = () => {
        comfyProgram.candles()
        return true
      }

      this.scrollPageUpHandler = () => {
        comfyProgram.tuiRoot.scrollPageUp()
        return true
      }

      this.scrollPageDownHandler = () => {
        comfyProgram.tuiRoot.scrollPageDown()
        return true
      }

      this.selectLastHandler = () => {
        comfyProgram.tuiRoot.selectLastResult()
        return true
      }

      this.selectNextHandler = () => {
        comfyProgram.tuiRoot.selectNextResult()
        return true
      }

      this.tradingPairHandler = () => {
        comfyProgram.tuiRoot.tradingPair()
        return true
      }

      this.modeNews()
    }

    onInitSearch(searchType) {
      switch (searchType) {
        case search_type_normal:
          this.modeNormal()
          break

        case search_type_news:
          this.modeNews()
          break
      }

      this.onResize()
    }

    clearOptions() {
      if (this.options !== null) {
        const yesAlsoClean = true
        this.removeNode(this.options, yesAlsoClean)
      }
    }

    modeNormal() {
      this.clearOptions()
      const { optioner } = this
      this.options = new MenuLine(this.tui, [
        optioner('',      'esc', ' Quit',       'Escape', this.exitHandler),
        optioner('',        'n', 'ews',         'n',      this.newsHandler),
        optioner('trading ','p', 'air',         'p',      this.tradingPairHandler),
        optioner('',        'c', 'andles',      'c',      this.candlesHandler),
        optioner('',        'P', 'ortfolio',    'P',      this.candlesHandler),
        optioner('',        'T', 'rade',        'T',      this.candlesHandler),

        optioner('', `${arrow_left}`, ' pg up',           'ArrowLeft',         this.scrollPageUpHandler),
        optioner('', `${arrow_right}/space`, ' pg down', ['ArrowRight', ' '],  this.scrollPageDownHandler),
        optioner('', `${arrow_up}`, ' last',              'ArrowUp',           this.selectLastHandler),
        optioner('', `${arrow_down}`, ' next',            'ArrowDown',         this.selectNextHandler),
      ])
      this.addNodeAndDagger(this.options)
      if (this.parent) {
        this.parent.onResize()
      }
    }

    modeNews() {
      this.clearOptions()
      const { optioner } = this
      this.options = new MenuLine(this.tui, [
        optioner('',      'esc', ' Quit',       'Escape', this.exitHandler),
        optioner('',        'n', 'ormal',       'n',      this.normalHandler),
        optioner('trading ','p', 'air',         'p',      this.tradingPairHandler),
        optioner('',        'c', 'andles',      'c',      this.candlesHandler),
        optioner('',        'P', 'ortfolio',    'P',      this.candlesHandler),
        optioner('',        'T', 'rade',        'T',      this.candlesHandler),

        optioner('', `${arrow_left}`, ' pg up',           'ArrowLeft',         this.scrollPageUpHandler),
        optioner('', `${arrow_right}/space`, ' pg down', ['ArrowRight', ' '],  this.scrollPageDownHandler),
        optioner('', `${arrow_up}`, ' last',              'ArrowUp',           this.selectLastHandler),
        optioner('', `${arrow_down}`, ' next',            'ArrowDown',         this.selectNextHandler),

      ])
      this.addNodeAndDagger(this.options)

      if (this.parent) {
        this.parent.onResize()
      }
    }

    get desiredRows() {
      if (!this.options) {
        return 1
      }
      return this.options.desiredRows
    }

    onResize() {
      const { copy: r } = this.bounds
      const pad_w = 2

      r.removeFromLeft(pad_w)
      
      if (this.options !== null) {
        r.removeFromRight(pad_w)
        this.options.setBounds(r)
      } 

    }

  }

  // --- exports -------------------------------------------
  exports.Header = Header

}).call(this)