(function () {
  const Url = require("url-parse")
  const ignore_current_location = {}
  
  class ComfyThing {
    constructor(text = 'ComfyThing') {
      this.text = text
    }
  }

  // --- Nonterminals ------------------------------------------------
  class ComfyCommand extends ComfyThing {
    constructor(cmd, argv) {
      super(cmd)
      this.cmd = cmd
      this.argv = argv
    }
  }

  // --- Terminals ------------------------------------------------
  class ComfyUrl extends ComfyThing {
    constructor(urlText) {
      super(urlText)
      this.url = new Url(urlText, ignore_current_location)
      this.href = this.url.href
    }
  }

  class ComfyNumber extends ComfyThing {
    constructor(text) {
      super(text)
      this.value = parseFloat(text)
    }
  }

  class ComfyIdentifier extends ComfyThing {
    constructor(text) {
      super(text)
    }
  }

  class ComfySearchTerms extends ComfyThing {
    constructor(text) {
      super(text)
    }
  }


  // --- Misc ---------------------------------------------------
  class ComfyError_CommandNotFound {
  }

  // --- Exports ------------------------------------------------
  exports.ComfyThing = ComfyThing
  exports.ComfyUrl = ComfyUrl
  exports.ComfyNumber = ComfyNumber
  exports.ComfyIdentifier = ComfyIdentifier
  exports.ComfySearchTerms = ComfySearchTerms
  exports.ComfyCommand = ComfyCommand

  exports.ComfyError_CommandNotFound = ComfyError_CommandNotFound

}).call(this)




