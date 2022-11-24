
(function() {
  
  const load_image = require('blueimp-load-image')
  
  const { Rectangle } = require('./rectangle')
  const { 
    TuiLine,
    TuiThing,
  } = require('./tui')

  const { gandalfRender } = require('../picasso')

  // -------------
  // --- Image ---
  // -------------
  class Image extends TuiThing {
    constructor(tui, url) {
      super(tui)
      this.url = url

      this.img = null
      this.canvas = document.createElement('canvas')

      this.preRendered = []
      this.preRenderedBounds = new Rectangle()
      this.srcW = 10
      this.srcH = 10
      this.brightenIfAllBlack = false
      
      load_image(url,
        (img, meta) => {
          this.img = img
          this.preRender()
          tui.makeDirty()
        },
        // options
        { 
          canvas: false, 
          crossOrigin: 'anonymous', 
          // maxWidth: w_wish,
          // minWidth: w_wish,
          // maxHeight: h_wish, 
          // minHeight: h_wish 
        }
      )
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
      if (this.img !== null) {
        this.img.remove()
        this.img = null
      }

      if (this.canvas !== null) {
        this.canvas.remove()
        this.canvas = null
      }

      this.preRendered.length = 0
      this.url = null

      super.cleanup()
    }

    preRender() {
      const { img, canvas, bounds, brightenIfAllBlack } = this
      
      if (img === null) {
        return
      }
      const { row, col, rows, cols } = bounds
      const w = cols * 2
      const h = rows * 2
      
      if (w === 0 || h === 0) {
        return
      }

      img.width = w
      img.height = h
      canvas.width = w
      canvas.height = h

      const context = canvas.getContext("2d")
      context.drawImage(img, 0, 0, w, h)

      // [r1, g1, b1, a1, r2, b2, g2, a2, ... ] - Same as canvas.getImageData
      const { data } = context.getImageData(0, 0, w, h)
      const lines = gandalfRender(data, w, h, brightenIfAllBlack)

      this.preRendered = lines.map((x, i) => (
        new TuiLine(row + i, col, x)
      ))
      
      this.preRenderedBounds = bounds.copy
    }

    onRender(f) {
      f(this.preRendered)
    }

    onResize() {
      if (this.preRenderedBounds.equals(this.bounds)) {
        return
      }
      this.preRender()
    }
  }
  
  // --- exports -------------------------------------------------------------
  exports.Image = Image

}).call(this); 