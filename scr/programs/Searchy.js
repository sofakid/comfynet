(function() {

  const { ansiColours } = require('../picasso')
  const { ComfyThing } = require('../comfy_objects')
  const { Dagger } = require('../daggers')
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')

  const { SimpleFrame, ScrollFrame } = require('../tui/frame_things')
  const { Label } = require('../tui/things')
  const { TuiThing, TuiLine } = require('../tui/tui')
  
  const { MenuOption, MenuLine } = require('../tui/menu')
  const { SearchResults } = require('../tui/search_results')
  

  const { ddgImageSearchUrl, ddgSearchUrl, DdgInstantAnswers, instantAnswerSearch } = require('../apis/duckduckgo')
  

  const config = new ProgramConfig()
  config.cmds = ['?']
  config.defaultSearchProgram = true
  
  const enter = '\u21b5'

  const arrow_left = '\u21e6 '
  const arrow_right = '\u21e8 '
  const arrow_up = '\u21e7 '
  const arrow_down = '\u21e9 '

  // const arrow_left = '\u23f4 '
  // const arrow_right = '\u23f5 '
  // const arrow_up = '\u23f6 '
  // const arrow_down = '\u23f7 '

  const { gigablastSearch, search_type_normal, search_type_news, search_type_images } = require('../apis/gigablast')

  // --- Tui ----------------------------------------------------------
  
  class ResultsFound extends Label {
    constructor(tui) {
      super(tui, '')
      this.length = 0
    }

    onInitSearch(searchType) {
      const { bg_hi_black, hi_white, rst } = ansiColours
      this.text = `${bg_hi_black}${hi_white} Searching... ${rst}`
      this.length = ' Searching... '.length
    }

    onResults(searchData) {
      const { numResultsTotal } = searchData
      const { bg_hi_black, hi_white, rst } = ansiColours
      this.text = `${bg_hi_black}${hi_white} ${numResultsTotal} Results ${rst}`
      this.length = ` ${numResultsTotal} Results `.length
    }

  }

  class Header extends TuiThing {
    constructor(tui) {
      super(tui)
      this.searchData = null

      this.resultsFound = new ResultsFound(tui)
      
      this.optioner = MenuOption.menuOptionerForTui(this.tui)
      this.options = null
      
      this.addNode(this.resultsFound)
        
      const { comfyProgram } = this.tui
 
      this.exitHandler = () => {
        comfyProgram.exit()
        return true
      }

      this.continueHandler = () => {
        if (comfyProgram.searchData.moreResultsFollow) {
          comfyProgram.continueSearch()
        }
        return true
      }

      this.refineHandler = () => {
        comfyProgram.refine()
        return true
      }
      
      this.ddgHandler = () => {
        comfyProgram.useDdg()
        return true
      }

      this.imagesHandler = () => {
        comfyProgram.images()
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
    }

    onInitSearch(searchType) {
      this.resultsFound.onInitSearch(searchType)

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

    modeSearching() {
      this.clearOptions()
      const { optioner } = this
      this.options = new MenuLine(this.tui, [
        optioner('',      'esc', ' Quit',     'Escape', this.exitHandler),
        optioner('',        'r', 'efine',     'r',      this.refineHandler),
        optioner('use ',    'd', 'uckduckgo', 'd',      this.ddgHandler),
        optioner('ddg ',    'i', 'mages',     'i',      this.imagesHandler),
        optioner('',        'n', 'ews',       'n',      this.newsHandler),
      ])
      this.addNodeAndDagger(this.options)
      this.parent.onResize()
    }

    modeNormal() {
      this.clearOptions()
      const { optioner } = this
      this.options = new MenuLine(this.tui, [
        optioner('',      'esc', ' Quit',       'Escape', this.exitHandler),
        optioner('',        'r', 'efine',       'r',      this.refineHandler),
        optioner('use ',    'd', 'uckduckgo',   'd',      this.ddgHandler),
        optioner('ddg ',    'i', 'mages',       'i',      this.imagesHandler),
        optioner('',        'n', 'ews',         'n',      this.newsHandler),
        optioner('',        'm', 'ore results', 'm',      this.continueHandler),

        optioner('', `${arrow_left}`, ' pg up',           'ArrowLeft',         this.scrollPageUpHandler),
        optioner('', `${arrow_right}/space`, ' pg down', ['ArrowRight', ' '],  this.scrollPageDownHandler),
        optioner('', `${arrow_up}`, ' last',              'ArrowUp',           this.selectLastHandler),
        optioner('', `${arrow_down}`, ' next',            'ArrowDown',         this.selectNextHandler),
      ])
      this.addNodeAndDagger(this.options)
      this.parent.onResize()
    }

    modeNews() {
      this.clearOptions()
      const { optioner } = this
      this.options = new MenuLine(this.tui, [
        optioner('',      'esc', ' Quit',       'Escape', this.exitHandler),
        optioner('',        'r', 'efine',       'r',      this.refineHandler),
        optioner('use ',    'd', 'uckduckgo',   'd',      this.ddgHandler),
        optioner('ddg ',    'i', 'mages',       'i',      this.imagesHandler),
        optioner('',        'n', 'ormal',       'n',      this.normalHandler),
        optioner('',        'm', 'ore results', 'm',      this.continueHandler),

        optioner('', `${arrow_left}`, ' pg up',           'ArrowLeft',         this.scrollPageUpHandler),
        optioner('', `${arrow_right}/space`, ' pg down', ['ArrowRight', ' '],  this.scrollPageDownHandler),
        optioner('', `${arrow_up}`, ' last',              'ArrowUp',           this.selectLastHandler),
        optioner('', `${arrow_down}`, ' next',            'ArrowDown',         this.selectNextHandler),
      ])
      this.addNodeAndDagger(this.options)
      this.parent.onResize()
    }

    onResults(searchData) {
      console.log("Header.onResults 1")
      this.searchData = searchData
      this.resultsFound.onResults(searchData)
      this.onResize()
      console.log("Header.onResults 2")

    }

    get desiredRows() {
      if (!this.options) {
        return 1
      }
      return this.options.desiredRows
    }

    onResize() {
      const { copy: r } = this.bounds

      const leftMargin = 2
      const rightMargin = 2
      const pad = 2

      r.removeFromLeft(leftMargin)

      const lenResults = this.resultsFound.length
      const rResults = r.removeFromLeft(lenResults)
      this.resultsFound.setBounds(rResults)
      
      r.removeFromLeft(pad)
      
      if (this.options !== null) {
        r.removeFromRight(rightMargin)
        this.options.setBounds(r)
      } 

    }

  }

  // ----------------------------------------------------------------
  //    Main Layout
  // ----------------------------------------------------------------

  class Body extends TuiThing {
    constructor(tui) {
      super(tui)
      this.ia = new DdgInstantAnswers(tui)
      this.results = new SearchResults(tui)
    }

    get desiredRows() {
      const { results, ia } = this
      const { desiredRows: x } = ia
      const { desiredRows: y } = results
      return x + y
    }

    onResize() {
      const { bounds, ia, results } = this
      const { copy: r } = bounds
      const { desiredRows: ia_h } = ia

      ia.setBounds(r.removeFromTop(ia_h))
      results.setBounds(r)
    }

    onInitSearch(searchType) {
      const { tui } = this
      const yesAlsoCleanNodes = true
      this.removeAllNodes(yesAlsoCleanNodes)
      this.ia = new DdgInstantAnswers(tui)
      this.results = new SearchResults(tui)
      this.addNode(this.results)
      this.addNode(this.ia)

      this.ia.onInitSearch(searchType)
      this.results.onInitSearch(searchType)
    }
    
    onIaResults(iaResults) {
      this.ia.onIaResults(iaResults)
    }

    onResults(results) {
      this.results.onResults(results)
    }

  }

  class SearchFrame extends SimpleFrame {
    constructor(tui) {
      super(tui)
      this.header = new Header(tui)
      this.body = new Body(tui)
      this.scrollFrame = new ScrollFrame(tui, this.body)
      this.addNode(this.header)
      this.addNode(this.scrollFrame)
    }

    onInitSearch(searchType) {
      this.header.onInitSearch(searchType)
      this.body.onInitSearch(searchType)
    }

    scrollPageUp() {
      const didScroll = this.scrollFrame.scrollPageUp()
      if (didScroll)
        this.body.results.selectTopResult(this.scrollFrame)
    }

    scrollPageDown() {
      const didScroll = this.scrollFrame.scrollPageDown()
      if (didScroll)
        this.body.results.selectTopResult(this.scrollFrame)
    }

    selectLastResult() {
      const selected = this.body.results.selectLastResult()
      if (selected) {
        this.scrollFrame.scrollToPageForNode(selected)
      }
    }

    selectNextResult() {
      const selected = this.body.results.selectNextResult()
      if (selected) {
        this.scrollFrame.scrollToPageForNode(selected)
      }
    }

    onResults(results, searchData) {
      const { header, body, bounds, scrollFrame } = this
      header.onResults(searchData)
      body.onResults(results)

      const { desiredRows } = body
      const { cols } = bounds
      scrollFrame.resizeView(desiredRows, cols)
    }

    onIaResults(iaResults) {
      const { body, bounds, scrollFrame } = this
      body.onIaResults(iaResults)

      const { desiredRows } = body
      const { cols } = bounds
      scrollFrame.resizeView(desiredRows, cols)
    }

    onResize() {
      super.onResize()
      const { bounds, header, scrollFrame } = this
      const { copy: r } = bounds
      header.setBounds(r)

      const { desiredRows: headerHeight } = header
      const rHeader = r.removeFromTop(headerHeight)
      header.setBounds(rHeader)
      scrollFrame.setBounds(r)
    }

  }

  // --- Program ------------------------------------------------------

  class SearchData {
    constructor(searchText) {
      this.searchText = searchText
      this.numResultsTotal = 0
      this.numResultsProvided = 0
      this.moreResultsFollow = false
      this.resultsPage = 0
      this.nextS = 0
    }
  }

  class SearchyProgramLauncher extends ProgramLauncher {
    onCmd(cmd, args, spot) {
      this.launch(spot).stdout(`Searchy program -- ${args}\r\n`)
    }
    
    startSearch(terms, spot) {
      this.launch(spot).startSearch(terms)
    }

  }

  class SearchyProgram extends Program {
    constructor(spot) {
      super('Searchy', spot, SearchFrame)
      this.searchData = new SearchData('')
      this.searchType = search_type_normal
      this.searchText = ''

      this.onResults = this.onResults.bind(this)
      this.onError = this.onError.bind(this)
      this.onIaResults = this.onIaResults.bind(this)
      this.onIaError = this.onIaError.bind(this)
      
    }

    startSearch(terms) {
      let text = ''
      
      if (terms instanceof ComfyThing) {
        text = terms.text
      }
      
      if (text.trim().length === 0) {
        console.error('no search terms')
        return
      }
      
      this.searchData = new SearchData(text)
      super.start()
      this.initSearch(text, search_type_normal)
      this.performSearch()
    }

    initSearch(text, searchType) {
      this.searchData.nextS = 0
      this.searchType = searchType
      this.searchText = text
      this.tuiRoot.onInitSearch(searchType)
      this.tui.makeDirty()
    }

    performSearch() {
      const { nextS } = this.searchData
      const { searchType, searchText } = this

      gigablastSearch(searchText, nextS, searchType, this.onResults, this.onError)

      if (searchType === search_type_normal && nextS === 0) {
        instantAnswerSearch(searchText, this.onIaResults, this.onIaError)
      }
    }

    continueSearch() {
      this.performSearch()
    }

    refine() {

    }

    useDdg() {
      const { searchText } = this.searchData
      const url = ddgSearchUrl(searchText)
      chrome.tabs.create({ url })
    }

    images() {
      const { searchText } = this.searchData
      const url = ddgImageSearchUrl(searchText)
      chrome.tabs.create({ url })
    }

    news() {
      this.initSearch(this.searchText, search_type_news)
      this.performSearch()
    }

    normal() {
      this.initSearch(this.searchText, search_type_normal)
      this.performSearch()
    }

    onResults(data) {
      const { searchData, tuiRoot } = this
      const { numResultsTotal, moreResultsFollow, results, numResultsProvided } = data
      searchData.numResultsTotal = numResultsTotal
      searchData.moreResultsFollow = moreResultsFollow
      searchData.numResultsProvided = numResultsProvided
      searchData.resultsPage++
      searchData.nextS += numResultsProvided
      
      tuiRoot.onResults(results, searchData)
    }

    onError(msg) {
      this.stderr(`Search error: ${msg}\r\n`)
    }

    onIaResults(data) {
      const { Redirect } = data
      if (Redirect === '') {
        this.tuiRoot.onIaResults(data)
      }
      else {
        chrome.tabs.create({ url: Redirect })
      }
    }

    onIaError(msg) {
      this.stderr(`IA Error: ${msg}\r\n`)
    }
  }

  // --- exports --------------------------
  exports.programLauncher = new SearchyProgramLauncher(SearchyProgram, "Searchy")
  exports.config = config

}).call(this);