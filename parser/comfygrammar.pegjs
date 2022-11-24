{
  // Inintializer code
  const {
    ComfyOperation,

    ComfyUrl,
    ComfyNumber,
    ComfyIdentifier,
    ComfySearchTerms,
    ComfyCommand,
    ComfyError_CommandNotFound

  } = require('../scr/comfy_objects')

  const shellCommands = ['cls', 'help', 'daggers', 'clear_cache']
  console.log("Parsing options", options)
  const { programs } = options
  const commands = programs.concat(shellCommands)

  console.log("PARSING, commands::", commands )
}

Phrasey
  = _ x:Phrase { return x }

Phrase
  = Explicits / Url / LazyUrl / Commandy / SearchTerms

Explicits
  = ExplicitSearch / ExplicitCommand
  
ExplicitSearch
  = [?] _ terms:SearchTerms { return terms }
  
SearchTerms
  = .+ { return new ComfySearchTerms(text()) }

ExplicitCommand
  = [>] _ cmd:Commandy { return cmd } 

Commandy
  = cmd:Command argv:Arguments { return new ComfyCommand(cmd, argv) }

Command 
  = identifier:Identifier { 
      const { text } = identifier

      if (commands.includes(text))
        return text

      throw new ComfyError_CommandNotFound()
    } 

Arguments
  = Argumenty*

Argumenty
  = _ arg:Argument _ { return arg }

Argument
  = Number / Url / LazyUrl / Identifier 

Number "number"
  = [0-9]+([.][0-9]+)? { return new ComfyNumber(text()) }

Identifier
  = [a-zA-Z_][a-zA-Z0-9_]* { return new ComfyIdentifier(text()) }

Url
  = [a-zA-Z][a-zA-Z][a-zA-Z]+[:][/][/].+ {
    return new ComfyUrl(text())
  }

LazyUrl
  = [a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)+([/].+)? {
    return new ComfyUrl('https://' + text())
  }

_ "whitespace"
  = [ \t\n\r]*
              