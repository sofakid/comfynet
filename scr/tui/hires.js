
(function() {
  const { Rectangle } = require('./rectangle')
  const { 
    TuiThing,
  } = require('./tui')

  // -------------
  // --- HiRes ---
  // -------------
  class HiRes extends TuiThing {
    constructor(tui, element) {
      super(tui)
      this.element = element
      this.srcW = element.width
      this.srcH = element.height
    }

    set width(w) {
      this.srcW = w
    }

    set height(h) {
      this.srcH = h
    }

    // aspect is w / h, cols / rows
    desiredWithCols(d_cols) {
      const { bounds, srcW, srcH } = this
      const { row, col } = bounds

      const x = d_cols / (2 * srcW)
      const d_rows = Math.floor(x * srcH)
       
      return new Rectangle(d_rows, d_cols, row, col)
    }

    desiredWithRows(d_rows) {
      const { bounds, srcW, srcH } = this
      const { row, col } = bounds

      const x = d_rows / srcH
      const d_cols = Math.floor(x * 2 * srcW)
       
      return new Rectangle(d_rows, d_cols, row, col)
    }

    cleanup() {
      if (this.element !== null) {
        this.element.remove()
        this.element = null
      }
      super.cleanup()
    }

    onResize() {
      const { element, bounds } = this
      const { row, col } = bounds

      // i know!
      const { comfy_char_w: char_w, comfy_char_h: char_h} = window

      console.log('BORDS1', element)
      //const { top, left } = document.getElementById('xterm').style
      //console.log('BORDS2', element)

      const top = (row - 1) * char_h
      const left = (col - 1) * char_w
      
      const { style } = element

      style.transform = 'translate(' + left + 'px, ' + top + 'px)'
      style.zIndex = '900'
      console.log('BORDS3', element)

      console.log('BORDS4', element)
    }
  }
  
  // --- exports -------------------------------------------------------------
  exports.HiRes = HiRes

}).call(this)