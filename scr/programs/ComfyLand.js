    
(function() {
  const { Dagger } = require('../daggers')
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')
  const { ansiColours } = require('../picasso')
  const { TuiLine, TuiThing } = require('../tui/tui'); 
  const { Box, Label } = require('../tui/things'); 
  const { FullscreenFrame } = require('../tui/frame_things'); 
  const { Soul, WindowList } = require('../layouter')
  
  const { programLauncher: comfyShellLauncher } = require('./ComfyShell')
  
  const cmds = {
    comfyland: 'comfyland',
  }
  
  const config = new ProgramConfig()
  config.cmds = Object.values(cmds)
  
  const nl = '\r\n'

  // ------------------------------------------------------------------------
  class ComfyLandStatusBar extends Label {
    constructor(tui) {
      super(tui)
      this.colour = `${ansiColours.white}${ansiColours.bg_blue}`
    }

    onResize() {
      const r = this.bounds
      const text = ' '.repeat(r.cols); 
      this.text = `${this.colour}${text}${ansiColours.rst}`
    }
  }

  class ColourScheme {
    constructor() {
      this.focused_fg = ''
      this.focused_bg = ''
      this.blurred_fg = ''
      this.blurred_bg = ''
      this.highlighted_fg = ''
      this.highlighted_bg = ''
    }

    getFgBg(isHighlighted, isFocused) {
      if (isHighlighted) {
        return [ this.highlighted_fg, this.highlighted_bg ]
      }
      if (isFocused) {
        return [ this.focused_fg, this.focused_bg ]
      }
      return [ this.blurred_fg, this.blurred_bg ]
    }

    getColour(isHighlighted, isFocused) {
      const [ fg, bg ] = this.getFgBg(isHighlighted, isFocused)
      return `${fg}${bg}`
    }
  }

  class Rune extends TuiThing {
    constructor(tui, text, colourScheme) {
      super(tui)
      this.text = text
      this.colourScheme = colourScheme
      this.isHighlighted = false

      const dagger = new Dagger(`Rune <${text}>`)
      dagger.emenations = {
        'onMousePos': (mouseyEvent) => {
          const { row, col } = mouseyEvent
          if (this.hitTest(row, col)) {
            this.makeHighlighted()
          }
          else {
            this.makeNotHighlighted()
          }
        }
      }
      this.tuiFocusedDagger = dagger
      this.tuiBlurredDagger = dagger
    }

    get dagger() {
      return this.tuiFocusedDagger
    }

    makeHighlighted() {
      const last = this.isHighlighted
      this.isHighlighted = true
      if (last === false) {
        this.tui.makeDirty()
      }
    }

    makeNotHighlighted() {
      const last = this.isHighlighted
      this.isHighlighted = false
      if (last === true) {
        this.tui.makeDirty()
      }
    }

    onRender(f) {
      const { text, colourScheme: cs, bounds } = this
      const { row, col } = bounds
      const { rst } = ansiColours

      const { hasFocus } = this.parent.comfyWindow.program.spot.tui
      const colour = cs.getColour(this.isHighlighted, hasFocus)
      
      f([new TuiLine(row, col, `${colour}${text}${rst}`)])
    }
  }

  // ------------------------------------------------------------------------
  class ComfyWindowDressings extends TuiThing {
    constructor(tui, comfyWindow, frame) {
      super(tui)
      this.frame = frame
      this.comfyWindow = comfyWindow
      this.title = ''

      const cs = new ColourScheme()
      cs.focused_fg = ansiColours.hi_yellow
      cs.focused_bg = ansiColours.bg_blue
      cs.blurred_fg = ansiColours.white
      cs.blurred_bg = ansiColours.bg_hi_black
      cs.highlighted_fg = ansiColours.black
      cs.highlighted_bg = ansiColours.bg_hi_yellow
      this.colourScheme = cs

      this.minusRune = new Rune(tui, ' - ', cs)
      this.barRune = new Rune(tui, ' | ', cs)
      this.whirlRune = new Rune(tui, ' @ ', cs)
      this.ampRune = new Rune(tui, ' & ', cs)
      this.oRune = new Rune(tui, ' o ', cs)
      this.underscoreRune = new Rune(tui, ' _ ', cs)
      this.plusRune = new Rune(tui, ' + ', cs)
      this.xRune = new Rune(tui, ' x ', cs)

      this.addNodeAndDagger(
        this.minusRune,
        this.barRune,
        this.whirlRune,
        this.ampRune,
        this.oRune,
        this.underscoreRune,
        this.plusRune,
        this.xRune  
      )

      this.init_splitRunes()
      this.init_whirlRune()
      this.init_ampRune()
      this.init_oRune()
      this.init_xRune()
    }

    init_splitRunes() {
      const { frame, minusRune, barRune, comfyWindow } = this
      const { emenations: minusEmenations } = minusRune.dagger
      const { emenations: barEmenations } = barRune.dagger
      
      minusEmenations['onClick'] = (mouseyEvent) => {
        const { row, col } = mouseyEvent
        if (minusRune.hitTest(row, col)) {
          frame.splitH(comfyWindow)
          return true
        }
        return false
      }

      barEmenations['onClick'] = (mouseyEvent) => {
        const { row, col } = mouseyEvent
        if (barRune.hitTest(row, col)) {
          frame.splitV(comfyWindow)
          return true
        }
        return false
      }

    }
    
    init_whirlRune() {
      const { frame, whirlRune } = this
      const { emenations } = whirlRune.dagger
      
      emenations['onClick'] = (mouseyEvent) => {
        const { row, col, event } = mouseyEvent
        if (whirlRune.hitTest(row, col)) {
          const { shiftKey: reverse } = event
          frame.whirlWindows(reverse)
          return true
        }
        return false
      }

    }

    init_ampRune() {
      const { frame, tui, ampRune } = this

      let startRow = 0
      let startCol = 0
      let ampRuneDragging = false

      const { emenations } = ampRune.dagger
      
      emenations['onClick'] = (mouseyEvent) => {
        const { row, col } = mouseyEvent
        if (!ampRuneDragging && ampRune.hitTest(row, col)) {
          const { chakra: win_chakra } = this.comfyWindow
          if (!win_chakra) {
            console.error("no chakra", win_chakra)
            return
          }

          const v_chakra = win_chakra.findVerticalShiftyChakra()
          if (v_chakra) {
            v_chakra.v_shift = startRow = 0
          }

          const h_chakra = win_chakra.findHorizontalShiftyChakra()
          if (h_chakra) {
            h_chakra.h_shift = startCol = 0
          }

          frame.onResize()
          tui.makeDirty()
        }
      }

      emenations['onDragStart'] = (mouseyEvent) => {
        const { row, col } = mouseyEvent
        if (ampRune.hitTest(row, col)) {
          ampRuneDragging = true

          const { chakra: win_chakra } = this.comfyWindow
          if (!win_chakra) {
            console.error("no chakra", win_chakra)
            return
          }

          const v_chakra = win_chakra.findVerticalShiftyChakra()
          startRow = v_chakra ? v_chakra.v_shift : 0

          const h_chakra = win_chakra.findHorizontalShiftyChakra()
          startCol = h_chakra ? -h_chakra.h_shift : 0
        }
      }

      emenations['onDragPos'] = (mouseyEvent) => {
        if (ampRuneDragging) {
          const { row: dr, col: dc } = mouseyEvent
  
          //console.log(`ampRune <${dr}, ${dc}>`)

          const { chakra: win_chakra } = this.comfyWindow
          if (!win_chakra) {
            console.error("no chakra", this.comfyWindow)
            return
          }

          // console.log("FUN TIME", win_chakra)
          const h_chakra = win_chakra.findHorizontalShiftyChakra()
          const v_chakra = win_chakra.findVerticalShiftyChakra()
          
          if (v_chakra) {
            const r = startRow + dr; 
            v_chakra.v_shift = r
          }

          if (h_chakra) {
            const c = startCol - dc; 
            h_chakra.h_shift = -c
          }
          
          frame.onResize()
          tui.makeDirty()
        }
      }

      emenations['onDragEnd'] = (mouseyEvent) => {
        ampRuneDragging = false
        const { row: dr, col: dc } = mouseyEvent
        startRow += dr; 
        startCol -= dc; 
      }
    }


    init_oRune() {
      const { frame, tui, oRune } = this

      const defaultPadRow = 3
      const defaultPadCol = 6

      let startRow = 0
      let startCol = 0
      let oRuneDragging = false

      const { emenations } = oRune.dagger

      emenations['onClick'] = (mouseyEvent) => {
        const { row, col } = mouseyEvent
        if (!oRuneDragging && oRune.hitTest(row, col)) {
          
          if (frame.windowPaddingRow !== defaultPadRow || 
              frame.windowPaddingCol !== defaultPadCol
          ) {
            frame.windowPaddingRow = defaultPadRow
            frame.windowPaddingCol = defaultPadCol
          }
          else {
            frame.windowPaddingRow = 0
            frame.windowPaddingCol = 0
          }
      
          frame.onResize()
          tui.makeDirty()
        }
      }

      emenations['onDragStart'] = (mouseyEvent) => {
        const { row, col } = mouseyEvent
        if (oRune.hitTest(row, col)) {
          startRow = frame.windowPaddingRow
          startCol = frame.windowPaddingCol
          oRuneDragging = true
        }
      }

      emenations['onDragPos'] = (mouseyEvent) => {
        if (oRuneDragging) {
          const { row: dr, col: dc } = mouseyEvent
  
          //console.log(`oRune <${dr}, ${dc}>`)
          const r = startRow + dr; 
          frame.windowPaddingRow = Math.max(0, r)
  
          const c = startCol - dc; 
          frame.windowPaddingCol = Math.max(0, c)
          frame.onResize()
          tui.makeDirty()
        }
      }

      emenations['onDragEnd'] = (mouseyEvent) => {
        oRuneDragging = false
      }
    }

    init_xRune() {
      const { frame, xRune, comfyWindow } = this
      const { emenations } = xRune.dagger
      
      emenations['onClick'] = (mouseyEvent) => {
        const { row, col } = mouseyEvent
        if (xRune.hitTest(row, col)) {
          frame.killWindow(comfyWindow)
          return true
        }
        return false
      }

    }

    // -------------------------------------------------

    onRender(f) {
      const { title, bounds, colourScheme } = this
      const { row, col, cols } = bounds
      const { rst } = ansiColours
      const notHighlighted = false
      const { hasFocus } = this.comfyWindow.program.spot.tui
      const colour = colourScheme.getColour(notHighlighted, hasFocus)
      const n = title.length
      const m = cols - n
      
      const pad = m > 0 ? ' '.repeat(m) : ''

      f([new TuiLine(row, col, `${colour}${title}${pad}${rst}`)])
    }

    onResize() {
      const { 
        minusRune, barRune, whirlRune, ampRune,
        oRune, underscoreRune, plusRune, xRune,
        bounds } = this
      const { copy: r } = bounds
      
      const runeWidth = 3
      xRune.setBounds(r.removeFromRight(runeWidth))
      plusRune.setBounds(r.removeFromRight(runeWidth))
      underscoreRune.setBounds(r.removeFromRight(runeWidth))
      oRune.setBounds(r.removeFromRight(runeWidth))
      ampRune.setBounds(r.removeFromRight(runeWidth))
      whirlRune.setBounds(r.removeFromRight(runeWidth))
      barRune.setBounds(r.removeFromRight(runeWidth))
      minusRune.setBounds(r.removeFromRight(runeWidth))
    }
  }

  // ------------------------------------------------------------------------
  class ComfyLandWindow extends TuiThing {
    constructor(tui, launcher, frame, additionalPrograms, prompt) {
      super(tui)
      this.chakra = null
      this.dressings = new ComfyWindowDressings(tui, this, frame)
      this.addNode(this.dressings)

      this.program = launcher.launch(this.tui.spot, this.bounds)
      if (launcher instanceof comfyShellLauncher.constructor) {
        const { program: comfyShell } = this
        console.log("SETTING COMFYLAND", tui.comfyProgram)
        comfyShell.comfyLand = tui.comfyProgram

        comfyShell.start()

        additionalPrograms.forEach(comfyShell.installProgram)
        comfyShell.setPrompt(prompt)
      }
      else {
        this.program.start()
      }
      
      this.dressings.title = ` ${this.program.name} `
    }

    cleanup() {
      console.log('ComfyLandWindow.cleanup()')
      this.program.exit()
      this.chakra.destroy()
      this.chakra = null
      this.dressings = null
      this.program = null
      super.cleanup()
    }

    focus() {
      super.focus()
      //console.log('focusing', this.program.spot)
      this.program.spot.focus()
      this.tui.makeDirty()
    }

    blur() {
      super.blur()
      //console.log('blurring', this.program.spot)
      this.program.spot.blur()
      this.tui.makeDirty()
    }

    onResize() {
      const { bounds, dressings, program } = this
      const { copy: r } = bounds
      dressings.setBounds(r.removeFromTop(1))
      program.spot.setBounds(r)
    }
  }

  // ------------------------------------------------------------------------
  class ComfyLandDesktop extends TuiThing {
    constructor(tui) {
      super(tui)
      const light_shade = '\u2591'
      const med_shade = '\u2592'
      const dark_shade = '\u2593'
      const fg = ansiColours.green
      const bg = ansiColours.bg_black

      const char = '.'
      this.wallpaper = new Box(tui, char, [fg, bg])
      this.addNode(this.wallpaper)
    }

    onResize() {
      const { bounds, wallpaper } = this
      const { copy: r } = bounds
      wallpaper.setBounds(r)
    }
  }

  // ------------------------------------------------------------------------
  class ComfyLandFrame extends FullscreenFrame {
    constructor(tui) {
      super(tui)

      this.lastFocus = null

      this.soul = new Soul()

      this.desktop = new ComfyLandDesktop(tui)
      this.windowList = new WindowList()
      this.shellLauncher = comfyShellLauncher
      this.additionalPrograms = []
      this.prompt = 'comfynet'
      
      this.windowPaddingRow = 0
      this.windowPaddingCol = 0

      this.statusBar = new ComfyLandStatusBar(tui)

      this.addNode(this.desktop)
      this.addNode(this.statusBar)

      this.tuiFocusedDagger = new Dagger('Box')
      this.tuiFocusedDagger.emenations = {
        'onClick': (o) => {
          console.log("ComfyLandFrame.tuiFocusedDagger.onClick")
          this.windowList.forEach((w) => {
            if (w.hitTest(o.row, o.col)) {
              if (w !== this.lastFocus) {
                this.blur()
                this.lastFocus = w
              }
              w.focus()
            }
          })
          this.tui.autoDagger()
        }
      }
    }

    addShellWindow() {
      const { tui, shellLauncher, additionalPrograms, prompt } = this
      console.log("Making a new shell", shellLauncher)
      const w = new ComfyLandWindow(tui, shellLauncher, this, additionalPrograms, prompt)
      this.windowList.push(w)
      this.addNodeAndDagger(w)
      this.lastFocus = w
      this.blur()
      this.focus()
      this.rechakra()
    }

    rechakra() {
      this.soul.autoChakra_monocle(this.windowList)
    }

    killWindow(comfyWindow) {
      const { soul, tui, windowList } = this
    
      soul.dump()
      console.log(" === KILL KILL KILL ================ ")

      windowList.remove(comfyWindow)

      const yesAlsoClean = true
      this.removeNode(comfyWindow, yesAlsoClean)
      
      soul.applyChakras(windowList);      

      //soul.dump()

      

      this.onResize()
      tui.makeDirty()
    }

    _splitPrime(comfyWindow) {
      const { tui, soul, windowList, shellLauncher, additionalPrograms, prompt } = this
      const w = new ComfyLandWindow(tui, shellLauncher, this, additionalPrograms, prompt)
      windowList.insertBefore(comfyWindow, w)
      this.addNodeAndDagger(w)
      this.lastFocus = w
      this.blur()
      this.focus()
      soul.applyChakras(windowList)
      this.onResize()
    }

    splitH(comfyWindow) {
      comfyWindow.chakra.splitH()
      this._splitPrime(comfyWindow)
    }

    splitV(comfyWindow) {
      comfyWindow.chakra.splitV()
      this._splitPrime(comfyWindow)
    }

    whirlWindows(bReverse) {
      const { windowList, tui, soul } = this
      if (bReverse) {
        windowList.cycleReverse()
      }
      else {
        windowList.cycle()
      }
      soul.applyChakras(windowList)
      this.onResize()
      tui.makeDirty()
    }

    focus() {
      super.focus()
      const { lastFocus } = this
      if (lastFocus) {
        lastFocus.focus()
      }
    }

    blur() {
      super.blur()
      this.windowList.forEach((x) => {
        x.blur()
      })
    }

    onResize() {
      const { 
        bounds,
        windowPaddingRow: padRow, 
        windowPaddingCol: padCol, 
        windowList,
        desktop,
        statusBar,
        soul
      } = this

      const { copy: r } = bounds
      const rStatusBar = r.removeFromBottom(1)
      desktop.setBounds(r)
      statusBar.setBounds(rStatusBar)

      const options = {
        v_pad: padRow,
        h_pad: padCol,
      }

      const rects = soul.contemplate(r, options)

      if (windowList.length !== rects.length) {
        console.error("blehhhh", windowList, rects)
        return
      }

      windowList.forEach((w, i) => {
        w.setBounds(rects[i])
      })
      
    }
  }

  class ComfyLandLauncher extends ProgramLauncher {
    onCmd(cmd, args, spot) {
      console.log('COMFYLAND', cmd, args)
      if (cmd === cmds.comfyland) {

        return
      }
    }
  }

  // --- Program ------------------------------------------------------
  class ComfyLandProgram extends Program {
    constructor(spot) {
      super("ComfyLand", spot, ComfyLandFrame)
      this.dagger = new Dagger("ComfyLand Program")
      this.dagger.emenations = {
  
        'w': (event) => {
          if (event.ctrlKey === true) {
            window.close()
            return true
          }
          return false
        },
      }
    }

    blur() {
      // nop
      //
      // this doesn't feel right.
    }

    start() {
      console.log("ComfyLand starting normal")
      super.start()
      const { tuiRoot, spot } = this
      tuiRoot.addShellWindow()
      super.setBounds(spot.bounds)
    }

    startCustom(launcher) {
      console.log("ComfyLand starting custom", launcher)
      super.start()
      const { tuiRoot, spot } = this
      tuiRoot.shellLauncher = launcher
      tuiRoot.addShellWindow()
      super.setBounds(spot.bounds)
    }

    startWithConfig(cfg = {
      shellLauncher: null,
      additionalPrograms: null,
      prompt: 'cats'
    }) {
      console.log("ComfyLand starting with config", cfg)
      super.start()
      const { tuiRoot, spot } = this

      const { shellLauncher, additionalPrograms, prompt } = cfg
      if (shellLauncher)
        tuiRoot.shellLauncher = shellLauncher
      
      if (additionalPrograms)
        tuiRoot.additionalPrograms = additionalPrograms

      if (prompt)
        tuiRoot.prompt = prompt

      tuiRoot.addShellWindow()
      super.setBounds(spot.bounds)
    }

    render(writer, andThen) {

      const a = this.tui.render_collect()
      if (a.length !== 0) {
        //console.log("Rendering entire land")
        this.spot.makeDirty()
        this.tui.dirty = false
      }
      const b = this.spot.render_collect()
      
      const ab = a.concat(b)
      if (ab.length === 0) {
        andThen()
        return
      }
      //console.log('AB', ab, a, b)

      const esc = '\x1b'
      const position = (row, col) => `${esc}[${row};${col}f`
    
      const as = ab.map((x) => `${position(x.row, x.col)}${x.text}`)

      //console.log('AS', as)
      writer(as.join(''), andThen)
    }

    internalCommands(cmd, argv, spot) {
      switch (cmd) {
        case 'daggers':
          this.cmdDaggers(argv, spot)
          break
      }
    }

    cmdDaggers(argv, outputSpot) {
      const c = ansiColours
      const nl = '\r\n'
      const s = (x, i) => {
        const index = `  ${c.cyan}${i}${c.hi_black}: `
        const name = ` ${c.hi_green}${x.name} `
        const dashes = `${c.hi_black}-- `
        const emenations = x.emenations ? `${c.hi_blue}${Object.keys(x.emenations).join(', ')}` : ''
        const end = `${c.rst}${nl}`
        return `${index}${name}${dashes}${emenations}${end}`
      }
      
      const { goblin: outputGoblin } = outputSpot

      const printGoblin = (interestingGoblin) => {
        outputGoblin.onStdout(`${c.hi_cyan}daggers:${nl}`)
        interestingGoblin.daggers.forEach((x, i) => {
          outputGoblin.onStdout(s(x, i))
        })
      }

      this.spot.preorder_traverse((spt) => {
        printGoblin(spt.goblin)
      })
    }

  }

  exports.programLauncher = new ComfyLandLauncher(ComfyLandProgram, "ComfyLand")
  exports.config = config

}).call(this);