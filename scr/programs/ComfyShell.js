(function() {
  const { Dagger } = require('../daggers')
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')
  const comfyparser = require('../../build/comfyparser')
  const picasso = require('../picasso')
  const { clear_cache } = require('../cache')

  const { TuiLine, TuiThing } = require('../tui/tui')
  const { TextInput, Label } = require('../tui/things')
  const { SimpleFrame, ScrollFrame } = require('../tui/frame_things')
  const { Directory } = require('../load_programs')

  const {
    ComfyUrl,
    ComfySearchTerms,
    ComfyCommand,
    ComfyError_CommandNotFound
  } = require('../comfy_objects')

  const cmds = {
    shell: 'shell',
    setenv: 'setenv'
  }
  
  const config = new ProgramConfig()
  config.cmds = Object.values(cmds)
  
  const nl = '\r\n'
  // ------------------------------------------------------------------------
  
  class ComfyShellStatusBar extends Label {
    constructor(tui) {
      super(tui)
      const { ansiColours: c } = picasso
      this.colour = `${c.hi_white}${c.bg_blue}`
    }

    onResize() {
      const { bounds, colour } = this
      const { cols } = bounds
      const { rst } = picasso.ansiColours
      const text = ' '.repeat(cols); 
      this.text = `${colour}${text}${rst}`
    }
  }

  // ------------------------------------------------------------------------

  class ComfyShellBuffer extends TuiThing {
    constructor(tui, fResizeView) {
      super(tui)
      this.content = ''
      this.n_lines = 0
      this.resizeView = fResizeView

      const dagger = new Dagger('ComfyShellBuffer')
      this.programFocusedDagger = dagger
      this.programBlurredDagger = dagger

      dagger.emenations = {
        'stdout': (text) => {
          this.addContent(text)
          const roomForPrompt = 1
          fResizeView(this.n_lines + roomForPrompt, this.bounds.cols)
          return true
        },
        'stderr': (text) => {
          const { c } = picasso
          const esc = '\x1b'
          const red = `${esc}[${c.bold};${c.red}m`
          const rst = `${esc}[m`
          const msg = `${red}${text}${rst}${nl}`
          this.addContent(msg)
          const roomForPrompt = 1
          fResizeView(this.n_lines + roomForPrompt, this.bounds.cols)
          return true
        },
      }
    }

    addContent(text) {
      this.content += text
      const lines = this.content.split(/\r\n/)
      let n = lines.length

      if (lines[n - 1].length === 0) {
        --n
      }
      this.n_lines = n
    }

    onRender(f) {
      const { row, col } = this.bounds
      const lines = this.content.split(/\r\n/)
      const tuiLines = lines.map((x, i) => new TuiLine(row + i, col, x))
      f(tuiLines)
    }

    onResize() {
    }

    // --- internal commands --------------------------------------
    cls(argv) {
      this.n_lines = 0
      this.content = ''
      const roomForPrompt = 1
      this.resizeView(roomForPrompt, this.bounds.cols)
    }
  }

  // ------------------------------------------------------------------------
  let prompties = 0
  class ComfyShellPrompt extends Label {
    constructor(tui, text) {
      super(tui, text)
      this.prompty = prompties++
      this.content = ''
      this.setPrompt(text)
    }

    get desiredLength() {
      return this.text.length + '>>> '.length
    }

    setPrompt(text) {
      const { ansiColours: c } = picasso
      this.text = text
      this.content = `${c.hi_magenta}${this.text}${c.hi_black}>${c.hi_blue}>${c.hi_cyan}>${c.rst} `
      this.tui.makeDirty()
    }

    onRender(f) {
      //console.log(`render prompt ${this.prompty}`, this.bounds)
      f([new TuiLine(this.bounds.row, this.bounds.col, this.content)])
    }

    onResize() {
    }
  }

  // ------------------------------------------------------------------------

  let iShells = 0
  class ComfyShellInput extends TextInput {
    constructor(tui, promptThing, fResizeView, fScrollToBottom, fInternalCommands) {
      super(tui)
      this.directory = new Directory()
      this.iShell = iShells++
      this.promptThing = promptThing
      this.resizeView = fResizeView
      this.scrollToBottom = fScrollToBottom
      this.internalCommands = fInternalCommands

      this.history = []
      this.historyPos = 0
      this.justTyping = ''
    }

    // --- handlers ----------------------------------------------------------
    onData(data) {
      super.onData(data)
      this.scrollToBottom()
      return true
    }

    onEnter() {
      this.processLine()
    }

    arrowUp() {
      const { history } = this
      const i = --this.historyPos
      
      if (i < 0) {
        this.historyPos = 0
        return true
      }

      if (i >= history.length) {
        console.error('weird', i, history)
        return true
      }

      if (i === history.length - 1) {
        this.justTyping = this.chars
      }

      const line = this.history[i]
      this.chars = line
      this.pos = line.length
      this.reflow()
    }

    arrowDown() {
      const { history } = this
      const i = ++this.historyPos
      
      if (i >= history.length) {
        this.historyPos = history.length
        this.chars = this.justTyping
        this.pos = this.justTyping.length
        this.reflow()
        return true
      }

      if (i < 0) {
        console.error('weeird', i, history)
        this.historyPos = 0
        this.reflow()
        return true
      }

      const line = this.history[i]
      this.chars = line
      this.pos = line.length
      this.reflow()
    }

    // --- bubblers -----------------------------------------------
    installProgram(program) {
      this.directory.installProgram(program)
    } 
    
    // --- internal commands --------------------------------------
    cls(argv) {
      argv.forEach((x) => {
        console.log("cls arg", x)
        switch (x.text) {
          case 'everything':
          case 'history':
            this.history.length = 0
            this.historyPos = 0
            this.justTyping = ''
        }
      })
    }

    // --- processing ---------------------------------------------

    processLine() {
      // --- stdout to buffer --------
      const { content: prompt, desiredLength } = this.promptThing
      const pad = ' '.repeat(desiredLength)
      this.flow.forEach((x, i) => {
        const p = i === 0 ? prompt : pad
        this.tui.stdout(`${p}${x}${nl}`)
      })

      // --- eat the line ----------
      const line = this.consumeChars().trim()
      this.scrollToBottom()

      // --- history ----------------
      const { history } = this

      const skip = () => {
        if (line.length === 0) {
          return true
        }

        if (history.length > 0) {
          const last = history[history.length - 1]
          if (last === line) {
            return true
          }
        }
        
        return false
      }
        
      if (!skip()) {
        history.push(line)
        this.historyPos = history.length
      }
      this.justTyping = ''

      // --- parse -------------------------------
      try {
        const { directory } = this
        const { commands: programs } = directory
        const oConfig = { programs }
        const x = comfyparser.parse(line, oConfig)
        console.log("PARSED", x)
        this.onParsed(x)
        this.scrollToBottom()
      }
      catch (e) {
        if (e instanceof ComfyError_CommandNotFound) {
          console.log('Command not found, searching...')
          const x = new ComfySearchTerms(line)
          this.onParsed(x)
          this.scrollToBottom()

          return true
        }

        //console.error('processLine', e)
        this.scrollToBottom()
      }
      return true
    }

    onParsed(x) {
      if (x instanceof ComfyCommand) {

        // --- first try internal shell commands --------
        switch (x.cmd) {
          case 'help':
          case 'cls':
          case 'daggers':
          case 'clear_cache':
            this.internalCommands(x.cmd, x.argv)
            this.scrollToBottom()
            return
        }

        const program = this.directory.programsByCmd[x.cmd]

        console.log("this.directory.programsByCmd", this.directory.programsByCmd)
        console.log("x.cmd", x.cmd)
        console.log("Looked up program", program)

        if (program) {
          this.tui.comfyProgram.blur()
          program.onCmd(x.cmd, x.argv, this.tui.spot)
          return
        }
      }

      if (x instanceof ComfyUrl) {
        this.directory.programsByName.JustGo.goUrl(x.href, this.tui.spot)
        return
      }

      if (x instanceof ComfySearchTerms) {
        this.tui.comfyProgram.blur()
        this.directory.defaultSearchProgram.startSearch(x, this.tui.spot)
      }
    }
  }

  // ------------------------------------------------------------------------

  class ComfyShellWindow extends TuiThing {
    constructor(tui, fResizeView, fScrollToBottom, fInternalCommands) {
      super(tui)

      this.buffer = new ComfyShellBuffer(tui, fResizeView)
      this.prompt = new ComfyShellPrompt(tui, 'comfynet');   
      this.input = new ComfyShellInput(tui, this.prompt, fResizeView, fScrollToBottom, fInternalCommands);  

      this.addNode(this.buffer)
      this.addNode(this.prompt)
      this.addNode(this.input)
    }

    focus() {
      super.focus()
      this.input.focus()
    }

    blur() {
      super.blur()
      this.input.blur()
    }

    get desiredRows() {
      return this.buffer.n_lines + this.input.desiredRows
    }

    onResize() {
      const { input, buffer, prompt, bounds } = this
      const { copy: r } = bounds

      const roomForPrompt = input.desiredRows
      const maxBufferRows = r.rows - roomForPrompt

      const bufferRows = Math.min(buffer.n_lines, maxBufferRows)
      const rBuffer = r.removeFromTop(bufferRows)

      const { desiredLength: promptLength } = prompt
      const rPrompt = r.removeFromLeft(promptLength)

      buffer.setBounds(rBuffer)
      prompt.setBounds(rPrompt)
      input.setBounds(r)
    }

    // --- bubblers ---------------------------------------------
    installProgram(program) {
      this.input.installProgram(program)
    } 

    setPrompt(text) {
      this.prompt.setPrompt(text)
    }


    // --- internal commands ------------------------------------ 
    cls(argv) {
      this.buffer.cls(argv)
      this.input.cls(argv)
    }
  }

  // ------------------------------------------------------------------------

  class ComfyShellFrame extends SimpleFrame {
    constructor(tui) {
      super(tui)

      const fResizeView = (rows, cols) => {
        this.scrollFrame.resizeView(rows, cols)
      }

      const fScrollToBottom = () => {
        this.scrollFrame.scrollToBottom()
      }

      const fInternalCommands = (cmd, argv) => {
        this.internalCommands(cmd, argv)
      }

      this.mainWindow = new ComfyShellWindow(tui, fResizeView, fScrollToBottom, fInternalCommands)
      this.scrollFrame = new ScrollFrame(tui, this.mainWindow)
      
      this.addNode(this.scrollFrame)
      
      const { copy: r } = this.mainWindow.bounds
      r.rows = this.mainWindow.desiredRows
      this.mainWindow.setBounds(r)
      
    }

    focus() {
      super.focus()
      this.mainWindow.focus()
    }

    blur() {
      super.blur()
      this.mainWindow.blur()
    }

    onResize() {
      super.onResize()
      const { copy: r } = this.bounds
      this.scrollFrame.setBounds(r)
    }

    internalCommands(cmd, argv) {
      switch (cmd) {
        case 'cls': {
          this.mainWindow.cls(argv)
          break
        }
        case 'daggers': {
          this.tui.comfyProgram.comfyLand.internalCommands(cmd, argv, this.tui.spot)
          break
        }
        case 'clear_cache': {
          const { goblin } = this.tui.spot
          goblin.onStdout("Clearing Cache...\n")
          clear_cache()
          goblin.onStdout("done.\n")
        }
      }
    }

    // --- bubblers --------------------------------
    installProgram(program) {
      this.mainWindow.installProgram(program)
    } 

    setPrompt(text) {
      this.mainWindow.setPrompt(text)
    }

  }  

  // --- Program ------------------------------------------------------

  class ComfyShellProgramLauncher extends ProgramLauncher {
    onCmd(cmd, argv, spot) {
      if (cmd === cmds.shell) {

        return
      }

      if (cmd === cmds.setenv) {

        return
      }
    }
  }

  class ComfyShellProgram extends Program {
    constructor(spot) {
      super("ComfyShell", spot, ComfyShellFrame)
      this.comfyLand = null
      this.installProgram = this.installProgram.bind(this)
    }

    // --- bubblers -----------------------------------------------
    installProgram(program) {
      console.log('ComfyShellProgram.installProgram', program)
      this.tuiRoot.installProgram(program)
    } 

    setPrompt(text) {
      this.tuiRoot.setPrompt(text)
    } 
    
  }

  exports.programLauncher = new ComfyShellProgramLauncher(ComfyShellProgram, "ComfyShell")
  exports.config = config

}).call(this);