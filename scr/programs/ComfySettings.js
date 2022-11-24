(function() {

  const { Dagger } = require('../daggers')
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')
  const { Link, Label, Box, TextInput } = require('../tui/things')
  const { ScrollFrame, SimpleFrame } = require('../tui/frame_things')
  const { TuiThing, Rectangle } = require('../tui/tui')
  const { C, ColourRGB, FullColour, rst } = require('../colour')
  const { SimpleRay } = require('../tui/simple_plot')
  const { save, retrieve, cacheKeys } = require('../cache')

  const config = new ProgramConfig()
  config.cmds = ['settings']

  const padw  = '    '
  const padw2 = '                '
  const padw3 = '  '

  const fc_heading = new FullColour(C.white, C.bg_green)
  const fc_branch = new FullColour(C.yellow, C.dark_brown)
  const fc_text = new FullColour(C.white, C.dark_brown)
  
  const tab_order = []
  let tab_i = 0

  class FormInputBox extends TextInput {
    constructor(tui, cache_key, field_id) {
      super(tui, C.white, C.dark_brown, C.yellow, C.dark_brown)

      tab_order.push(this)
      this.cache_key = cache_key
      this.field_id = field_id
    }

    onEnter() {
      this.processInput()
      this.tui.root.onTab()
    }

    processInput() {
      const line = this.chars
      const trimmed = line.trim()
      const { cache_key } = this
      save(cache_key, trimmed, () => {
        //console.log("SAVED")
      })
    }

    onData(data) {
      super.onData(data)
      this.processInput()
    }

    backspace() {
      super.backspace()
      this.processInput()
    }

    deleteKey() {
      super.deleteKey()
      this.processInput()
    }

    onSavedData(o) {
      this.setText(o)
    }
  }

  class FormInputLine extends TuiThing {
    constructor(tui, prompt, min_width, form_id) {
      super(tui)

      const cache_key = `${form_id}.${prompt}`

      this.min_width = min_width
      this.form_id = form_id
      const x = min_width - prompt.length
      const pad = x <= 0 ? 0 : ' '.repeat(x)
      const p_char = ': '; 
      this.pad_n = pad.length + padw3.length + padw.length + p_char.length

      const s = `${pad}${padw3}${fc_branch.ansi}${padw}${prompt}${p_char}`
      this.prompt = new Label(tui, s, prompt.length + this.pad_n)
      this.prompt_text = prompt
      this.ray = new SimpleRay(tui, C.dark_brown)
      this.input = new FormInputBox(tui, cache_key, prompt)

      this.addNode(this.prompt)
      this.addNode(this.ray)
      this.addNode(this.input)

      retrieve(cache_key, (o) => {
        this.input.onSavedData(o)
      }, () => {
        console.log("not found", cache_key)
      })

      this.tuiFocusedDagger = new Dagger('FormInputLine')
      this.tuiFocusedDagger.emenations = {
        'onClick': (o) => {
          if (this.hitTest(o.row, o.col)) {
            this.tui.root.focusOn(this.input)
          }
        }
      }

    }

    onResize() {
      const { bounds, prompt, ray, input } = this
      const { copy: r } = bounds
      const r_prompt = r.removeFromLeft(prompt.length)
      prompt.setBounds(r_prompt)

      input.setBounds(r)

      const w2 = Math.floor(r.cols / 2)
      r.removeFromRight(w2); 
      ray.setBounds(r)
    }
  }

  class TreeBranchHeading extends TuiThing {
    constructor(tui, text) {
      super(tui)
      const ansi = `${fc_heading.ansi}${padw}${text}${padw2}${rst}`
      this.label = new Label(tui, ansi)
      this.addNode(this.label)
    }

    onResize() {
      this.label.setBounds(this.bounds)
    }
  }

  class TreeBranchRight extends TuiThing {
    constructor(tui, website) {
      super(tui)
      this.text = website
      this.length = website.length
      const ansi = `${fc_branch.ansi}${website}${rst}`
      this.label = new Link(tui, ansi, website)
      this.addNode(this.label)
      this.ray = new SimpleRay(tui, C.dark_brown)
      this.addNode(this.ray)
    }

    onResize() {
      const { bounds, length, label, ray } = this
      const { copy: r, cols: width } = bounds
      const r_label = r.removeFromRight(length)
      if (!r_label.isPositive) {
        return
      }
      r_label.rows = 1
      label.setBounds(r_label)
      
      if (!r.isPositive || width <= length) {
        return
      }
      ray.setBounds(r)
    }
  }

  class TreeForm extends TuiThing {
    constructor(tui, form, form_id) {
      super(tui)
      this.form = form
    
      const min_width = 13

      this.branches = Object.keys(form).map((x) => {
        return new FormInputLine(tui, x, min_width, form_id)
      })
      this.branches.forEach((x) => {
        this.addNode(x)
      })
    }

    onResize() {
      const { bounds, branches } = this
      const { copy: r } = bounds
      
      branches.forEach((x) => {
        x.setBounds(r.removeFromTop(2))
      })
    }
  }

  class TreeSection extends TuiThing {
    constructor(tui, section) {
      super(tui)
      const { text, form_id, form, access } = section

      this.section = section
      this.heading = new TreeBranchHeading(tui, text)
      this.addNode(this.heading)
      
      this.form_id = form_id
      this.form = new TreeForm(tui, form, form_id)
      this.addNode(this.form)
      
      this.access = new TreeBranchRight(tui, access)
      this.addNode(this.access)

    }

    onResize() {
      const { bounds, heading, form, access } = this
      const { copy: r } = bounds
      heading.setBounds(r.removeFromTop(2))
      
      r.removeFromLeft(3)
      form.setBounds(r.removeFromTop(4))

      const w2 = Math.floor(r.cols / 2)
      const w7 = Math.floor(r.cols / 7)
      r.removeFromRight(w7)
      r.removeFromLeft(w2)
      access.setBounds(r)
    }
  }

  class TreeSections extends TuiThing {
    constructor(tui, sections) {
      super(tui)
      /* section: "gigablast": {
           "text": "Gigablast search API",
           "form_id": "gigablast_api_key",
           "form": {
             "userid": "55555",
             "code": "777777777777"
           },
           "access": "https://www.gigablast.com/api.html"  
         },
      */
      this.sections = []
      this.aHeadings = Object.keys(sections)
      this.aHeadings.forEach((heading) => {
        const section = sections[heading]

        const o = new TreeSection(tui, section)
        this.sections.push(o)
        this.addNode(o)
      })

    }

    onResize() {
      const { bounds, sections } = this
      const { copy: r } = bounds

      
      sections.forEach((section) => {
        const height = 10
        section.setBounds(r.removeFromTop(height))
      })
    }
  }

  class ApiSettings extends TuiThing {
    constructor(tui) {
      super(tui)
      
      this.heading = new Box(tui, ' ', C.bg_green.bg_ansi)
      this.addNode(this.heading)
      
      const heading_text = `${fc_heading.ansi} * * * API SETTINGS * * *`
      this.headingLabel = new Label(tui, heading_text)
      this.addNode(this.headingLabel)
      
      this.trunk = new Box(tui, ' ', C.dark_brown.bg_ansi)
      this.addNode(this.trunk)

      this.sections = new TreeSections(tui, {
        "justgo": {
          "text": "justgo",
          "form_id": cacheKeys.justgo_aliases,
          "form": {
            "mail": "",
            "amazon": "https://www.amazon.com/",
            "ebay": "https://www.ebay.com/",
          },
          "access": ""
        },
        "gigablast": {
          "text": "Gigablast search API",
          "form_id": cacheKeys.gigablast_api_key,
          "form": {
            "userid": "",
            "code": ""
          },
          "access": "https://www.gigablast.com/api.html"  
        },
        "binance": {
          "text": "Binance API",
          "form_id": cacheKeys.binance_api_key,
          "form": {
            "api_key": "",
            "api_secret": ""
          },
          "access": "https://www.binance.com/en/support/articles/360002502072"  
        },
        "coinmarketcap": {
          "text": "coinmarketcap.com API",
          "form_id": cacheKeys.coinmarketcap_api_key,
          "form": {
            "key": "",
          },
          "access": "https://coinmarketcap.com/api/documentation/v1/"
        },
        "coinmarketcal": {
          "text": "coinmarketcal.com API",
          "form_id": cacheKeys.coinmarketcal_api_key,
          "form": {
            "key": "",
          },
          "access": "https://coinmarketcal.com/en/api"
        },
        "coinapi_io": {
          "text": "coinAPI.io",
          "form_id": cacheKeys.coinapi_io_api_key,
          "form": {
            "key": "",
          },
          "access": "https://docs.coinapi.io/"
        },
        "openai": {
          "text": "OpenAI API",
          "form_id": cacheKeys.openai_api_key,
          "form": {
            "organization": "",
            "key": "",
          },
          "access": "https://beta.openai.com/docs/introduction"
        },
        
      })
      this.addNode(this.sections)

      this.onResize()

    }

    onResize() {
      const { heading, headingLabel, trunk, bounds, 
        sections } = this
      const { copy: r } = bounds
      
      r.removeFromTop(1)
      
      const r_heading = r.removeFromTop(3)
      const heading_cut = Math.floor(r_heading.cols / 8)
      r_heading.removeFromLeft(heading_cut)
      r_heading.removeFromRight(heading_cut)
      heading.setBounds(r_heading)

      r_heading.removeFromTop(1)
      r_heading.removeFromLeft(3)
      headingLabel.setBounds(r_heading)

      const { copy: r_trunk } = r
      const w3 = Math.floor(r.cols / 3)
      r_trunk.removeFromLeft(w3)
      r_trunk.removeFromRight(w3)
      trunk.setBounds(r_trunk)

      r.removeFromTop(1)
      const w5 = Math.floor(r.cols / 5)
      r.removeFromLeft(w5)
      r.removeFromRight(w5)

      sections.setBounds(r)


    }
  }



  class ScrollFrameView extends TuiThing {
    constructor(tui) {
      super(tui)
      this.apiSettings = new ApiSettings(tui)
      this.addNode(this.apiSettings)
    }

    onResize() {
      const { bounds, apiSettings } = this
      apiSettings.setBounds(bounds)
    }

  }

  class MyFrame extends SimpleFrame {
    constructor(tui) {
      super(tui)

      tab_order.length = 0

      this.tui.cursorShouldShow = false
      this.scrollView = new ScrollFrameView(tui)
      this.scrollFrame = new ScrollFrame(tui, this.scrollView)
      this.addNode(this.scrollFrame)
      
      this.scrollFrame.viewSize.rows = 80
      
      this.tuiFocusedDagger = new Dagger('ComfySettings')
      this.tuiFocusedDagger.emenations = {
        'ArrowDown': (event) => {
          this.onTab()
          //this.tui.comfyProgram.exit()
        },
        'ArrowUp': (event) => {
          this.onBackTab()
          //this.tui.comfyProgram.exit()
        },
        'Escape': (event) => {
          this.tui.comfyProgram.exit()
        },
      }

      if (tab_order.length > 0) {
        tab_order.forEach((x) => x.blur())
        tab_order[0].focus()
      }
    }
    
    onResize() {
      super.onResize()
      //console.log('MyFrame.onResize', this.bounds)
      const { bounds, scrollFrame } = this
      const { copy: r } = bounds
      const { cols } = r
      scrollFrame.viewSize.cols = cols
      scrollFrame.setBounds(r)
    }

    focusOn(o) {
      tab_order.forEach((x, i) => {
        if (x === o) {
          x.focus()
          tab_i = i
        }
        else {
          x.blur()
        }
      })

      this.tui.spot.blur()
      this.tui.spot.focus()
    }

    onTab() {
      const { length: n } = tab_order
      tab_i = (tab_i + 1) % n
      const current = tab_order[tab_i]
      this.focusOn(current)
      }

    onBackTab() {
      const { length: n } = tab_order
      tab_i = (tab_i - 1) % n
      if (tab_i < 0) {
        tab_i = n - 1
      }
      const current = tab_order[tab_i]
      this.focusOn(current)
    }

  }

  class ComfySettingsLauncher extends ProgramLauncher {
    onCmd(cmd, argv, spot) {
      this.launch(spot).start()
    }
  }

  class ComfySettings extends Program {
    constructor(spot) {
      super("ComfySettings", spot, MyFrame)
    }
  }

  exports.programLauncher = new ComfySettingsLauncher(ComfySettings, "ComfySettings")
  exports.config = config

}).call(this);