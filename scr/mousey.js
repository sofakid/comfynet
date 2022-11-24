(function () {

  const click_ms = 500
  const double_click_ms = 700

  // --- Mousey Event -------------------------------------------------
  
  class MouseyEvent {
    constructor(row, col, event) {
      this.row = row
      this.col = col
      this.event = event
    }
  }

  // --- Mousey Event -------------------------------------------------
    
  class MouseyCursor {
    constructor(mousey) {
      this.mousey = mousey
      this.char_w = 1
      this.char_h = 1
      this.top = 0
      this.left = 0
      this.visibile = true

      this.div = document.createElement('div')
      const { div } = this

      mousey.appendChild(div)
      mousey.style.cursor = 'none'

      const { style } = div
      //style.backgroundColor = '#ffff0088'; // yellow
      //style.backgroundColor = '#6666ff88'; // blue
      style.backgroundColor = '#00ffff88'; // cyan
      style.position = 'absolute'
      style.top = 0
      style.left = 0

      // looks nicer, but flickers. 
      // style.transition = 'transform 20ms linear'

      div.onmouseenter = this.show
      div.onmouseleave = this.hide
    }

    show() {
      if (this.visibile === false) {
        this.visibile = true
        this.div.style.visibility = 'visible'
      }
    }

    hide() {
      if (this.visibile === true) {
        this.visibile = false
        this.div.style.visibility = 'hidden'
      }
    }

    onResize(char_w, char_h) {
      const { style } = this.div
      
      style.width = `${char_w}px`
      style.height = `${char_h}px`
      
      this.char_w = char_w
      this.char_h = char_h
    }

    pos(row, col) {
      this.show()

      if (!(row > 0 && row < 100 && col > 0 && col < 300)) {
        //console.error("blah", row, col)
        return
      } 

      const top = (row - 1) * this.char_h
      const left = (col - 1) * this.char_w
      
      const { style } = this.div

      style.transform = 'translate(' + left + 'px, ' + top + 'px)'
    }
  }
  // --- Mousey -------------------------------------------------------

  class Mousey {
    constructor(goblin) {
      this.goblin = goblin
      this.char_w = 1
      this.char_h = 1
      this.mousemove_last_row = 0
      this.mousemove_last_col = 0
      this.mousedown_row = 0
      this.mousedown_col = 0
      this.mousedown_time = Date.now()
      this.dragging = false
      this.isMouseDown = false

      const mousey = document.createElement('div')
      this.mousey = mousey
      mousey.id = 'mousey'
      mousey.tabIndex = 0
      mousey.style.outline = 'none'

      this.cursor = new MouseyCursor(this.mousey)

      const eat = (event) => { event.stopPropagation(); }
      mousey.onkeydown = this.onKey.bind(this)
      mousey.onmousemove = this.onMouseMove.bind(this)
      mousey.onmousedown = this.onMouseDown.bind(this)
      mousey.onmouseup = this.onMouseUp.bind(this)
      mousey.onclick = eat
      mousey.ondblclick = eat
      mousey.ondrag = eat
      mousey.ondragend = eat
      mousey.ondragenter = eat
      mousey.ondragexit = eat
      mousey.ondragleave = eat
      mousey.ondragover = eat
      mousey.ondragstart = eat
      mousey.onmouseenter = eat
      mousey.onmouseleave = eat
      mousey.onmouseout = this.onMouseOver.bind(this)
      mousey.onmouseover = this.onMouseOver.bind(this)
      mousey.ontouchstart = eat
      mousey.ontouchmove = eat
      mousey.ontouchend = eat
    }
    
    // we can't attach until the xterm is open
    attach() {
      const xscreen = document.getElementsByClassName('xterm-screen')[0]
      xscreen.appendChild(this.mousey)
      this.mousey.focus()
    }

    onResize(event) {
      const { rows, cols } = event
      const { clientWidth: mw, clientHeight: mh } = this.mousey
      
      // Math.floor() is wrong here, when the font isn't zoomed at exactly 100%, 
      // you need the decimal parts
      this.char_w = mw / cols
      this.char_h = mh / rows
      //console.log('mousey resized', rows, cols, this.char_w, this.char_h)

      this.cursor.onResize(this.char_w, this.char_h)
    }

    getRowCol(event) {
      let e = this.mousey
      let x0 = 0
      let y0 = 0
  
      while (e !== null) {
        x0 += e.offsetLeft
        y0 += e.offsetTop
        e = e.offsetParent
      }
  
      const { pageX, pageY } = event
  
      // relative to top corner of mousey
      const mousey_x = pageX - x0
      const mousey_y = pageY - y0
  
      const row = Math.floor(mousey_y / this.char_h) + 1
      const col = Math.floor(mousey_x / this.char_w) + 1
      
      return [ row, col ]
    }

    onClick(event) {
      event.stopPropagation()
      const [ row, col ] = this.getRowCol(event)
      //console.log("click row, col: ", row, col)
      this.goblin.onClick(new MouseyEvent(row, col, event))
    }

    onKey(event) {
      event.stopPropagation()
      const { key, ctrlKey, altKey, metaKey } = event
      const { goblin } = this

      const isPrintable = () => {
        if (key.length !== 1) return false
        if (ctrlKey || altKey || metaKey) return false
        return true
      }

      if (isPrintable()) {
        goblin.onData(key)
      }
      
      const isPaste = ctrlKey && key === 'v'
      if (isPaste) {
        window.navigator.clipboard.readText().then((x) => {
          goblin.onData(x)
        })
        return
      }

      goblin.onKey(event)
    }

    onWheel(event) {
      event.stopPropagation()
      const [ row, col ] = this.getRowCol(event)
      //console.log("wheel row, col: ", row, col)
      this.goblin.onWheel(new MouseyEvent(row, col, event))
    }

    onMouseDown(event) {
      event.stopPropagation()

      const [ row, col ] = this.getRowCol(event)
      this.mousedown_row = row
      this.mousedown_col = col
      this.mousedown_time = Date.now()
      this.isMouseDown = true
    }

    onMouseUp(event) {
      event.stopPropagation()
      this.isMouseDown = false
      
      const [ row, col ] = this.getRowCol(event)
      const { mousedown_time, mousedown_row, mousedown_col, dragging, goblin } = this

      const now = Date.now()
      if (now - mousedown_time < click_ms) {
        this.onClick(event)
      } else if (dragging === false) {
        if (row === mousedown_row && col === mousedown_col) {
          this.onClick(event)
        }
      }  
        
      if (dragging) {
        goblin.onDragEnd(new MouseyEvent(row, col, event))
        this.dragging = false
      }
    }

    onMouseMove(event) {
      event.stopPropagation()
      const [ row, col ] = this.getRowCol(event)
      const { mousedown_row, mousedown_col, mousemove_last_row, mousemove_last_col,
        isMouseDown, dragging, cursor, goblin } = this

      if (isMouseDown && dragging === false) {
        if (row != mousedown_row || col != mousedown_col) {
          this.dragging = true
          goblin.onDragStart(new MouseyEvent(mousedown_row, mousedown_col, event))
        }
      }

      if (row != mousemove_last_row || col != mousemove_last_col) {
        this.mousemove_last_row = row
        this.mousemove_last_col = col
        cursor.pos(row, col)
        
        if (dragging) {
          const dr = row - mousedown_row
          const dc = col - mousedown_col

          //console.log(`drag <${dr}, ${dc}>`)
          goblin.onDragPos(new MouseyEvent(dr, dc, event))
        } 
        else {
          goblin.onMousePos(new MouseyEvent(row, col, event))
        }
      }
    }

    onMouseOver(event) {
      this.mousey.focus()
    }
  }

  // --- exports -------------------------------------------------------
  exports.MouseyEvent = MouseEvent
  exports.Mousey = Mousey

}).call(this);