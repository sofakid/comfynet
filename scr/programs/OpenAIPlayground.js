(function() {
  const { Dagger } = require('../daggers')
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')
  const picasso = require('../picasso')
  const { clear_cache } = require('../cache')

  const openai = require('../apis/openai')

  const { TuiLine, TuiThing } = require('../tui/tui')
  const { TextInput, Label } = require('../tui/things')
  const { SimpleFrame, ScrollFrame } = require('../tui/frame_things')

  // const { Configuration, OpenAIApi } = require("openai")

  // function tryoutOpenAiApi() {
  //   const configuration = new Configuration({
  //       organization: "YOUR_ORG_ID",
  //       key: "x",
  //   })
  
  //   const openai = new OpenAIApi(configuration);
  //   //const response = await openai.listEngines();
  // }

  const {
    ComfyUrl,
    ComfySearchTerms,
    ComfyCommand,
    ComfyError_CommandNotFound
  } = require('../comfy_objects')

  const config = new ProgramConfig()
  config.cmds = ['ai']
  
  const nl = '\r\n'

  // ------------------------------------------------------------------------

  class AiPlaygroundBuffer extends TuiThing {
    constructor(tui, fResizeView, fScrollToBottom) {
      super(tui)
      this.content = ''
      this.n_lines = 0
      this.resizeView = fResizeView
      this.scrollToBottom = fScrollToBottom

      const dagger = new Dagger('AiPlaygroundBuffer')
      this.programFocusedDagger = dagger
      this.programBlurredDagger = dagger

      dagger.emenations = {
        'stdout': (text) => {
          this.addContent(text)
          this.updateSize()
          return true
        },
        'stderr': (text) => {
          const { c } = picasso
          const esc = '\x1b'
          const red = `${esc}[${c.bold};${c.red}m`
          const rst = `${esc}[m`
          const msg = `${red}${text}${rst}${nl}`
          this.addContent(msg)
          this.updateSize()
          return true
        },
      }
    }

    updateSize() {
      const roomForPrompt = 1
      this.resizeView(this.n_lines + roomForPrompt, this.bounds.cols)
    }

    addContent(text) {
      this.content += text
      const lines = this.content.split(/\r?\n/)
      let n = lines.length

      if (lines[n - 1].length === 0) {
        --n
      }
      this.n_lines = n
    }

    onRender(f) {
      const { row, col } = this.bounds
      const lines = this.content.split(/\r?\n/)
      const tuiLines = lines.map((x, i) => new TuiLine(row + i, col, x))
      f(tuiLines)
    }

    onResize() {
    }

    // --- internal commands --------------------------------------
    cls() {
      this.n_lines = 0
      this.content = ''
      const roomForPrompt = 1
      this.resizeView(roomForPrompt, this.bounds.cols)
    }

    models() {
      openai.model_ids(
        (o) => {
          console.log("models command response", o)
          this.addContent(o.join('\r\n') + "\r\n")
          this.updateSize()
          this.scrollToBottom()
          //this.tui.makeDirty()
        },
        (error) => {
          console.error(error)
        }
      )
    }

    completions(prompt) {
      openai.completions(
        {
          model: 'text-davinci-002',
          prompt: prompt,
          max_tokens: 200,
          temperature: 0.7,
        },
        (o) => {
          console.log("completions command response", o)
          this.addContent(`${o}\r\n`)
          this.updateSize()
          this.scrollToBottom()
        },
        (error) => {
          console.error(error)
        }
      )
    }

  }

  // ------------------------------------------------------------------------
  let prompties = 0
  class AiPlaygroundPrompt extends Label {
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
      this.content = `${c.hi_cyan}${this.text}${c.green}>${c.yellow}>${c.hi_green}>${c.rst} `
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
  class AiPlaygroundInput extends TextInput {
    constructor(tui, promptThing, fResizeView, fScrollToBottom, fInternalCommands, fSubmitText) {
      super(tui)
      this.iShell = iShells++
      this.promptThing = promptThing
      this.resizeView = fResizeView
      this.scrollToBottom = fScrollToBottom
      this.internalCommands = fInternalCommands
      this.submitText = fSubmitText

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

    // --- internal commands --------------------------------------
    cls() {
      this.history.length = 0
      this.historyPos = 0
      this.justTyping = ''
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

      
      const didParse = this.parsed(line)
      if (!didParse) {
        console.log("send this line to bot", line)
        this.submitText(line)
      }

      this.scrollToBottom()
      return true
    }

    parsed(x) {
      const s = x.trim()
      switch (s) {
        case '':
          return true
        case 'cls':
        case 'models':
          this.internalCommands(s, null)
          //this.scrollToBottom()
          return true
      }
    
      return false
    }
  }

  // ------------------------------------------------------------------------

  class AiPlaygroundWindow extends TuiThing {
    constructor(tui, fResizeView, fScrollToBottom, fInternalCommands, fSubmitText) {
      super(tui)

      this.buffer = new AiPlaygroundBuffer(tui, fResizeView, fScrollToBottom)
      this.prompt = new AiPlaygroundPrompt(tui, 'ai');   
      this.input = new AiPlaygroundInput(tui, this.prompt, fResizeView, fScrollToBottom, fInternalCommands, fSubmitText);  

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

    setPrompt(text) {
      this.prompt.setPrompt(text)
    }

    submitText(text) {
      this.buffer.completions(text)
    }

    // --- internal commands ------------------------------------ 
    cls() {
      this.buffer.cls()
      this.input.cls()
    }

    models() {
      this.buffer.models()
    }
  }

  // ------------------------------------------------------------------------

  class AiPlaygroundFrame extends SimpleFrame {
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

      const fSubmitText = (text) => {
        this.submitText(text)
      }


      this.mainWindow = new AiPlaygroundWindow(tui, fResizeView, fScrollToBottom, fInternalCommands, fSubmitText)
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
          this.mainWindow.cls()
          break
        }
        case 'models': {
          this.mainWindow.models()
        }
      }
    }

    submitText(text) {
      this.mainWindow.submitText(text)
    }

    setPrompt(text) {
      this.mainWindow.setPrompt(text)
    }

  }  

  // --- Program ------------------------------------------------------

  class AiPlaygroundProgramLauncher extends ProgramLauncher {
    onCmd(cmd, argv, spot) {
      this.launch(spot).start()
    }
  }

  class AiPlaygroundProgram extends Program {
    constructor(spot) {
      super("AiPlayground", spot, AiPlaygroundFrame)
    }

    setPrompt(text) {
      this.tuiRoot.setPrompt(text)
    } 
  }

  exports.programLauncher = new AiPlaygroundProgramLauncher(AiPlaygroundProgram, "AiPlayground")
  exports.config = config

}).call(this);