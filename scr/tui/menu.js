(function() {
  const { ansiColours } = require('../picasso')
  const { Dagger } = require('../daggers')
  const { Label } = require('../tui/things')
  const { TuiThing, TuiLine } = require('../tui/tui')
  
  class MenuOption extends Label {
    constructor(tui, prefix, trigger, suffix, eventNames = null, handler = null) {
      super(tui)
      const { hi_magenta, hi_white, white } = ansiColours

      let s = ''
      if (prefix) {
        s += `${hi_magenta}${prefix}`
      }
      s +=  `${white}[${hi_white}${trigger}${white}]${hi_magenta}${suffix}`
      this.text = s

      this.length = `${prefix ? prefix : ''}[${trigger}]${suffix}`.length
      
      const dagger = new Dagger('MenuOption')
      this.tuiFocusedDagger = dagger

      dagger.emenations = {}

      if (handler !== null) {

        dagger.emenations['onClick'] = (o) => {
          console.log(`menu option onclick(${o.row}, ${o.col})`)
          if (!this.cleanedup && this.hitTest(o.row, o.col)) {
            handler(o.event)
          }
        }

        if (eventNames !== null) {
          const a = eventNames instanceof Array ? eventNames : [eventNames]
          a.forEach((x) => {
            dagger.emenations[x] = handler; 
          })
        }
      }
    }
  }

  MenuOption.menuOptionerForTui = (tui) => (
    (prefix, trigger, suffix, eventName, handler) => (
      new MenuOption(tui, prefix, trigger, suffix, eventName, handler)
    )
  )
  
  class MenuLine extends TuiThing {
    constructor(tui, options) {
      super(tui)
      console.log('new MenuLine, tui', this.tui)
      this.options = options
      this.options.forEach((x) => {
        this.addNodeAndDagger(x)
      })

      this.preRendered = []
    }

    get desiredRows() {
      return this.preRendered.length
    }

    get textLength() {
      const n = this.options.length
      const seps = 3 * (n - 1)
      return seps + this.options.reduce((acc, val) => (acc + val.length), 0)
    }

    preRender() {
      const { hi_cyan, rst } = ansiColours
      const sep = `${hi_cyan} / ${rst}`
      const sepW = 3

      const { options, bounds } = this
      const { row, col, cols } = bounds

      let s = ''
      let sseppy = ''
      let seppy = 0
      let pos = 0
      
      const a = []
      options.forEach((o) => {
        pos += o.length + seppy
        if (pos >= cols - sepW) {
          a.push(s)
          s = ''
          sseppy = ''
          seppy = 0
          pos = o.length + seppy
        }
        s += `${sseppy}${o.text}`
        sseppy = sep
        seppy = sepW
      })
      
      a.push(s)

      //console.log("PRERENDER", a)
      this.preRendered = a.map((x, i) => (
        new TuiLine(row + i, col, x)
      ))

    }

    onRender(f) {
      f(this.preRendered)
    }

    onResize() {
      const { bounds, options } = this
      const { copy: r } = bounds
      
      const sepW = ' / '.length
      
      let pos = 0
      let seppy = 0
      let line = r.removeFromTop(1)
      
      options.forEach((o) => {
        pos += o.length + seppy
        if (pos >= r.cols - sepW) {
          line = r.removeFromTop(1)
          seppy = 0
          pos = o.length + seppy
        }
        line.removeFromLeft(seppy)
        o.setBounds(line.removeFromLeft(o.length))
        seppy = sepW
      })
      
      this.preRender()
    }
  }
  
  // --- exports ------------------------------------------------------
  exports.MenuOption = MenuOption
  exports.MenuLine = MenuLine
  
}).call(this)
