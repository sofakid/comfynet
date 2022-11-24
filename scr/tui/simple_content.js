(function() {
  
  const { Label } = require('./things')
  const { FullColour, C, S } = require('../colour')
  const { Rectangle, TuiLine, TuiThing } = require('./tui')
  const { Dagger } = require('../daggers')
  
  // ------------------------------------
  // --- SimpleContentSelectableThing ---
  // ------------------------------------
  class SimpleContentSelectableThing extends TuiThing {
    constructor(tui) {
      super(tui)
      this.selected = false
      this.prSelected = []
      this.prUnselected = []
      this.n_rows = -1
      this.lastPreRenderBounds = Rectangle.nonDefault()
    }

    get desiredRows() {
      const { bounds, n_rows, lastPreRenderBounds } = this
      if (n_rows < 0 || !lastPreRenderBounds.equals(bounds)) {
        this.lastPreRenderBounds = bounds.copy
        this.preRender()
      }
      return n_rows
    }

    get desiredCols() {
      // override if you use it
      return 0
    }

    preRender() {
      // override this and set n_rows.
      console.log("uh oh")
    }

    onRender(f) {
      const { selected, prSelected, prUnselected } = this
      const a = selected ? prSelected : prUnselected
      f(a)
    }

    onResize() {
      this.lastPreRenderBounds = this.bounds.copy
      this.preRender()
    }

    select() {
      this.selected = true
      this.tui.makeDirty()
    }

    unselect() {
      this.selected = false
      this.tui.makeDirty()
    }
  }

  // ------------------------------
  // --- SimpleContentHighlight ---
  // ------------------------------
  class SimpleContentHighlight extends SimpleContentSelectableThing {
    constructor(tui, c_highlight, c_unhighlight) {
      super(tui)
      this.c_highlight = c_highlight
      this.c_unhighlight = c_unhighlight !== undefined ? c_unhighlight :
        new FullColour(C.black, C.black).ansi
    }

    preRender() {
      const { bounds, prSelected, prUnselected, c_highlight, c_unhighlight } = this
      const { row, rows, col } = bounds

      //const quad_BL = '\u258C'
      const quad_BR = '\u2590'

      const comfyMax = row + 3
      
      const sSelected = `${c_highlight}${quad_BR}`
      const sUnselected = `${c_unhighlight}${quad_BR}`
      
      //console.log("UNSELECTED", sUnselected)

      prSelected.length = 0
      prUnselected.length = 0

      for (let i = row; i < row + rows && i < comfyMax; ++i) {
        prSelected.push(new TuiLine(i, col, sSelected))
        prUnselected.push(new TuiLine(i, col, sUnselected))
      }

      this.n_rows = prSelected.length
    }

    get desiredCols() {
      return 1
    }
    
  }

  // -------------------------------------
  // --- SimpleContentListEntryContent ---
  // -------------------------------------
  class SimpleContentListEntryContent extends SimpleContentSelectableThing {
   
  }

  // ------------------------------
  // --- SimpleContentListEntry ---
  // ------------------------------
  class SimpleContentListEntry extends TuiThing {
    constructor(tui, content, c_highlight, c_border = null) {
      super(tui)
      this.selected = false

      //const quad_UB = '\u2580';    // ▀
      //const quad_LB = '\u2584';    // ▄
      const quad_BL = '\u258C';    // ▌
      const quad_BR = '\u2590';    // ▐
      
      const c_b = c_border !== null ? c_border : new FullColour(C.black, C.black).ansi 

      //this.border_l = new Label(tui, `${c_border}${quad_BR}`)
      this.borderRight = new Label(tui, `${c_b}${quad_BL}`, 1)
      this.highlight = new SimpleContentHighlight(tui, c_highlight, c_border)
      this.content = content
      
      this.addNode(this.borderRight)
      this.addNode(this.highlight)
      this.addNodeAndDagger(this.content)
      
      const _onEnter = (o) => {
        if (this.selected) {
          this.onEnterWhenSelected(o)
          return true
        }
      }
      
      const _onClick = (o) => {
        if (!this.cleanedup && this.hitTest(o.row, o.col)) {
          this.onClick(o)
          return true
        }
      }
      
      const _onMousePos = (o) => {
        if (!this.cleanedup) {
          if (this.hitTest(o.row, o.col)) {
            this.select()
          } else {
            this.unselect()
          }
        }
      }
      
      this.tuiFocusedDagger = new Dagger("SimpleContentListEntry Result Focused")
      this.tuiFocusedDagger.emenations = {
        'Enter': _onEnter,
        'onClick': _onClick,
        'onMousePos': _onMousePos,
      }
      
      this.tuiBlurredDagger = new Dagger("SimpleContentListEntry Result Blurred")
      this.tuiBlurredDagger.emenations = {
        'onClick': _onClick,
        'onMousePos': _onMousePos,
      }
    }
    
    onEnterWhenSelected(event) {
      console.log('oh no')
    }

    onClick(event) {
      console.log('gadzooks')
    }

    onResize() {
      const { bounds, highlight, content, borderRight } = this
      const { copy: r } = bounds
      //console.log("SimpleContentListEntry.onResize", r)
      const { desiredCols: hw } = highlight 
      const pad = 1
      highlight.setBounds(r.removeFromLeft(hw))
      r.removeFromLeft(pad)
      const r_border_right = r.removeFromRight(1)
      borderRight.setBounds(r_border_right)
      content.setBounds(r)
    }

    select() {
      this.selected = true
      this.highlight.select()
      this.content.select()
    }

    unselect() {
      this.selected = false
      this.highlight.unselect()
      this.content.unselect()
    }

    preRender() {
      this.content.preRender()
    }

    get desiredRows() {
      return Math.max(this.highlight.desiredRows, this.content.desiredRows)
    }

    get desiredCols() {
      const { highlight, content } = this
      const { desiredCols: w_h} = highlight
      const { desiredCols: w_c} = content
      const padding = 1
      const border = 1
      return w_h + padding + w_c + border
    }

  }

  // -------------------------
  // --- SimpleContentList ---
  // -------------------------
  class SimpleContentList extends TuiThing {

    // --- overrides -------------------------------------------
    onResize() {
      const { bounds, nodes } = this
      const { copy: r } = bounds

      nodes.forEach((x) => {
        // todo: this prerenders twice.
        x.setBounds(r) 
        x.setBounds(r.removeFromTop(x.desiredRows))
      })
    }

    // --- methods -------------------------------------------
    
    get desiredRows() {
      return this.nodes.reduce((x, v) => (x + v.desiredRows), 0)
    }
    
    get desiredCols() {
      let longest = 0
      this.nodes.forEach((x) => {
        const { desiredCols: n } = x
        if (n > longest) {
          longest = n
        }
      })
      return longest
    }

    // returns [ last, selected, next ]
    findSelected() {
      let last = null
      let a = []
      let found = false
      const { nodes } = this
      const { length: n } = nodes

      for (let i = 0; i < n; ++i) {
        const x = nodes[i]

        if (found) {
          a.push(x)
          return a
        }
        
        if (x.selected) {
          found = true
          a.push(last)
          a.push(x)
        }
        
        last = x
      }

      a.push(null)

      if (a.length === 1) {
        a.push(null)
        a.push(null)
      }

      if (a.length !== 3) {
        console.error("findSelected() is messed up.", a)
      }

      return a
    }

    selectLastResult() {

      const [ last, selected, next ] = this.findSelected()

      if (selected) {
        selected.unselect()
      }

      if (last) {
        last.select()
        return last
      }
    
      // select first 
      const x = this.nodes[0]
      x.select()
      return x
    }
  
    selectNextResult() {
      const [ last, selected, next ] = this.findSelected()

      if (selected) {
        selected.unselect()
      } 
      
      if (next) {
        next.select()
        return next
      }
    
      // select last
      const { nodes } = this
      const x = nodes[nodes.length - 1]
      x.select()
      return x
    }

    selectTopResult(scrollFrame) {
      const [ last, selected, next ] = this.findSelected()
      
      if (selected) {
        selected.unselect()
      } 

      const x = scrollFrame.findFirstNodeOnPage()
      console.log('selectTopResult', x)
      if (x) {
        x.select()
      }
    }
    
  }

  // --- exports ------------------------
  exports.SimpleContentSelectableThing = SimpleContentSelectableThing
  exports.SimpleContentHighlight = SimpleContentHighlight
  exports.SimpleContentListEntryContent = SimpleContentListEntryContent
  exports.SimpleContentListEntry = SimpleContentListEntry
  exports.SimpleContentList = SimpleContentList

}).call(this)