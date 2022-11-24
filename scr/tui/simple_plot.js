(function() {
  
  const { TuiThing, TuiLine } = require('./tui')
  const { Label } = require('./things')
  const { ColourRGB, FullColour, rst } = require('../colour')


  class Ray extends Label {
    constructor(tui, fc_colour, char, width = 1) {
      const n = width >= 0 ? width : 0
      const { ansi } = fc_colour 
      const text = `${ansi}${char.repeat(n)}`
      super(tui, text, width)
      this.ansi = ansi
      this.char = char
    }

    onResize() {
      const { bounds, ansi, char } = this
      const { cols } = bounds
      const n = cols >= 0 ? cols : 0
      const text = char.repeat(n)
      this.text = `${ansi}${text}`
    }
  }

  const justBlack = new ColourRGB(0, 0, 0)
  class SimpleRay extends Ray {
    constructor(tui, c_colour, width = 1) {
      const fc = new FullColour(justBlack, c_colour)
      super(tui, fc, ' ', width)
    }
  }
  /*
  0123...
  1
  2
  */

  class Plot extends TuiThing {
    constructor(tui) {
      super(tui)
      this.plots = {}
      this.c_bg = new ColourRGB(0, 0, 0)
    }

    clear() {
      this.plots = {}
    }

    get width() {
      return this.bounds.cols
    }

    get height() {
      return this.bounds.rows
    }

    plot(x, y, c) {
      const { plots } = this
      const plots_y = plots[y]
      const y_plots = plots_y !== undefined ? plots_y : {}
      y_plots[x] = c
      if (plots_y === undefined) {
        plots[y] = y_plots
      }
    }

    onRender(f) {
      const { plots, bounds, c_bg } = this
      const { rows: h2, cols: w, row, col } = bounds
      const h = 2 * h2
      const lines = []

      const char = '\u2580';    // ▀

      for (let y = 0; y < h; y += 2) {
        const upper_plots_y = plots[y+1]; 
        const lower_plots_y = plots[y]
        let ansi = ''; 
        for (let x = 0; x < w; ++x) {
          let upper_colour = c_bg
          if (upper_plots_y !== undefined) {
            const c = upper_plots_y[x]
            if (c !== undefined) {
              upper_colour = c
            }
          }

          let lower_colour = c_bg
          if (lower_plots_y !== undefined) {
            const c = lower_plots_y[x]
            if (c !== undefined) {
              lower_colour = c
            }
          }

          //const colour = makeColour(fg_colour, bg_colour)
          const colour = new FullColour(upper_colour, lower_colour).ansi

          //ansi += rst + fg + bg + char
          ansi += `${colour}${char}`
        }
        ansi += rst
        lines.push(ansi)
      }

      lines.reverse()

      const out = lines.map((x, i) => (
        new TuiLine(row + i, col, x)
      ))
      
      f(out)
    }

  }


  // --- exports -------------------------------------------------------
  exports.Plot = Plot
  exports.Ray = Ray
  exports.SimpleRay = SimpleRay


}).call(this);