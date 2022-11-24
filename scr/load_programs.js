(function() {

  const programs = [
    require(`./programs/ComfyLand`),
    require(`./programs/Searchy`),
    require(`./programs/JustGo`),
    require('./programs/ComfyShell'),
    require('./programs/Test'),
    require('./programs/FsFun'),
    require('./programs/ComfyCoin'),
    require('./programs/ComfySettings'),
    require('./programs/OpenAIPlayground'),
  ]
  
  class Directory {
    constructor() {
      
      this.defaultSearchProgram = null
      this.programsByCmd = {}
      this.programsByName = {}
      this.commands = []
      this.programs = programs.map(this.installProgram.bind(this))
    }

    /*
    A program:
    
    const x = require('./programs/sna')
    x == {
      config: ProgramConfig {
        cmds: [...],
        defaultSearchProgram: true or falsy 
      },
      programLauncher: ProgramLauncher {
        name: "sna"
        ...
      }
    }
    */

    installProgram(x) {
      console.log("Processing program entry", x)
      const o = x.programLauncher
      if (o) {
        if (x.config && x.config.defaultSearchProgram)
          this.defaultSearchProgram = o
        
        const { programsByName, programsByCmd, commands } = this
        programsByName[o.name] = o
        x.config.cmds.forEach((cmd) => { 
          console.log(`registering command: ${cmd}`)
          programsByCmd[cmd] = o 
          commands.push(cmd)
        })

      }
      return o
    }
  }

  exports.Directory = Directory
  exports.programs = programs

  console.log("load_programs", exports.programs)

}).call(this)
