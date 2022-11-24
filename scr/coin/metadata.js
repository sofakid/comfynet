(function() {
  
  const { TuiThing } = require('../tui/tui')
  const { Label } = require('../tui/things')
  const { Image } = require('../tui/image')
  const { ansiColours } = require('../picasso')

  const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const percent = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const plain = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const whole = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  // --- CoinMetadata --------------------------------------------
  class CoinMetadata extends TuiThing {
    constructor(tui) {
      super(tui)
      this.metadata = null
      this.description = null
      this.logo = null
      this.name = null
      this.symbol = null
      
      this.quote = null
      this.price = null
      this.market_cap = null
      this.fully_market_cap = null
      this.volume_24h = null
      this.percents = null

      this.circulating_supply = null
      this.total_supply = null
      this.max_supply = null
      this.num_market_pairs = null

      // lunarcrush data
      this.galaxy_score = null
      this.alt_rank = null
      this.market_cap_rank = null
      this.volatility = null
      this.average_sentiment = null
      this.price_score = null

      this.news_calc_24h = null
      this.news_calc_24h_percent = null
      this.tweet_spam_calc_24h = null
      this.tweet_spam_calc_24h_percent = null
      this.social_score_calc_24h = null
      this.social_score_calc_24h_percent = null
      this.social_volume_calc_24h = null
      this.social_volume_calc_24h_percent = null
      this.social_contributors_calc_24h = null
      this.social_contributors_calc_24h_percent = null
      this.url_shares_calc_24h = null
      this.url_shares_calc_24h_percent = null

      this.correlation_rank = null
      this.market_dominance = null
      this.social_dominance = null

      console.log("CoinMetadata constructor done")
    }

    onMetadata(o) {
      console.log("CoinMetadata onMetadata")

      const { tui } = this
      this.metadata = o
      this.logo = new Image(tui, o.logo)
      this.logo.width = 64
      this.logo.height = 64
      this.logo.brightenIfAllBlack = true
      this.addNode(this.logo)

      const {
        white: description_colour, 
        hi_white: name_colour,
        hi_yellow: symbol_colour 
      } = ansiColours

      //const description_decorator = (x) => `${description_colour}${x}`
      //this.description = new LabelBox(tui, o.description, description_decorator)
      //this.addNode(this.description)

      this.name = new Label(tui, `${name_colour}${o.name}`, o.name.length)
      this.symbol = new Label(tui, `${symbol_colour}${o.symbol}`, o.symbol.length)
      this.addNode(this.name)
      this.addNode(this.symbol)
      
      this.onResize()

    }

    onQuote(o) {
      console.log("CoinMetadata onQuote")

      const { tui } = this
      this.quote = o

      const q = o.quote.USD

      const { white, hi_green, hi_red, hi_cyan, hi_blue } = ansiColours
      
      const up_h = q.percent_change_1h > 0
      const up_d = q.percent_change_24h > 0
      const up_w = q.percent_change_7d > 0
      const up_m = q.percent_change_30d > 0

      const plus_h = up_h ? '+' : ''
      const plus_d = up_d ? '+' : ''
      const plus_w = up_w ? '+' : ''
      const plus_m = up_m ? '+' : ''
      
      const c_price = up_d ? hi_green : hi_red

      const c_percent_h = up_h ? hi_green : hi_red
      const c_percent_d = up_d ? hi_green : hi_red
      const c_percent_w = up_w ? hi_green : hi_red
      const c_percent_m = up_m ? hi_green : hi_red

      const c_plain = white
      const c_market_cap = hi_cyan
      const c_field = hi_blue

      const x_fully_market_cap = q.price * o.max_supply

      const price              = `${usd.format(q.price)}`
      const percent_h          = `${c_percent_h}${plus_h}${percent.format(q.percent_change_1h)}%`
      const percent_d          = `${c_percent_d}${plus_d}${percent.format(q.percent_change_24h)}%`
      const percent_w          = `${c_percent_w}${plus_w}${percent.format(q.percent_change_7d)}%`
      const percent_m          = `${c_percent_m}${plus_m}${percent.format(q.percent_change_30d)}%`
      const percents           = `${c_field}  %(H, D, W, M): ${percent_h}  ${percent_d}  ${percent_w}  ${percent_m}`
      const volume_24h         = `${c_field}         Volume: ${c_plain}${plain.format(q.volume_24h)}`
      const market_cap         = `${c_field}     Market Cap: ${c_market_cap}${usd.format(q.market_cap)}`
      const fully_market_cap   = `${c_field}Ful Dlt Mkt Cap: ${c_market_cap}${usd.format(x_fully_market_cap)}`
      const circulating_supply = `${c_field}    Circ Supply: ${c_plain}${plain.format(o.circulating_supply)}`
      const max_supply         = `${c_field}     Max Supply: ${c_plain}${plain.format(o.max_supply)}`
      const total_supply       = `${c_field}   Total Supply: ${c_plain}${plain.format(o.total_supply)}`
      const num_market_pairs   = `${c_field}   Market Pairs: ${c_plain}${plain.format(o.num_market_pairs)}`


      this.price              = new Label(tui, `${c_price}${price}`, price.length)
      this.percents           = new Label(tui, percents)
      this.volume_24h         = new Label(tui, volume_24h)
      this.market_cap         = new Label(tui, market_cap)
      this.fully_market_cap   = new Label(tui, fully_market_cap)

      this.circulating_supply = new Label(tui, circulating_supply)
      this.total_supply       = new Label(tui, max_supply)
      this.max_supply         = new Label(tui, total_supply)
      this.num_market_pairs   = new Label(tui, num_market_pairs)

      this.addNode(this.price)
      this.addNode(this.percents)
      this.addNode(this.volume_24h)
      this.addNode(this.market_cap)
      this.addNode(this.fully_market_cap)

      this.addNode(this.circulating_supply)
      this.addNode(this.total_supply)
      this.addNode(this.max_supply)
      this.addNode(this.num_market_pairs)

      this.onResize()

    }

    onLunarCrushAssets(o) {
      const { tui } = this
      const { white, hi_green, hi_red, hi_cyan, hi_blue, hi_white } = ansiColours
      
      const c_plain = white
      const c_percent = hi_white
      const c_field = hi_blue

      const galaxy_score                          = `${c_field}      Galaxy Score: ${c_plain}${plain.format(o.galaxy_score)}`
      const alt_rank                              = `${c_field}          Alt-Rank: ${c_plain}${whole.format(o.alt_rank)}`
      const market_cap_rank                       = `${c_field}      Mkt Cap Rank: ${c_plain}${whole.format(o.market_cap_rank)}`
      const volatility                            = `${c_field}        Volitility: ${c_plain}${plain.format(o.volatility)}`
      const average_sentiment                     = `${c_field} Average Sentiment: ${c_plain}${plain.format(o.average_sentiment)}`
      const price_score                           = `${c_field}       Price Score: ${c_plain}${plain.format(o.price_score)}`
      
      const news_calc_24h                         = `${c_field}              News: ${c_plain}${whole.format(o.news_calc_24h)}`
      const tweet_spam_calc_24h                   = `${c_field}        Tweet Spam: ${c_plain}${whole.format(o.tweet_spam_calc_24h)}`
      const social_score_calc_24h                 = `${c_field}      Social Score: ${c_plain}${whole.format(o.social_score_calc_24h)}`
      const social_volume_calc_24h                = `${c_field}     Social Volume: ${c_plain}${whole.format(o.social_volume_calc_24h)}`
      const social_contributors_calc_24h          = `${c_field}    Social Contrib: ${c_plain}${whole.format(o.social_contributors_calc_24h)}`
      const url_shares_calc_24h                   = `${c_field}        URL Shares: ${c_plain}${whole.format(o.url_shares_calc_24h)}`
      
      const market_dominance                      = `${c_field}  Market Dominance: ${c_plain}${plain.format(o.market_dominance)}`
      const social_dominance                      = `${c_field}  Social Dominance: ${c_plain}${plain.format(o.social_dominance)}`
      const correlation_rank                      = `${c_field}  Correlation Rank: ${c_plain}${plain.format(o.correlation_rank)}`
      
      const news_calc_24h_percent                 = `${c_percent}${plain.format(o.news_calc_24h_percent)}%`
      const tweet_spam_calc_24h_percent           = `${c_percent}${plain.format(o.tweet_spam_calc_24h_percent)}%`
      const social_score_calc_24h_percent         = `${c_percent}${plain.format(o.social_score_calc_24h_percent)}%`
      const social_volume_calc_24h_percent        = `${c_percent}${plain.format(o.social_volume_calc_24h_percent)}%`
      const social_contributors_calc_24h_percent  = `${c_percent}${plain.format(o.social_contributors_calc_24h_percent)}%`
      const url_shares_calc_24h_percent           = `${c_percent}${plain.format(o.url_shares_calc_24h_percent)}%`


      this.galaxy_score = new Label(tui, galaxy_score)
      this.alt_rank = new Label(tui, alt_rank)
      this.market_cap_rank = new Label(tui, market_cap_rank)
      this.volatility = new Label(tui, volatility)
      this.average_sentiment = new Label(tui, average_sentiment)
      this.price_score = new Label(tui, price_score)

      this.news_calc_24h = new Label(tui, news_calc_24h)
      this.news_calc_24h_percent = new Label(tui, news_calc_24h_percent)
      this.tweet_spam_calc_24h = new Label(tui, tweet_spam_calc_24h)
      this.tweet_spam_calc_24h_percent = new Label(tui, tweet_spam_calc_24h_percent)
      this.social_score_calc_24h = new Label(tui, social_score_calc_24h)
      this.social_score_calc_24h_percent = new Label(tui, social_score_calc_24h_percent)
      this.social_volume_calc_24h = new Label(tui, social_volume_calc_24h)
      this.social_volume_calc_24h_percent = new Label(tui, social_volume_calc_24h_percent)
      this.social_contributors_calc_24h = new Label(tui, social_contributors_calc_24h)
      this.social_contributors_calc_24h_percent = new Label(tui, social_contributors_calc_24h_percent)
      this.url_shares_calc_24h = new Label(tui, url_shares_calc_24h)
      this.url_shares_calc_24h_percent = new Label(tui, url_shares_calc_24h_percent)

      this.correlation_rank = new Label(tui, correlation_rank)
      this.market_dominance = new Label(tui, market_dominance)
      this.social_dominance = new Label(tui, social_dominance)

      this.addNode(this.galaxy_score)
      this.addNode(this.alt_rank)
      this.addNode(this.market_cap_rank)
      this.addNode(this.volatility)
      this.addNode(this.average_sentiment)
      this.addNode(this.price_score)

      
      this.addNode(this.news_calc_24h)
      this.addNode(this.news_calc_24h_percent)
      this.addNode(this.tweet_spam_calc_24h)
      this.addNode(this.tweet_spam_calc_24h_percent)
      this.addNode(this.social_score_calc_24h)
      this.addNode(this.social_score_calc_24h_percent)
      this.addNode(this.social_volume_calc_24h)
      this.addNode(this.social_volume_calc_24h_percent)
      this.addNode(this.social_contributors_calc_24h)
      this.addNode(this.social_contributors_calc_24h_percent)
      this.addNode(this.url_shares_calc_24h)
      this.addNode(this.url_shares_calc_24h_percent)

      this.addNode(this.correlation_rank)
      this.addNode(this.market_dominance)
      this.addNode(this.social_dominance)


      this.onResize()
    }

    onResize() {
      if (this.metadata === null) {
        return
      } 

      const { bounds, logo, description, name, symbol } = this
      
      const { copy: r } = bounds
 
      const padh = 1
      const padw = 2

      r.removeFromTop(padh)
      r.removeFromBottom(padh)
      r.removeFromLeft(padw)
      r.removeFromRight(padw)

      const logo_h = 12
      const logo_w = logo_h * 2

      const r_top = r.removeFromTop(logo_h)
      r.removeFromTop(padh)

      const r_logo = r_top.removeFromLeft(logo_w)
      logo.setBounds(r_logo)
      
      r_top.removeFromLeft(padw)

      const r_topline = r_top.removeFromTop(1)
      const r_name = r_topline.removeFromLeft(name.length)
      r_topline.removeFromLeft(padw)
      const r_symbol = r_topline.removeFromLeft(symbol.length)

      r_name.removeFromBottom(1)
      r_symbol.removeFromBottom(1)

      name.setBounds(r_name)
      symbol.setBounds(r_symbol)

      // ---------------------
      const { 
        price, market_cap, fully_market_cap, volume_24h, percents, 
        circulating_supply, total_supply, max_supply, num_market_pairs,
      } = this

      if (price !== null) {
        r_topline.removeFromLeft(padw * 2)
        const r_price = r_topline.removeFromLeft(price.length)
        r_topline.removeFromLeft(padw)
        price.setBounds(r_price)
  
        // percents
        r_top.removeFromTop(1)
        percents.setBounds(r_top.removeFromTop(1))
        
        r_top.removeFromTop(1)
        volume_24h.setBounds(r_top.removeFromTop(1))
        market_cap.setBounds(r_top.removeFromTop(1))
        fully_market_cap.setBounds(r_top.removeFromTop(1))
  
        r_top.removeFromTop(1)
  
        circulating_supply.setBounds(r_top.removeFromTop(1))
        total_supply.setBounds(r_top.removeFromTop(1))
        max_supply.setBounds(r_top.removeFromTop(1))
        num_market_pairs.setBounds(r_top.removeFromTop(1))
      }

      // --- lunarcrush ----
      const { galaxy_score, alt_rank, market_cap_rank, volatility, average_sentiment, price_score, 
        news_calc_24h, news_calc_24h_percent, tweet_spam_calc_24h, tweet_spam_calc_24h_percent, 
        social_score_calc_24h, social_score_calc_24h_percent, social_volume_calc_24h, 
        social_volume_calc_24h_percent, social_contributors_calc_24h, social_contributors_calc_24h_percent, 
        url_shares_calc_24h, url_shares_calc_24h_percent, correlation_rank, market_dominance, social_dominance
      } = this

      if (galaxy_score !== null) {
        r.removeFromTop(1)
  
        galaxy_score.setBounds(r.removeFromTop(1))
        alt_rank.setBounds(r.removeFromTop(1))
        market_cap_rank.setBounds(r.removeFromTop(1))
        volatility.setBounds(r.removeFromTop(1))
        average_sentiment.setBounds(r.removeFromTop(1))
        price_score.setBounds(r.removeFromTop(1))

        const r_right = r.removeFromTop(6)
        const r_left = r_right.removeFromLeft(35)

        news_calc_24h.setBounds(r_left.removeFromTop(1))
        tweet_spam_calc_24h.setBounds(r_left.removeFromTop(1))
        social_score_calc_24h.setBounds(r_left.removeFromTop(1))
        social_volume_calc_24h.setBounds(r_left.removeFromTop(1))
        social_contributors_calc_24h.setBounds(r_left.removeFromTop(1))
        url_shares_calc_24h.setBounds(r_left.removeFromTop(1))
        
        news_calc_24h_percent.setBounds(r_right.removeFromTop(1))
        tweet_spam_calc_24h_percent.setBounds(r_right.removeFromTop(1))
        social_score_calc_24h_percent.setBounds(r_right.removeFromTop(1))
        social_volume_calc_24h_percent.setBounds(r_right.removeFromTop(1))
        social_contributors_calc_24h_percent.setBounds(r_right.removeFromTop(1))
        url_shares_calc_24h_percent.setBounds(r_right.removeFromTop(1))
        
        correlation_rank.setBounds(r.removeFromTop(1))
        market_dominance.setBounds(r.removeFromTop(1))
        social_dominance.setBounds(r.removeFromTop(1))
      }

      // ---------------------
      //description.setBounds(r)
    }
  }

  // --- exports ------------------------------------------------
  exports.CoinMetadata = CoinMetadata

}).call(this)