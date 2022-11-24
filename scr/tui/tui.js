(function() {
  const { Rectangle } = require('./rectangle')

  // ---------------
  // --- TuiLine ---
  // ---------------
  class TuiLine {
    constructor(row, col, text) {
      this.row = row
      this.col = col
      this.text = text
    }
  }

  function TuiLine_fromListOfLines(row1, col1, aLines) {
    return aLines.map((line, i) => new TuiLine(row1 + i, col1, line))
  }

  function TuiLine_splitLines(row1, col1, sLines) {
    return TuiLine_fromListOfLines(row1, col1, sLines.split(/\r?\n/))
  }

  // -----------------
  // --- CursorPos ---
  // -----------------
  class CursorPos {
    constructor(row, col) {
      this.row = row
      this.col = col
    }
  }

  // ----------------
  // --- ComfyTui ---
  // ----------------
  let iTuis = 0
  class ComfyTui {
    constructor(mainClass, spot, comfyProgram) {
      this.iTui = iTuis++
      this.hasFocus = false
      this.spot = spot
      this.comfyProgram = comfyProgram
      this.cursorShouldShow = true

      this.dirty = false
      
      this.bounds = new Rectangle()
      this.cursorPos = new CursorPos(1, 1)

      this.root = new mainClass(this)
    }

    tag(... texts) {
      let s = `<Tui ${this.iTui} :: ${this.comfyProgram.name}`
      texts.forEach((x) => {
        s += ` :: ${x}`
      })
      s += '>'
      return s
    }

    makeDirty() {
      //console.log("making dirty", this.comfyProgram)
      this.dirty = true
    }

    start() {
      console.log(`${this.tag()} starting`, this.spot)
      this.setBounds(this.spot.bounds)
      this.focus()
    }

    exit() {
      console.log(`${this.tag()} exiting`)
      this.blur()
      this.unstabAllDaggers()
      this.root.depth_first_traverse((node) => {
        node.cleanup()
      })
    }

    stdout(text) {
      this.spot.goblin.onStdout(text)
    }

    stderr(text) {
      this.spot.goblin.onStderr(text)
    }

    autoDagger() {
      this.root.preorder_traverse((node) => {
        node.autoDagger()
      })
    }

    unstabAllDaggers() {
      const { goblin } = this.spot

      this.root.preorder_traverse((node) => {
        const { dagger } = node
        if (dagger) {
          goblin.unstab(dagger)
        }
      })
    }

    focus() {
      console.error(`${this.tag()} focus`)
      this.hasFocus = true
      this.root.focus()
      this.autoDagger()
    }

    blur() {
      console.error(`${this.tag()} blur`)
      this.hasFocus = false
      this.root.blur()
      this.autoDagger()
    }

    setBounds(r) {
      const { copy: rr } = r
      this.bounds = rr

      this.root.setBounds(rr)
      this.makeDirty()
    }

    render_collect() {
      if (this.dirty) {
        this.dirty = false
        //console.log("DIRDS 4", this.root)

        return this.root.render()
      }
      //console.log("DIRDS 3")

      return []
    }

    getScreenBounds() {
      const o = this.tui.spot.getScreenBounds()
      const rows = o.rows - this.row1
      const cols = o.cols - this.col1
      return new Rectangle(rows, cols, this.row1, this.col1)
    }

  }

  // ----------------
  // --- TuiThing ---
  // ----------------
  class TuiThing {
    constructor(tui) {
      this.tui = tui
      this.nodes = []
      this.bounds = new Rectangle()
      this.parent = null
      this.hasFocus = false
      this.supressed = false

      this.programFocusedDagger = null
      this.programBlurredDagger = null
      this.tuiFocusedDagger = null
      this.tuiBlurredDagger = null
      this.thingFocusedDagger = null
      this.thingBlurredDagger = null

      this.cleanedup = false

      this.elements = []
    }

    cleanup() {
      this.cleanedup = true

      const yesAlsoClean = true
      this.removeAllNodes(yesAlsoClean)
      this.nodes.length = 0
      
      this.tui = null
      
      const vape = (x) => {
        if (this[x] !== null) {
          this[x].vaporize()
          this[x] = null
        } 
      }

      [ 'programFocusedDagger',
        'programBlurredDagger',
        'tuiFocusedDagger',
        'tuiBlurredDagger',
        'thingFocusedDagger',
        'thingBlurredDagger'
      ].forEach(vape)

      this.bounds = new Rectangle()
      this.parent = null

      this.elements.forEach((x) => {
        x.remove()
      })
    }

    render(filter = null, translate = null) {
      let a = []
      this.preorder_traverse_render((node) => {
        node.onRender((rendered) => {
          if (filter === null) {
            a = a.concat(rendered)
          } else {
            if (translate === null) {
              a = a.concat(rendered.filter(filter))
            } else {
              a = a.concat(rendered.filter(filter).map(translate))
            }
          }
        })
      })
      return a
    }

    __unstab(... daggers) {
      const { goblin } = this.tui.spot
      daggers.forEach((d) => {
        if (d) {
          goblin.unstab(d)
        }
      })
    }

    __focus(blurred, focused) {
      const { goblin } = this.tui.spot

      if (blurred) {
        goblin.unstab(blurred)
      }
      if (focused) {
        goblin.stab(focused)
      }
    }

    __blur(blurred, focused) {
      const { goblin } = this.tui.spot

      if (focused) {
        goblin.unstab(focused)
      }
      if (blurred) {
        goblin.stab(blurred)
      }
    }

    onProgramFocus() {
      const { programBlurredDagger, programFocusedDagger } = this
      this.__focus(programBlurredDagger, programFocusedDagger)
    }

    onProgramBlur() {
      const { 
        programBlurredDagger, programFocusedDagger,
        tuiBlurredDagger, tuiFocusedDagger,
        thingBlurredDagger, thingFocusedDagger
      } = this
      this.__blur(programBlurredDagger, programFocusedDagger)
      this.__unstab(tuiBlurredDagger, tuiFocusedDagger,
        thingBlurredDagger, thingFocusedDagger)
    }

    onTuiFocus() {
      const { tuiBlurredDagger, tuiFocusedDagger } = this
      this.__focus(tuiBlurredDagger, tuiFocusedDagger)
    }

    onTuiBlur() {
      const { tuiBlurredDagger, tuiFocusedDagger } = this
      this.__blur(tuiBlurredDagger, tuiFocusedDagger)
    }

    onThingFocus() {
      const { thingBlurredDagger, thingFocusedDagger } = this
      this.__focus(thingBlurredDagger, thingFocusedDagger)
    }

    onThingBlur() {
      const { thingBlurredDagger, thingFocusedDagger } = this
      this.__blur(thingBlurredDagger, thingFocusedDagger)
    }

    autoDagger() {
      const { cleanedup, supressed } = this
      if (cleanedup)
        return

      if (supressed)
        return

      const { tui } = this
      const { comfyProgram } = tui

      //console.log(`autoDagger ${this.constructor.name}`)
      if (comfyProgram.hasFocus) {
        this.onProgramFocus()
      } else {
        this.onProgramBlur()
        return
      }

      if (tui.hasFocus) {
        this.onTuiFocus()
      } else {
        this.onTuiBlur()
      }

      if (this.hasFocus) {
        this.onThingFocus()
      } else {
        this.onThingBlur()
      }
    }

    autoUnstab() {
      if (this.cleanedup)
        return

      const { 
        tui, 
        programBlurredDagger, programFocusedDagger,
        tuiBlurredDagger, tuiFocusedDagger,
        thingBlurredDagger, thingFocusedDagger
      } = this
      const { goblin } = tui.spot

      if (programBlurredDagger) goblin.unstab(programBlurredDagger)
      if (programFocusedDagger) goblin.unstab(programFocusedDagger)
      if (tuiBlurredDagger)     goblin.unstab(tuiBlurredDagger)
      if (tuiFocusedDagger)     goblin.unstab(tuiFocusedDagger)
      if (thingBlurredDagger)   goblin.unstab(thingBlurredDagger)
      if (thingFocusedDagger)   goblin.unstab(thingFocusedDagger)
    }

    focus() {
      this.hasFocus = true
    }

    blur() {
      this.hasFocus = false
    }

    // use for stuff that's not rendering, like daggers
    preorder_traverse(f) {
      f(this)
      this.nodes.forEach((node) => {
        node.preorder_traverse(f)
      })
    }
    
    // use this for rendering. render parents then children overwrite
    preorder_traverse_render(f) {
      f(this)
      this.nodes.forEach((node) => {
        node.preorder_traverse_render(f)
      })
    }

    // we use this when destroying
    depth_first_traverse(f) {
      this.nodes.forEach((node) => {
        node.depth_first_traverse(f)
      })
      f(this)
    }

    addNode(... nodes) {
      nodes.forEach((node) => {
        node.parent = this
        this.nodes.push(node)
      })
    }

    addNodeAndDagger(... nodes) {
      nodes.forEach((node) => {
        node.parent = this
        this.nodes.push(node)
        node.autoDagger()
      })
    }

    insertNodeAndDagger(index, ... nodes) {
      nodes.forEach((node) => {
        node.parent = this
        this.nodes.push(node)
        node.autoDagger()
      })
    }

    removeNode(node, alsoCleanNode = false) {
      node.parent = null
      this.nodes = this.nodes.filter((x) => x !== node)
      node.autoUnstab()
      if (alsoCleanNode === true) {
        node.cleanup()
      }
    }

    removeAllNodes(alsoCleanNodes = false) {
      // make clone because node.removeNode modifies node.nodes
      const clones = this.nodes.slice()
      clones.forEach((x) => {
        x.depth_first_traverse((node) => {
          // make clone because node.removeNode modifies node.nodes
          const more_clones = node.nodes.slice()
          more_clones.forEach((y) => {
            node.removeNode(y, alsoCleanNodes)
          })
          if (node.nodes.length !== 0) {
            console.error('removeAllNodes() failed to remove all nodes.', node.nodes)
          }
        })
        this.removeNode(x, alsoCleanNodes)
      })
    }

    setBounds(rect) {
      if (rect.isPositiveOrZero) {
        this.bounds = rect.copy
        this.onResize()
        this.tui.makeDirty()
      }
    }

    hitTest(row, col) {
      const r = this.getScreenBounds()
      const bottom = r.row + r.rows
      const right = r.col + r.cols

      //console.log("hit test", (row >= r.row && row < bottom && col >= r.col && col < right))

      return (row >= r.row && row < bottom && col >= r.col && col < right)
    }

    getScreenBounds() {
      const { copy: r } = this.bounds
      this.toScreenBounds(r)
      return r
    }

    // ScrollFrame will override this and adjust 
    toScreenBounds(localBounds) {
      if (this.parent !== null) {
        this.parent.toScreenBounds(localBounds)
      }
    }

    onRender() {
    }

    onResize() {
    }

  }


  // --- exports -----------------------------------------------------
  exports.TuiLine = TuiLine
  exports.TuiLine_fromListOfLines = TuiLine_fromListOfLines
  exports.TuiLine_splitLines = TuiLine_splitLines
  exports.Rectangle = Rectangle
  exports.CursorPos = CursorPos
  exports.ComfyTui = ComfyTui
  exports.TuiThing = TuiThing
  
}).call(this)