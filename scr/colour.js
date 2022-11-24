(function() {
  const esc = '\x1B['
  const rst = `${esc}0m`

  const fg_code = `38;2`
  const bg_code = `48;2`
  
  const fix = Math.floor

  class ColourRGB {
    constructor(r, g, b) {
      this.r = fix(r)
      this.g = fix(g)
      this.b = fix(b)
    }

    get fg() {
      const { r, g, b } = this
      return `${fg_code};${fix(r)};${fix(g)};${fix(b)}`
    }

    get bg() {
      const { r, g, b } = this
      return `${bg_code};${fix(r)};${fix(g)};${fix(b)}`
    }
  
    get fg_ansi() {
      return `${esc}${this.fg}m`
    }

    get bg_ansi() {
      return `${esc}${this.bg}m`
    }

  }

  class FullColour {
    constructor(c_fg, c_bg) {
      this.c_fg = c_fg
      this.c_bg = c_bg
    }

    get ansi() {
      const { c_fg, c_bg } = this
      return `${esc}${c_fg.fg};${c_bg.bg}m`
    }
  
  }

  const C = {
    black: new ColourRGB(0, 0, 0),
    white: new ColourRGB(255, 255, 255),
    yellow: new ColourRGB(255, 255, 0),
    dark_brown: new ColourRGB(32, 27, 6),
    darker_brown: new ColourRGB(15, 17, 6),
    bg_green: new ColourRGB(30, 82, 3),
    bg_blue: new ColourRGB(30, 8, 82),
  }

    
  // --- exports ------------------------------------------
  exports.esc = esc
  exports.rst = rst
  exports.ColourRGB = ColourRGB
  exports.FullColour = FullColour
  exports.C = C

}).call(this);