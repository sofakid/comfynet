(function () {

  const axios = require('axios')
  const { TuiThing, TuiLine_fromListOfLines } = require('../tui/tui')
  const { LabelBox } = require('../tui/things')
  const { Image } = require('../tui/image')
  const { ellipsisText, flowText } = require('../miscy')
  const { ansiColours } = require('../picasso')

  const ddgSearchUrl = (text) => (
    `https://duckduckgo.com/?q=${encodeURIComponent(text)}&kp=-1&kl=us-en&kae=d`
  )
  
  const ddgImageSearchUrl = (text) => (
    `https://duckduckgo.com/?q=${encodeURIComponent(text)}&kp=-1&kl=us-en&kae=d&iax=images&ia=images`
  )

  /*
  q: query
  format: output format (json or xml)
    If format=='json', you can also pass:
      callback: function to callback (JSONP format)
      pretty: 1 to make JSON look pretty (like JSONView for Chrome/Firefox)
  no_redirect: 1 to skip HTTP redirects (for !bang commands).
  no_html: 1 to remove HTML from text, e.g. bold and italics.
  skip_disambig: 1 to skip disambiguation (D) Type.
  */
  const instantAnswerUrl = (searchTerms) => (
    `https://api.duckduckgo.com/?q=${encodeURIComponent(searchTerms)}&format=json&no_redirect=1&no_html=1&skip_disambig=1&t=comfynet`
  )

  /*
  {
    Abstract: ""
    AbstractText: ""
    AbstractSource: ""
    AbstractURL: ""
    Image: ""
    Heading: ""
    Answer: ""
    Redirect: ""
    AnswerType: ""
    Definition: ""
    DefinitionSource: ""
    DefinitionURL: ""
    RelatedTopics: [ ]
    Results: [ ]
    Type: ""
  }
  */

  ddgImageUrl = (relative) => `https://www.duckduckgo.com/${relative}`

  
  // ----------------------------------------------------------------
  //    AbstractTextThing
  // ----------------------------------------------------------------
  
  class AbstractTextThing extends TuiThing {

    constructor(tui, text, lineModifier) {
      super(tui)
      this.text = text
      this.labelBox = new LabelBox(tui, text, lineModifier)
      this.addNode(this.labelBox)
    }

    get desiredRows() {
      const { labelBox } = this
      return labelBox.desiredRows
    }

    onResize() {
      const { bounds } = this
      const { copy: r } = bounds
      const padw = 2
      r.removeFromLeft(padw)
      r.removeFromRight(padw)

      this.labelBox.setBounds(r)
    }

  }

  // ----------------------------------------------------------------
  //    DuckDuckGo Instant Answers Tui
  // ----------------------------------------------------------------

  class DdgInstantAnswers extends TuiThing {
    constructor(tui) {
      super(tui)
      this.image = null
      this.details = null
      this.padh = 1
      this.padw = 2
      this.lastDetailsWidth = null
    }

    get desiredRows() {
      const { details, image, bounds, padh } = this
      const { cols } = bounds
      let image_h = 0
      let details_h = 0
      let pad = 0

      if (image !== null) {
        pad += padh
        image_h = image.desiredWithCols(cols).rows
      }

      if (details !== null) {
        pad += padh
        details.bounds.cols = cols
        details_h = details.desiredRows
      }
      pad += padh

      return pad + image_h + details_h
    }

    onInitSearch(searchType) {
      const yesAlsoCleanNodes = true
      this.removeAllNodes(yesAlsoCleanNodes)
      this.onResize()
    }

    onIaResults(iaResults) {
      const { tui } = this
      const { AbstractText, Image: img, ImageHeight, ImageWidth } = iaResults

      if (img !== '') {
        const imgUrl = ddgImageUrl(img)
        const o = new Image(tui, imgUrl)
        o.brightenIfAllBlack = true
        const w = parseInt(ImageWidth)
        const h = parseInt(ImageHeight)
        if (w !== NaN && h!= NaN && w !== 0 && h !== 0) {
          o.width = w
          o.height = h
        }
        this.image = o
        this.addNode(this.image)
      }

      if (AbstractText !== '') {
        const { white } = ansiColours
        const lineModifier = (x, i) => (
          `${white}${x}`
        )
        this.details = new AbstractTextThing(tui, AbstractText, lineModifier)
        this.addNode(this.details)
      }
    }

    onResize() {
      super.onResize()
      const { image, details, bounds, padh, padw } = this
      const { copy: r } = bounds

      r.removeFromBottom(padh)
      r.removeFromLeft(padw)
      r.removeFromRight(padw)
      
      let desired = null
      if (image !== null) {
        r.removeFromTop(padh)
        desired = image.desiredWithCols(r.cols)
       
        const r_img = r.removeFromTop(desired.rows)

        image.setBounds(r_img)
      }

      if (details !== null) {
        r.removeFromTop(padh)
        details.setBounds(r)
      }
    }
  }

  instantAnswerSearch = (searchText, onResults, onError) => {
    const ddgIaUrl = instantAnswerUrl(searchText)
    axios.get(ddgIaUrl)
      .then((response) => {
        console.dir(response.data)
        onResults(response.data)
      })
      .catch((err) => {
        onError(err.message)
      }
    )
  }


  // --- exports --------------------------
  exports.instantAnswerUrl = instantAnswerUrl
  exports.ddgSearchUrl = ddgSearchUrl
  exports.ddgImageSearchUrl = ddgImageSearchUrl
  exports.DdgInstantAnswers = DdgInstantAnswers
  exports.instantAnswerSearch = instantAnswerSearch

}).call(this);