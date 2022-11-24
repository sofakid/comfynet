(function() {

  const { ComfyTui, Rectangle } = require('./tui/tui')
  const { EmeraldDagger, Goblin } = require('./daggers')

  class Spot {
    constructor(bounds, fGetScreenBounds) {
      this.goblin = new Goblin()
      this.bounds = bounds.copy
      this.getScreenBounds = fGetScreenBounds
      this.dagger = new EmeraldDagger('Emeraldy', this)
      this.onCleanup = () => {}
      this.spawned = []
      this.tui = null
    }

    cleanup() {
      this.onCleanup()
      this.spawned.slice().forEach( (x) => x.cleanup() )
      this.spawned.length = 0
      this.goblin.moksha()
      this.bounds = new Rectangle()
      this.getScreenBounds = () => {}
      this.dagger.vaporize()
      this.dagger = null
      this.tui = null
    }

    overlaps(other) {
      return this.bounds.equals(other.bounds)
    }

    spawnSpot(bounds = null) {
      const r = bounds === null ? this.bounds : bounds
      const s = new Spot(r, this.getScreenBounds)
      this.goblin.stab(s.dagger)
      s.onCleanup = () => {
        this.goblin.unstab(s.dagger)
        this.spawned = this.spawned.filter( (x) => x !== s )
        this.focus()
      }
      this.spawned.push(s)
      const x = this.tui ? this.tui.tag('Spot') : '<null tui>'; 
      //console.log(`spawnSpot ${x}`, this.spawned)
      return s
    }

    preorder_traverse(f) {
      f(this)
      this.spawned.forEach((spot) => {
        spot.preorder_traverse(f)
      })
    }

    makeDirty() {
      const f = (x) => {
        if (x.tui) {
          x.tui.makeDirty()
        }
      }

      this.preorder_traverse((s) => {
        f(s)
      })
    }
    
    focus() {
      const { spawned, tui } = this
      if (spawned && spawned.length > 0) {
        // i don't know how to deal with multiple spawns yet
        tui.comfyProgram.blur()
        const firstSpawn = spawned[0]
        //console.log(`Focus ${this.tui.tag('Spot', firstSpawn.constructor.name)}`)
        firstSpawn.focus()
      }
      else if (tui) {
        //console.log(`Focus ${this.tui.tag('Spot', 'tui')}`, spawned)
        tui.comfyProgram.focus()
      }
    }

    blur() {
      const { spawned, tui } = this
      spawned.forEach((x) => {
        x.blur()
      })
      if (tui) {
        tui.blur()
      }
    }

    setBounds(rect) {
      const { copy: r } = rect
      this.preorder_traverse((spot) => {
        spot.bounds = r
        spot.tui.setBounds(r)
      })
    }

    setBounds_notSpawns(rect) {
      const { copy: r } = rect
      this.bounds = r
      this.tui.setBounds(r)
    }

    render_collect() {
      const { spawned } = this
      if (spawned.length === 0 && this.tui) {
        //console.log("DIRDS 1")
        return this.tui.render_collect()
      }
      else {
        const a = spawned.map((x) => x.render_collect())
        //console.log("DIRDS 2", a)
        return a.reduce((acc, x) => acc.concat(x), [])
      }
    }
  }

  class ProgramLauncher {
    constructor(programClass, name) {
      this.programClass = programClass
      this.name = name
    }
    
    onCmd(cmd, argv, spot) {
      this.launch(spot).start(cmd, argv)
    }

    launch(spot, bounds = null) {
      return new this.programClass(spot.spawnSpot(bounds))
    }
  }

  class Program {
    constructor(name, spot, tuiFrame = null) {
      this.name = name
      this.spot = spot
      this.dagger = null
      this.tui = null
      this.tuiRoot = null
      this.usesTui = (tuiFrame !== null)
      this.hasFocus = false
      this.isRunning = false

      this.cmd = ''
      this.argv = []

      console.log("new Program", tuiFrame)

      this.tuiBuilder = () => new ComfyTui(tuiFrame, this.spot, this)
    }

    cleanup() {
      this.spot.cleanup()
      this.spot = null
      this.dagger = null
      this.tui = null
      this.tuiRoot = null
      this.tuiBuilder = null
      this.usesTui = false
      this.isRunning = false
    }

    start(cmd, argv) {
      this.cmd = cmd
      this.argv = argv
      
      console.log(`Starting program ${name}...`, this)
      this.isRunning = true

      if (this.usesTui) {
        this.tui = this.tuiBuilder()
        this.tuiRoot = this.tui.root
        this.tui.start()
        this.spot.tui = this.tui
      }
      if (this.dagger) {
        console.log(`tui starting :: stabbing dagger ${this.dagger.name}`)
        this.spot.goblin.stab(this.dagger)
      }
      if (this.usesTui) {
        this.focus()
      }
    }

    exit(v = null) {
      this.isRunning = false
      
      if (this.usesTui) {
        this.tui.exit()
      }
      if (this.dagger) {
        const { goblin } = this.spot
        goblin.unstab(this.dagger)
      }
      
      this.cleanup()
    }

    focus() {
      if (this.isRunning) {
        this.hasFocus = true
        if (this.usesTui && this.tui) {
          this.tui.focus()
        }
      }
    }

    blur() {
      if (this.isRunning) {
        this.hasFocus = false
        if (this.usesTui && this.tui) {
          this.tui.blur()
        }
      }
    }

    stdout(text) {
      this.spot.goblin.onStdout(text)
    }

    stderr(text) {
      this.spot.goblin.onStderr(text)
    }

    setBounds(rect) {
      const { copy: r } = rect
      this.bounds = r

      if (this.usesTui && this.tui) {
        this.spot.setBounds_notSpawns(r); 
      }
    }
  }

  class ProgramConfig {
    constructor() {
      this.cmds = []
      this.defaultSearchProgram = null
    }
  }

  exports.Spot = Spot
  exports.Program = Program
  exports.ProgramLauncher = ProgramLauncher
  exports.ProgramConfig = ProgramConfig

}).call(this);