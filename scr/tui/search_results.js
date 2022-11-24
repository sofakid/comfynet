
  (function() {

    const xregexp = require('xregexp')
    
    const { ellipsisText, flowText } = require('../miscy')
    const { ansiColours } = require('../picasso')
  
    const { TuiThing, TuiLine, TuiLine_fromListOfLines } = require('./tui')
    const { SimpleContentList, SimpleContentListEntry, SimpleContentListEntryContent } = require('./simple_content')

  const re_nonprintable = xregexp("[^\\PC\n]")
  const clean = (s) => xregexp.replace(s, re_nonprintable, '', 'all')

  // ----------------------------------------------------------------
  //    Search Result stuff
  // ----------------------------------------------------------------

  class SearchResultContent extends SimpleContentListEntryContent {
    constructor(tui, result) {
      super(tui)
      this.result = result
    }

    reflowSummary(colour, sum) {
      const { cols } = this.bounds
      const indent1 = `${colour}  > `
      const indent2 =          '    '
  
      const indentedWidth = cols - indent2.length
      if (indentedWidth <= 0) {
        return ['']
      }
      
      const lines = sum.replace(/\r/g, '').split(/\n/)
      const linesOut = []

      lines.map((y) => {
        const yy = y.trim()

        const flow = flowText(yy, indentedWidth)
        flow.map((z, i) => {
          const indent = i === 0 ? indent1 : indent2
          linesOut.push(`${indent}${z.trim()}`)
        })
      })

      return linesOut
    }
    
    preRender() {
      const { result: o, bounds } = this
      const { row, col, cols } = bounds

      const title = clean(o.title)
      const sum = clean(o.sum)
      const url = clean(o.url)
       
      const { hi_black, hi_blue, blue, hi_cyan, cyan, hi_white, white } = ansiColours

      const cs_title = hi_white
      const cs_dashes = hi_black
      const cs_url = hi_blue
      const cs_summary = white

      const cu_title = hi_cyan
      const cu_dashes = hi_black
      const cu_url = blue
      const cu_summary = cyan

      let x = [`${cs_title}${title} ${cs_dashes}-- ${cs_url}${url}`]
      let y = [`${cu_title}${title} ${cu_dashes}-- ${cu_url}${url}`]
      if (x[0].length > cols) {
        x = [`${cs_title}${ellipsisText(title, cols)}`, `${cs_url}${ellipsisText(url, cols)}`]
        y = [`${cu_title}${ellipsisText(title, cols)}`, `${cu_url}${ellipsisText(url, cols)}`]
      }
      const s_summary = this.reflowSummary(cs_summary, sum)
      const u_summary = this.reflowSummary(cu_summary, sum)
      
      
      this.prSelected = TuiLine_fromListOfLines(row, col, x.concat(s_summary))
      this.prUnselected = TuiLine_fromListOfLines(row, col, y.concat(u_summary))
      
      const pad = 1
      this.n_rows = this.prSelected.length + pad
    }
  }

  class SearchResult extends SimpleContentListEntry {
    constructor(tui, result) {
      const content = new SearchResultContent(tui, result)
      const { cyan } = ansiColours
      super(tui, content, cyan)
      this.result = result
    }

    onEnterWhenSelected(event) {
      this.goUrl()
    }

    onClick(event) {
      this.goUrl()
    }

    goUrl() {
      const url = clean(this.result.url)
      chrome.tabs.create({ url })
    }
  }

  class SearchResults extends SimpleContentList {
    onInitSearch(searchType) {
      const yesAlsoCleanNodes = true
      this.removeAllNodes(yesAlsoCleanNodes)
    }
    
    onResults(results) {
      if (results !== undefined) {
        const nodes = results.map((x) => new SearchResult(this.tui, x))
        if (nodes.length > 0) {
          nodes.forEach((x) => {
            this.addNodeAndDagger(x)
          })
          nodes[0].select()
        }
      }
    }
  }
  
  
  // --- exports ------------------------------------------------------
  exports.SearchResults = SearchResults

}).call(this)
