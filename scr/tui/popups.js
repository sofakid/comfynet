(function() {
  
  const { Dagger } = require('../daggers')
  const { ColourRBG, FullColour, C } = require('../colour')

  const { TuiThing } = require('./tui')
  const { Box } = require('./things')
  const { ScrollFrame } = require('./frame_things')

  class BusinessFrame extends TuiThing {
    constructor(tui, businessClass, arg) {
      super(tui)
      if (businessClass !== null) {
        this.business = new businessClass(tui, arg)
        this.addNode(this.business)
      }
      else {
        const { ansi } = new FullColour(C.black, C.bg_blue)
        this.business = new Box(tui, ' ', ansi)
        this.addNode(this.bg)
      }

      const hit = (e) => (
        this.hitTest(e.row, e.col)
      )
      const d = new Dagger('Business Frame')
      d.emenations = {
        'onClick': hit,
        'onMousePos': hit,
      }
      this.tuiFocusedDagger = d
      this.tuiBlurredDagger = d
    }

    get desiredRows() {
      const { business } = this
      const { desiredRows: dr } = business
      if (dr !== undefined) {
        return dr
      }
      const { bounds: r } = business
      if (r.isPositive) {
        return r.rows
      }
      return 12
    }

    get desiredCols() {
      const { business } = this
      const { desiredCols: dc } = business
      if (dc !== undefined) {
        return dc
      }
      const { bounds: r } = business
      if (r.isPositive) {
        return r.cols
      }
      return 50
    }

    onResize() {
      const { bounds, business } = this
      const { copy: r } = bounds
      business.setBounds(r)
    }

  }

  class Modal extends TuiThing {
    constructor(tui, businessFrameClass, arg) {
      super(tui)
      this.businessFrame = new BusinessFrame(tui, businessFrameClass, arg)
      this.scrollFrame = new ScrollFrame(tui, this.businessFrame)
      this.addNode(this.scrollFrame)
      this.businessFrame.autoDagger()
    }

    get business() {
      return this.businessFrame.business
    }

    onResize() {
      const { bounds, scrollFrame, businessFrame } = this
      const { copy: r } = bounds
      const { cols: w, rows: h } = r
      const { desiredCols: dw, desiredRows: dh } =  businessFrame

      let padw = Math.floor((w - dw) / 2)
      let padh = Math.floor((h - dh) / 2)

      if (padw < 0) {
        padw = 0
      }

      if (padh < 0) {
        padh = 0
      }

      if (2 * padw + dw > w) {
        padw = 0
      }

      if (2 * padh + dh > h) {
        padh = 0
      }

      console.log('Modal.onResize padw', padw, ' padh', padh, r)
      r.removeFromLeft(padw)
      r.removeFromRight(padw)

      r.removeFromTop(padh)
      r.removeFromBottom(padh)

      scrollFrame.setBounds(r)
    }
  }

  class SimplePopup extends TuiThing {
    constructor(tui, target, anchorFrom, businessFrameClass, arg) {
      super(tui)
      this.businessFrame = new BusinessFrame(tui, businessFrameClass, arg)
      this.scrollFrame = new ScrollFrame(tui, this.businessFrame)
      this.addNode(this.scrollFrame)
      this.businessFrame.autoDagger()
    }

    get business() {
      return this.businessFrame.business
    }

    get desiredRows() {
      const { business } = this
      const { desiredRows: dr } = business
      if (dr !== undefined) {
        return dr
      }
      const { bounds: r } = business
      if (r.isPositive) {
        return r.rows
      }
      return 12
    }

    get desiredCols() {
      const { business } = this
      const { desiredRows: dr } = business
      if (dr !== undefined) {
        return dr
      }
      const { bounds: r } = business
      if (r.isPositive) {
        return r.rows
      }
      return 12
    }

    onResize() {
      const { bounds, scrollFrame } = this
      const { copy: r } = bounds
    
      scrollFrame.setBounds(r)
    }
  }
  // --- exports ----------------------------------------------------
  exports.Modal = Modal

}).call(this);