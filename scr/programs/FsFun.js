(function() {

  const { Dagger } = require('../daggers')
  const { ansiColours: c } = require('../picasso')
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')
  const { Label, Box } = require('../tui/things')
  const { ScrollFrame, SimpleFrame } = require('../tui/frame_things')
  const { TuiThing } = require('../tui/tui')

  const config = new ProgramConfig()
  config.cmds = ['fsfun']

  class BunchOfBoxes extends TuiThing {
    constructor(tui) {
      super(tui)

      const f = (colour) => new Box(tui, ' ', [colour])
      
      this.boxNames = ['1', '2', '3', '4', '5', '6']
      const colours = [c.bg_yellow, c.bg_cyan, c.bg_green, c.bg_red, c.bg_blue, c.bg_magenta]
      
      this.boxes = colours.map((x) => f(x))

      this.boxes.forEach((x, i) => {
        const dagger = new Dagger('box click')
        x.tuiFocusedDagger = dagger
        x.tuiBlurredDagger = dagger
        dagger.emenations = {
          'onClick': (o) => {
            console.log(`Box ${i} clicked <${o.row}, ${o.col}>: ${x.hitTest(o.row, o.col)}`, x.getScreenBounds())
          }
        }

        this.addNodeAndDagger(x)
      })
    }

    onResize() {
      const { copy: r } = this.bounds
      
      const pad = 1
      r.removeFromTop(pad)
      //r.removeFromLeft(pad)
      //r.removeFromRight(pad)
      r.removeFromBottom(pad)
      
      // const { boxes } = this
      // const boxHeight = Math.floor(r.rows / boxes.length)
      // boxes.forEach((box) => {
      //   let x = r.removeFromTop(boxHeight)
      //   box.setBounds(x)
      //   r.removeFromTop(pad)
      // })

      // const { boxes } = this
      // const boxWidth = Math.floor(r.cols / boxes.length)
      // boxes.forEach((box) => {
      //   let x = r.removeFromRight(boxWidth)
      //   box.setBounds(x)
      //   r.removeFromTop(pad)
      // })

      const { boxes } = this
      const half_h = Math.floor(r.rows / 2)
      const half_w = Math.floor(r.cols / 2)
      const boxWidth = Math.floor(r.cols / boxes.length)
      let i = -1
      let r_top_half = null, r_bottom_half = null, r_right_one = null, r_right_two = null
      boxes.forEach((box) => {
        ++i

        switch (i) {
          case 0: {
            r_top_half = r.removeFromTop(half_h)
            box.setBounds(r_top_half)
            break
          }

          case 1: {
            r_bottom_half = r.removeFromTop(half_h)
            box.setBounds(r_bottom_half)
            break
          }

          case 2: {
            // should be zero sized
            box.setBounds(r)
            break
          }

          case 3: {
            r_right_one = r_top_half.removeFromRight(1)
            box.setBounds(r_right_one)
            break
          }

          case 4: {
            const { copy: rx } = r_bottom_half
            const { cols: w } = rx
            rx.removeFromLeft(w - 1)
            r_right_two = rx
            box.setBounds(r_right_two)
            break
          }
        }
        
      })
    }
  }

  class ScrollFrameView extends TuiThing {
    constructor(tui) {
      super(tui)
      this.boxes = new BunchOfBoxes(tui)
      this.addNode(this.boxes)
    }

    onResize() {
      this.boxes.setBounds(this.bounds)
    }
  }

  class MyFrame extends SimpleFrame {
    constructor(tui) {
      super(tui)

      this.tui.cursorShouldShow = false
      console.log("new myframe")
      this.scrollView = new ScrollFrameView(tui)
      this.scrollFrame = new ScrollFrame(tui, this.scrollView)
      this.addNode(this.scrollFrame)

      this.scrollFrame.viewSize.rows = 60
      
      this.funtimes = new Label(tui, 'funtimes')
      this.addNode(this.funtimes)

      this.tuiFocusedDagger = new Dagger('FsFun')
      this.tuiFocusedDagger.emenations = {
        'Enter': (event) => {
          this.tui.comfyProgram.exit()
        },
        'Escape': (event) => {
          this.tui.comfyProgram.exit()
        },
      }
    }

    onResize() {
      super.onResize()
      //console.log('MyFrame.onResize', this.bounds)
      const { bounds, funtimes, scrollFrame } = this
      const { copy: r } = bounds
      const { rows, cols } = r
      scrollFrame.viewSize.cols = cols
      
      funtimes.setBounds(r.removeFromTop(1))
      scrollFrame.setBounds(r)
    }
  }

  class FsFunLauncher extends ProgramLauncher {
    onCmd(cmd, argv, spot) {
      this.launch(spot).start()
    }
  }

  class FsFun extends Program {
    constructor(spot) {
      super("FsFun", spot, MyFrame)
    }
  }

  exports.programLauncher = new FsFunLauncher(FsFun, "FsFun")
  exports.config = config

}).call(this)