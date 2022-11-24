(function() {

  const { 
    TuiLine,
    Rectangle,
    TuiThing,
  } = require('./tui')

  const { Box } = require('./things')
  const xregexp = require('xregexp')

  const { Dagger } = require('../daggers')
  const { ansiColours, fgRgb, bgRgb } = require('../picasso')

  const re_nonprintable = xregexp("[^\\PC\n]")
  const re_only_printable = xregexp("^\\PC+$")

  const esc = '\x1b'

  const clean = (s) => xregexp.replace(s, re_nonprintable, '', 'all')


  // -------------------
  // --- SimpleFrame ---
  // -------------------
  class SimpleFrame extends TuiThing {

    constructor(tui) {
      super(tui)
      
      const colour = [ ansiColours.rst ]
      this.box = new Box(tui, ' ', colour)
      this.addNode(this.box)
    }

    onResize() {
      this.box.setBounds(this.bounds)
    }

  }

  // -----------------------
  // --- FullscreenFrame ---
  // -----------------------
  class FullscreenFrame extends TuiThing {

    constructor(tui) {
      super(tui)
      this.tuiFocusedDagger = new Dagger('SimpleFrame')
      this.tuiFocusedDagger.emenations = {
        'wheel': (mouseyEvent) => true,
      }

      this.tuiBlurredDagger = new Dagger('SimpleFrame')
      this.tuiBlurredDagger.emenations = {
        'wheel': (mouseyEvent) => true,
      }
    }

    onRender(f) {
      //const showCursor = `${esc}[?25h`
      const hideCursor = `${esc}[?25l`
      const clearScreen = `${esc}[2J${esc}[3J`
      f(new TuiLine(1, 1, `${hideCursor}${clearScreen}`))
    }

    onResize() {
    }

  }

  // -------------------
  // --- ScrollFrame ---
  // -------------------
  class ScrollFrame extends TuiThing {
    constructor(tui, view) {
      super(tui)
      this.view = view
      view.parent = this

      this.scrollHoriz = false
      this.scrollVert = true
      this.scrollPastEnds = true
      this.scrollRowDelta = 0
      this.scrollColDelta = 0

      this.portal = new Rectangle()
      this.viewSize = new Rectangle()

      const onWheel = (mouseyEvent) => {
        const { row, col, event } = mouseyEvent
        //console.log(`wheel ${this.tui.tag('ScrollFrame')} -- 1`, mouseyEvent, this.hitTest(row, col))
        if (!this.cleanedup && this.hitTest(row, col)) {
          //console.log(`${this.tui.tag('scrollframe wheel')} -- 2`, mouseyEvent)
          this.scroll(Math.ceil(event.deltaY / 33.3))
          return true
        }
        return false
      }

      this.tuiFocusedDagger = new Dagger('ScrollFrame Focused')
      this.tuiFocusedDagger.emenations = {
        'wheel': onWheel,
      }

      this.tuiBlurredDagger = new Dagger('ScrollFrame Blurred')
      this.tuiBlurredDagger.emenations = {
        'wheel': onWheel,
      }
      
    }

    findFirstNodeOnPage() {
      const nodes = []
      this.view.preorder_traverse((x) => {
        nodes.push(x)
      })

      if (nodes.length === 0) {
        return null
      }

      console.log('findFirstNodeOnPage 1')

      // find one that fits completely on page
      for (let i = 0; i < nodes.length; ++i) {
        const x = nodes[i]
        if (this.portal.contains(x.bounds)) {
          return x
        }
      }
      console.log('findFirstNodeOnPage 2')

      // nothing fits, find one that starts on this page
      for (let i = 0; i < nodes.length; ++i) {
        const x = nodes[i]
        const { row: xRow } = x.bounds
        const { row, bottom } = this.portal
        if (row < xRow && xRow > bottom) {
          return x
        }
      }
      console.log('findFirstNodeOnPage 3')

      return null
    }

    scrollToPageForNode(node) {
      const { bounds: nb } = node 
      const { row, rows } = nb
      const { portal } = this

      const { copy: oldPortal } = portal

      console.log('scrollPageToNode', portal.row, row)

      let x = portal.bottom
      while (nb.bottom > x) {
        console.log('scrollPageDown', x, nb.bottom)
        this.scrollPageDown()
        if (portal.bottom === x) {
          break
        }
        x = portal.bottom
      }

      x = portal.top
      while (nb.top < x) {
        console.log('scrollPageUp', x, nb.top)
        this.scrollPageUp()
        if (portal.top === x) {
          break
        }
        x = portal.top
      }

      if (!portal.contains(node.bounds)) {
        portal.row = row
      }
      
      const didScroll = !this.portal.equals(oldPortal)
      
      if (didScroll)
        this.tui.makeDirty()

      return didScroll
    }

    scrollToNode(node, paddish) {
      const { copy: oldPortal } = this.portal
      const bottomRow = this.viewSize.rows
      const { row, rows } = node.bounds
      let destTopRow = row - paddish

      if (destTopRow < 1)
        destTopRow = 1 

      if (destTopRow >= bottomRow)
        destTopRow = bottomRow

      console.log("scrollToNode", row, paddish, destTopRow, this.portal.row)
      this.portal.row = destTopRow

      const didScroll = !this.portal.equals(oldPortal)
      
      if (didScroll)
        this.tui.makeDirty()

      return didScroll
    }

    scrollToBottom() {
      const { copy: oldPortal } = this.portal

      console.log("scrollToBottom 1", this.portal, this.viewSize)
      const bottomRow = this.viewSize.rows

      if (bottomRow < this.portal.rows) {
        this.portal.rows = bottomRow
      }

      const { row, rows } = this.portal
      const destTopRow = bottomRow - rows + 1

      if (row < destTopRow) {
        console.log('scrollToBottom 2', bottomRow, rows, row, destTopRow)
        this.portal.row = destTopRow
      }
      
      const didScroll = !this.portal.equals(oldPortal)
    
      if (didScroll)
        this.tui.makeDirty()

      return didScroll
    }

    scrollPageUp() {
      const { copy: oldPortal } = this.portal

      const bottomRow = this.viewSize.rows
      const { row, rows } = this.portal
      let destTopRow = row - rows

      if (destTopRow < 1)
        destTopRow = 1

      this.portal.row = destTopRow
      
      const didScroll = !this.portal.equals(oldPortal)
      
      if (didScroll)
        this.tui.makeDirty()

      return didScroll
    }

    scrollPageDown() {
      const { copy: oldPortal } = this.portal

      const bottomRow = this.viewSize.rows
      let destTopRow = this.portal.bottom

      if (destTopRow > bottomRow)
        destTopRow = bottomRow

      this.portal.row = destTopRow

      const didScroll = !this.portal.equals(oldPortal)
      
      if (didScroll)
        this.tui.makeDirty()

      return didScroll
    }

    // setCursor(row, col) {
    //   const { row: bRow, col: bCol } = this.bounds
    //   const { row: pRow, col: pCol, rows: pRows, cols: pCols } = this.portal
    //   this.tui.cursorPos = new CursorPos(row - pRow + bRow, col - pCol + bCol)
    // }

    scroll(deltaRows) {
      const { copy: oldPortal } = this.portal

      // const maxRow = this.viewSize.rows
      const maxRow = this.view.desiredRows

      //console.log(`scroll ${deltaRows} maxRow: ${maxRow}, portal:`, this.portal)
      this.portal.shiftRow(deltaRows, maxRow)
      const didScroll = !this.portal.equals(oldPortal)
      
      if (didScroll)
        this.tui.makeDirty()

      return didScroll
    }

    resizeView(rows, cols) {
      this.viewSize.rows = rows
      this.viewSize.cols = cols
      this.onResize()
    }

    // --- overrides ------------------------------
    setBounds(rect) {
      this.bounds = rect.copy
      const { bounds, viewSize } = this; 

      if (viewSize.rows < bounds.rows) {
        viewSize.rows = bounds.rows
      }

      if (viewSize.cols < bounds.cols) {
        viewSize.cols = bounds.cols
      }

      this.onResize()
    }

    preorder_traverse(f) {
      f(this)
      this.view.preorder_traverse(f)
    }

    depth_first_traverse(f) {
      this.view.depth_first_traverse(f)
      f(this)
    }
    

    onRender(f) {
      const { row: bRow, col: bCol } = this.bounds
      const { row: pRow, col: pCol, rows: pRows, cols: pCols } = this.portal
      const pRowBottom = pRow + pRows - 1
      const pColRight = pCol + pCols - 1

      const hit = (row, col) => (row >= pRow && row <= pRowBottom && col >= pCol && col <= pColRight ); 
      const filter = (x) => hit(x.row, x.col)
      const translate = (x) => new TuiLine(bRow + x.row - pRow, bCol + x.col - pCol, x.text)

      const a = this.view.render(filter, translate)
      f(a)
    }

    onResize() {
      const { scrollHoriz, scrollVert, portal, viewSize, bounds, view } = this
      const { rows, cols } = bounds

      portal.rows = rows
      portal.cols = cols

      if (scrollHoriz === false) {
        viewSize.cols = cols
      }

      if (scrollVert === false) {
        viewSize.rows = rows
      }

      const { desiredRows } = view
      if (desiredRows !== undefined) {
        viewSize.rows = desiredRows
      }

      if (viewSize.rows < portal.rows) {
        portal.rows = viewSize.rows
      }

      if (viewSize.cols < portal.cols) {
        portal.cols = viewSize.cols
      }

      view.setBounds(this.viewSize)
    }

    // we override to skip calling our .toScreenBounds() because we aren't 
    // intereseted in the adjusted version here.
    getScreenBounds() {
      const r = this.bounds.copy
      super.toScreenBounds(r)
      return r
    }

    toScreenBounds(localBounds) {
      const { bounds, portal } = this
      // translate
      localBounds.row += bounds.row - portal.row
      localBounds.col += bounds.col - portal.col
      // clip top
      while (localBounds.row < bounds.row && localBounds.rows > 0) {
        localBounds.row++
        localBounds.rows--
      }
      // clip bottom
      const nb = bounds.row + bounds.rows
      while (localBounds.row + localBounds.rows > nb && localBounds.rows > 0) {
        localBounds.rows--
      }
      // clip left
      while (localBounds.col < bounds.col && localBounds.cols > 0) {
        localBounds.col++
        localBounds.cols--
      }
      // clip right
      const nr = bounds.col + bounds.cols
      while (localBounds.col + localBounds.cols > nr && localBounds.cols > 0) {
        localBounds.cols--
      }

      super.toScreenBounds(localBounds)
    }
  }
  
  // --- exports -----------------------------------------------------
  exports.FullscreenFrame = FullscreenFrame
  exports.SimpleFrame = SimpleFrame
  exports.ScrollFrame = ScrollFrame
  
}).call(this);