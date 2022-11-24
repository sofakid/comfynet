
(function() {
  
  const { 
    TuiLine,
    TuiThing
  } = require('./tui')
  const { C, ColourRGB, FullColour } = require('../colour')

  const { Rectangle } = require('./rectangle')

  const xregexp = require('xregexp')

  const { chunkString, flowText } = require('../miscy')
  const { Dagger } = require('../daggers')
  const { ansiColours, fgRgb, bgRgb } = require('../picasso')

  const re_nonprintable = xregexp("[^\\PC\n]")
  const re_only_printable = xregexp("^\\PC+$")

  const esc = '\x1b'

  const clean = (s) => xregexp.replace(s, re_nonprintable, '', 'all')

  
  // -----------------
  // --- CursorPos ---
  // -----------------
  class CursorThing extends TuiThing {
    constructor(tui) {
      super(tui)
      this.row = 1
      this.col = 1
      this.hidden = false
      this.char = ' '
      this.colour = `${bgRgb(255, 255, 255)}${fgRgb(0, 0, 0)}`
    }

    show() {
      this.hidden = false
      this.tui.makeDirty()
    }

    hide() {
      this.hidden = true
      this.tui.makeDirty()
    }

    pos(row, col, char = ' ') {
      this.row = row
      this.col = col
      this.char = char
      this.tui.makeDirty()
    }

    onRender(f) {
      if (this.hidden === false) {
        const s = `${this.colour}${this.char}${ansiColours.rst}`
        const a = [new TuiLine(this.row, this.col, s)]
        f(a)
      }
    }
  }

  // -----------------
  // --- TextInput ---
  // -----------------
  class TextInput extends TuiThing {
    constructor(tui, c_fg = C.white, c_bg = C.black, c_fg_blurred = C.white, c_bg_blurred = C.black) {
      super(tui)
      
      this.chars = ''
      this.pos = 0

      this.flow = ['']

      this.colour = new FullColour(c_fg, c_bg)
      this.colour_blurred = new FullColour(c_fg_blurred, c_bg_blurred)
      this.cursor = new CursorThing(tui)
      this.addNode(this.cursor)
      
      const dagger = new Dagger('ComfyShellInput')
      this.thingFocusedDagger = dagger
      
      dagger.emenations = {
        'onData': this.onData.bind(this),

        'Enter': this.onEnter.bind(this),
  
        'Backspace': this.backspace.bind(this),
        'Delete': this.deleteKey.bind(this),
  
        'ArrowLeft': this.arrowLeft.bind(this),
        'ArrowRight': this.arrowRight.bind(this),
        'ArrowUp': this.arrowUp.bind(this),
        'ArrowDown': this.arrowDown.bind(this),
      }
    }

    get desiredRows() {
      const { cols } = this.bounds
      const n = this.chars.length
      const theresChars = n > 0
      const cursorIsAtTheEnd = this.pos === n
      const textJustFits = n % cols === 0
      const andMaybeOneMoreForTheCursor = theresChars && cursorIsAtTheEnd && textJustFits ? 1 : 0

      return this.flow.length + andMaybeOneMoreForTheCursor
    }

    setText(text) {
      this.chars = text
      this.pos = text.length
      this.reflow()
    }

    reflow() {
      const { cols } = this.bounds
      if (cols <= 0)
        return
        
      this.flow = chunkString(this.chars, cols)
      this.cursorPos()
      this.tui.makeDirty()

    }

    cursorPos() {
      const { bounds, pos, chars } = this
      const { row, col, cols } = bounds
      
      const r = row + Math.floor(pos / cols)
      
      const p = pos % cols
      const c = col + p
      
      const char = chars.length === pos ? ' ' : chars[pos]
      this.cursor.pos(r, c, char)
    }

    consumeChars() {
      const s = this.chars
      this.chars = ''
      this.pos = 0
      this.flow = ['']
      this.reflow()
      return s
    }

    // --- handlers ----------------------------------------------------------

    onData(data) {
      // if we do this pasting won't work. maybe we should though.
      //if (xregexp.test(data, re_only_printable)) {
        this.chars = `${this.chars.slice(0, this.pos)}${data}${this.chars.slice(this.pos)}`
        this.pos += data.length
        this.reflow()
      //}
      return true
    }

    backspace() {
      if (this.pos > 0) {
        if (this.pos === this.chars.length) {
          this.chars = this.chars.slice(0, -1)
        }
        else {
          this.chars = `${this.chars.slice(0, this.pos - 1)}${this.chars.slice(this.pos)}`
        }
        --this.pos
        this.reflow()
      }
      return true
    }

    deleteKey() {
      const s = this.chars
      if (++this.pos > s.length) {
        this.pos = s.length
      }
      else {
        this.backspace()
      }
      return true
    }

    arrowLeft() {
      const { row, col } = this.bounds
      if (--this.pos < 0) {
        this.pos = 0
      }
      this.cursorPos()
      return true
    }

    arrowRight() {
      const s = this.chars
      if (++this.pos > s.length) {
        this.pos = s.length
      }
      this.cursorPos()
      return true
    }

    arrowUp() {
    }

    arrowDown() {
    }

    onEnter() {
    }

    // --- overrides ---------------------------------------------------------

    focus() {
      super.focus()
      this.cursor.show()
    }

    blur() {
      super.blur()
      this.cursor.hide()
    }
    
    onRender(f) {
      const { bounds, colour, colour_blurred, flow, hasFocus } = this
      const { row, col } = bounds
      const ansi = hasFocus ? colour.ansi : colour_blurred.ansi
      const a = flow.map((x, i) => new TuiLine(row + i, col, `${ansi}${x}`))
      f(a)
    }

    onResize() {
      this.reflow()
      this.cursorPos()
    }
  }


  // -------------
  // --- Label ---
  // -------------
  class Label extends TuiThing {
    constructor(tui, text = '', length = null) {
      super(tui)
      this.text = text
      this.length = length === null ? clean(text).length : length; 
    }

    onRender(f) {
      const { bounds, text } = this
      const { row, col } = bounds
      f([new TuiLine(row, col, text)])
    }

    onResize() {
    }
    
  }

  // -------------
  // --- Link ---
  // -------------
  class Link extends TuiThing {
    constructor(tui, text, url) {
      super(tui)
      this.text = text
      this.url = url
      this.length = text.length
    
      const clickDagger = new Dagger(`Link ${text}`)
      this.tuiFocusedDagger = clickDagger
      this.tuiBlurredDagger = clickDagger
      clickDagger.emenations = {
        'onClick': (o) => {
          if (this.hitTest(o.row, o.col)) {
            chrome.tabs.create({ url })
          }
        }
      }

    }

    onRender(f) {
      const { bounds, text } = this
      const { row, col } = bounds
      f([new TuiLine(row, col, text)])
    }

    onResize() {
    }
    
  }
  // ----------------
  // --- LabelBox ---
  // ----------------
  class LabelBox extends TuiThing {
    
    constructor(tui, text, lineModifier = (x, i) => (`${x}`)) {
      super(tui)
      this.text = text
      this.preRendered = []
      this.lastPreRenderBounds = Rectangle.nonDefault()
      this.lastPrerenderedText = null
      this.lineModifier = lineModifier
    }

    get desiredRows() {
      this.preRender()
      return this.preRendered.length
    }

    preRender() {
      const { bounds, lastPreRenderBounds, lastPrerenderedText, text } = this
      if (lastPreRenderBounds.equals(bounds)) {
        if (lastPrerenderedText === text) {
          return
        }
      }

      this.lastPreRenderBounds = bounds.copy
      this.lastPreRenderedText = text

      if (text === null) {
        return
      }

      const { row, col, cols } = bounds
      const lines = flowText(text, cols)

      this.preRendered = lines.map((x, i) => (
        new TuiLine(row + i, col, this.lineModifier(x, i))
      ))
    }

    onRender(f) {
      f(this.preRendered)
    }

    onResize() {
      this.preRender()
    }
  }

  
  // -------------
  // --- Box -----
  // -------------
  class Box extends TuiThing {
    constructor(tui, char, colours) {
      super(tui)
      this.char = char
      this.colour = colours.join === undefined ? colours : colours.join('')
      this.text = ''
    }

    onRender(f) {
      //console.log(`Box render ${this.tui.tag('Boxy', this.bounds.rows)}`)
      const { row, rows, col } = this.bounds
      let a = []
      for (let i = row; i < row + rows; ++i) {
        a.push(new TuiLine(i, col, `${this.colour}${this.text}${esc}[m`))
      }
      f(a)
    }

    onResize() {
      const r = this.bounds
      if (r.cols > 0) {
        this.text = this.char.repeat(r.cols)
      }
    }
  }
  

  // --- exports -----------------------------------------------------
  exports.CursorThing = CursorThing
  exports.TextInput = TextInput
  exports.Link = Link
  exports.Label = Label
  exports.LabelBox = LabelBox
  exports.Box = Box
  
}).call(this);