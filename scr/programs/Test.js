(function() {

  const picasso = require('../picasso')
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')
  const { Image } = require('../tui/image')
  const { SimpleFrame } = require('../tui/frame_things')
  const { Dagger } = require('../daggers')

  const { testy } = require('../testing')

  const config = new ProgramConfig()
  config.cmds = ['test']
  
  const pics = 
  {
    gandalf: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpixel.nymag.com%2Fimgs%2Fdaily%2Fvulture%2F2016%2F11%2F10%2F10-hobbit.w529.h529.jpg&f=1&nofb=1',
  
    beethoven: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.ytimg.com%2Fvi%2F3cvmONlV5WU%2Fhqdefault.jpg&f=1&nofb=1',
  
    redpanda: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.ytimg.com%2Fvi%2F8bg_hdcv0Hs%2Fmaxresdefault.jpg&f=1&nofb=1',
  
    goku: 'https://i.ytimg.com/vi/0fVAKILdU-I/maxresdefault.jpg',
  
    termy: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fsd1_pd5urpQ%2Fmaxresdefault.jpg&f=1&nofb=1',

    dragos: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkolekcijatrajkovic.com%2Fwp-content%2Fuploads%2F2016%2F09%2Fpovratak-hiperborejaca-dragos-kalajic.jpg&f=1&nofb=1',

    frowthgiant: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Wizardborn.jpg',

  }

  

  class MyFrame extends SimpleFrame {
    constructor(tui) {
      super(tui)

      tui.cursorShouldShow = false

      const { cmd, argv } = tui.comfyProgram

      let url

      if (argv.length > 0) {
        const arg = argv[0].text
        url = pics[arg]
      }

      if (!url) {
        url = pics.gandalf
      }

      this.pic = new Image(tui, url)
      
      this.addNode(this.pic)

      this.tuiFocusedDagger = new Dagger('Test.MyFrame')
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
      console.log('MyFrame.onResize', this.bounds)
      const { bounds, pic } = this
      const { copy: r } = bounds
      
      pic.setBounds(r)
    }
  }

  
  class TestProgramLauncher extends ProgramLauncher {
  }

  class TestProgram extends Program {
    constructor(spot) {
      super("test", spot, MyFrame)
    }
  }

  
  exports.programLauncher = new TestProgramLauncher(TestProgram, "TestProgram")
  exports.config = config

}).call(this);