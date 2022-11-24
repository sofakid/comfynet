(function() {
 
  class Dagger {
    constructor(name = "Mysterious dagger") {
      this.name = name
      this.emenations = {}
      this.vaporized = false
    }

    vaporize() {
      this.vaporized = true
      this.emenations = {}
      this.name = null
    }

    onKey(event) {
      const f = this.emenations[event.key]
      return f ? f(event) : false
    }

    onData(event) {
      const f = this.emenations.onData
      return f ? f(event) : false
    }

    onStdout(text) {
      const f = this.emenations.stdout
      console.log(`DAGGER <${this.name}>.onStdout`, f)
      return f ? f(text) : false
    }

    onStderr(text) {
      const f = this.emenations.stderr
      return f ? f(text) : false
    }

    onWheel(event) {
      const f = this.emenations.wheel
      return f ? f(event) : false
    }

    onClick(o) {
      const f = this.emenations.onClick
      return f ? f(o) : false
    }

    onMousePos(o) {
      const f = this.emenations.onMousePos
      return f ? f(o) : false
    }

    onDragStart(o) {
      const f = this.emenations.onDragStart
      return f ? f(o) : false
    }

    onDragPos(o) {
      const f = this.emenations.onDragPos
      return f ? f(o) : false
    }

    onDragEnd(o) {
      const f = this.emenations.onDragEnd
      return f ? f(o) : false
    }
  }

  class EmeraldDagger {
    constructor(name, spot) {
      this.spot = spot
      this.goblin = spot.goblin
      this.name = name
      this.vaporized = false
    }

    vaporize() {
      this.vaporized = true
      this.spot = null
      this.goblin = null
      this.name = null
    }

    onKey(event) {
      //console.log("emerald dagger: ", event.key)
      return this.goblin.onKey(event)
    }

    onData(event) {
      //console.log("emerald dagger onData: ", event)
      return this.goblin.onData(event)
    }

    onStdout(text) {
      return this.goblin.onStdout(text)
    }

    onStderr(text) {
      return this.goblin.onStderr(text)
    }

    onWheel(event) {
      return this.goblin.onWheel(event)
    }

    onClick(o) {
      return this.goblin.onClick(o)
    }

    onMousePos(o) {
      return this.goblin.onMousePos(o)
    }

    onDragStart(o) {
      return this.goblin.onDragStart(o)
    }

    onDragPos(o) {
      return this.goblin.onDragPos(o)
    }

    onDragEnd(o) {
      return this.goblin.onDragEnd(o)
    }
  }

  class Goblin {
    constructor() {
      this.daggers = []
    }

    meditate(f) {
      // slice the daggers (clone) because this.daggers might get modified while looping. 
      const daggers = this.daggers.slice()
      let handled = false
      for (let i = daggers.length - 1; i >= 0; --i) {
        handled = f(daggers[i])
        if (handled)
          break
      }
      return handled
    }

    moksha() {
      this.daggers.forEach((x) => {
        if (x instanceof EmeraldDagger) {
          x.spot.cleanup()
        }
      })
      this.daggers.length = 0
    }

    stab(dagger) {
      //console.log(`Goblin :: stabbing dagger ${dagger.name}`)
      this.unstab(dagger)
      this.daggers.push(dagger)
    }

    unstab(dagger) {
      //console.log(`Goblin :: unstabbing dagger ${dagger.name}`)
      this.daggers = this.daggers.filter((x) => x !== dagger && x.vaporized === false)
    }

    unstabAllDaggers() {
      //console.log(`Goblin :: unstabbing all daggers`)
      this.daggers.length = 0
    }

    onKey(event) {
      //console.log('goblin.onKey', event)
      return this.meditate((dagger) => dagger.onKey(event))
    }

    onData(data) {
      return this.meditate((dagger) => dagger.onData(data))
    }

    onStdout(text) {
      //console.log(`GOBLIN .onStdout 1`, text)
      const x = this.meditate((dagger) => dagger.onStdout(text))
      //console.log(`GOBLIN .onStdout 2`, x)
      return x
    }

    onStderr(text) {
      return this.meditate((dagger) => dagger.onStderr(text))
    }

    onWheel(event) {
      return this.meditate((dagger) => dagger.onWheel(event))
    }
    
    onClick(o) {
      return this.meditate((dagger) => dagger.onClick(o))
    }

    onMousePos(o) {
      return this.meditate((dagger) => dagger.onMousePos(o))
    }

    onDragStart(o) {
      return this.meditate((dagger) => dagger.onDragStart(o))
    }
    
    onDragPos(o) {
      return this.meditate((dagger) => dagger.onDragPos(o))
    }
    
    onDragEnd(o) {
      return this.meditate((dagger) => dagger.onDragEnd(o))
    }
    
  }

  exports.Dagger = Dagger
  exports.EmeraldDagger = EmeraldDagger
  exports.Goblin = Goblin

}).call(this)
