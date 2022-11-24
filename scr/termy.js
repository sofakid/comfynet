
(function() {
  const xregexp = require('xregexp')
  const { Terminal } = require('xterm')
  const { FitAddon } = require('xterm-addon-fit')
  const { WebglAddon } = require('xterm-addon-webgl')
  const { Mousey } = require('./mousey')
  const picasso = require('./picasso')

  const { programLauncher: comfyLandLauncher } = require('./programs/ComfyLand')
  const { Spot } = require('./program')
  const { Rectangle } = require('./tui/tui')

  const term = new Terminal()
  const fitAddon = new FitAddon()
  
  term.loadAddon(fitAddon)

  const nl = '\r\n'
  
  class ComfyTermNumbers {
    constructor(baseY, cursorX, cursorY, length, rows, cols) {
      this.baseY = baseY
      this.cursorX = cursorX
      this.cursorY = cursorY
      this.length = length
      this.rows = rows
      this.cols = cols; 
    }
  }

  let comfies = 0
  class ComfyTerm {
    constructor() {
      console.log("New ComfyTerm", comfies)
      if (comfies++ > 0) {
        console.error('Too many ComfyTerms?', comfies)
      }
      this.comfyLand = null
    }
    
    setComfyLand(o) {
      this.comfyLand = o
    }

    getNumbers() {
      const { baseY, cursorX, cursorY, length } = term.buffer
      const { rows, cols } = term
      return new ComfyTermNumbers(baseY, cursorX, cursorY, length, rows, cols)
    }

    placeText(text, row, col, andThen = () => {}) {
      const { place_text, save_state, restore_state } = picasso
      const s = place_text(text, row, col)
      this.writeRaw(`${save_state}${s}${restore_state}`, andThen)
    }

    writeText(text, andThen = () => {}) {
      this.writeLines(text.split(/\r?\n/), andThen)
    }

    writeLines(lines, andThen = () => {}, innerBulk = false) {

      if (lines.length === 0) {
        return
      }

      if (lines.length === 1) {
        this.writeLine(lines[0], andThen, innerBulk)
        return
      }

      const first = lines[0]
      const rest = lines.slice(1)
      const bulk = true

      this.writeLine(first, () => {
        this.writeLines(rest, andThen, innerBulk)
      }, bulk)
    }

    writeLine(line, andThen = () => {}, bulk = false) {
      const erase_to_eol = '\x1b[K'
      term.write(`${line}${erase_to_eol}${nl}${erase_to_eol}`, andThen)
    }

    writeRaw(raw, andThen = () => {}) {
      term.write(raw, andThen)
    }
  }

  const comfyTerm = new ComfyTerm()

  // -------------------------------------------------------------------------
  function initTerminal(config = null) {
    
    const fGetScreenBounds = () => {
      const { rows, cols } = comfyTerm.getNumbers()
      return new Rectangle(rows, cols, 1, 1)
    }

    const r = fGetScreenBounds()
    const spot = new Spot(r, fGetScreenBounds)
    const comfyLand = comfyLandLauncher.launch(spot)
    comfyTerm.setComfyLand(comfyLand)

    const { goblin } = spot

    const mousey = new Mousey(goblin)
    const xterm = document.getElementById('xterm')

    xterm.onwheel = (event) => {
      mousey.onWheel(event)
    }

    term.open(xterm)

    // can't load webgl addon at the top with the other addons, must happen after .open()
    
    // this looks bad with gandalf rendering
    //const webglAddon = new WebglAddon()
    //term.loadAddon(webglAddon)

    mousey.attach()

    {
      // i hate this but i don't have a better idea
      const { char_w, char_h } = mousey
      window.comfy_char_w = char_w
      window.comfy_char_h = char_h
    }

    if (config === null) {
      comfyLand.start()
    }
    else {
      comfyLand.startWithConfig(config)
    }

    
    term.onResize((event) => {
      mousey.onResize(event)
      const { rows, cols } = event
      const r = new Rectangle(rows, cols, 1, 1)
      comfyLand.setBounds(r)
      spot.bounds = r
      // i hate this but i don't have a better idea
      const { char_w, char_h } = mousey
      window.comfy_char_w = char_w
      window.comfy_char_h = char_h
    }); 
    
    const invisible = '#00000000'
    term.setOption('theme', { selection: invisible })
    term.onSelectionChange((event) => {
      const r = 1
      const c = 1
      const n = 0
      term.select(r, c, n)
    })

    window.onresize = () => {
      fitAddon.fit()
      // i hate this but i don't have a better idea
      const { char_w, char_h } = mousey
      window.comfy_char_w = char_w
      window.comfy_char_h = char_h
    }
    fitAddon.fit()

    const fWrite = (text, andThen) => {
      comfyTerm.writeRaw(text, andThen)
    }

    function step() {
      comfyLand.render(fWrite, () => {
        window.requestAnimationFrame(step)
      })
    }
    window.requestAnimationFrame(step)
  }

  exports.initTerminal = initTerminal

}).call(this)
