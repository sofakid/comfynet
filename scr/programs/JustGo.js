(function() {

  const axios = require('axios')
  
  const { Program, ProgramConfig, ProgramLauncher } = require('../program')
  const { justgo_aliases } = require('../settings')

  const config = new ProgramConfig()
  config.cmds = ['justgo']
  
  const directory = {
    mail: 'alias',
    amazon: 'alias',
    ebay: 'alias',
    twitter: 'https://www.twitter.com/',
    yt: 'https://youtube.com/',
    tg: 'https://web.telegram.org/',
    classicfm: 'https://www.globalplayer.com/live/classicfm/uk/',
    cars: 'https://www.classiccarsforsale.co.uk/',
    piratebay: 'https://thepiratebay.org/index.html',
    yoroi: 'chrome-extension://ffnbelfdoeiohenkjibnmadjiehjhajb/main_window.html#/my-wallets',
    metamask: 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html',
    solflare: 'chrome-extension://bhhhlbepdkbapadjdnnojkbgioiodbic/wallet.html#/portfolio',
    ccvault: 'chrome-extension://kmhcihpebfmpgmihbkipmjlmmioameka/www/index.html#/app/mainnet/welcome',
    eternl: 'chrome-extension://kmhcihpebfmpgmihbkipmjlmmioameka/www/index.html#/app/mainnet/welcome',
    uphold: 'https://wallet.uphold.com/dashboard',
    openai: 'https://beta.openai.com/playground', 
  }

  config.cmds = config.cmds.concat(Object.keys(directory))
  console.log("JustGo program: config.cmds")

  const single_tab = [ 'telegram', 'tg', 'mail', 'classicfm' ]

  
  class JustGoProgramLauncher extends ProgramLauncher {
    onCmd(cmd, argv, spot) {
      const url = directory[cmd]
      if (url) {
        if (url === 'alias') {
          const onAliasFound = (o) => {
            const urly = o[cmd]
            if (urly) {
              this.goUrl(urly, spot)
            }
            else {
              onNotFound()
            }
          }

          const onNotFound = () => {
            console.log("Run settings, configure JustGo aliases")
          }

          justgo_aliases(onAliasFound, onNotFound)
        }
        else {
          this.goUrl(url, spot)
        }
      }
    }
    
    goUrl(url, spot) {
      spot.goblin.onStdout(`Opening: ${url}\r\n`)
      chrome.tabs.create({ url })
    }
  }

  class JustGoProgram extends Program {
    constructor(spot) {
      super("JustGo", spot)
    }
  }

  exports.programLauncher = new JustGoProgramLauncher(JustGoProgram, 'JustGo')
  exports.config = config

}).call(this);