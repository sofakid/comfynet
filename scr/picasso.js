(function() {

  const load_image = require('blueimp-load-image')
  const pngjs = require('pngjs')

  const { chunkString } = require('./miscy')

  const esc = '\x1B['
  const seq = (... listy) => esc + listy.join(';') + 'm'
  
  const black   = '30'
  const red     = '31'
  const green   = '32'
  const yellow  = '33'
  const blue    = '34'
  const magenta = '35'
  const cyan    = '36'
  const white   = '37'
  
  const hi_black   = '90'
  const hi_red     = '91'
  const hi_green   = '92'
  const hi_yellow  = '93'
  const hi_blue    = '94'
  const hi_magenta = '95'
  const hi_cyan    = '96'
  const hi_white   = '97'
  
  const bg_black   = '40'
  const bg_red     = '41'
  const bg_green   = '42'
  const bg_yellow  = '43'
  const bg_blue    = '44'
  const bg_magenta = '45'
  const bg_cyan    = '46'
  const bg_white   = '47'
  
  const bg_hi_black   = '100'
  const bg_hi_red     = '101'
  const bg_hi_green   = '102'
  const bg_hi_yellow  = '103'
  const bg_hi_blue    = '104'
  const bg_hi_magenta = '105'
  const bg_hi_cyan    = '106'
  const bg_hi_white   = '107';    

  const bold = '1'
  const norm = '0'
  
  const rst = `${esc}0m`

  const promptSuffix = 
    seq(bold, hi_black) + '>' + 
    seq(bold, blue) + '>' + 
    seq(bold, hi_cyan) + '> ' + 
    rst

  exports.promptSuffix = promptSuffix

  exports.prompt = (text = 'lol internet') => (
    seq(bold, magenta) + text + promptSuffix
  )

  exports.renderKeyOption = (key, suffix, prefix = null) => {
    const c_norm = seq(bold, hi_magenta)
    const c_key = seq(bold, hi_white)
    const c_bracket = seq(norm, white)

    let s = ''

    if (prefix) {
      s += `${c_norm}${prefix}`
    }
    s +=  `${c_bracket}[${c_key}${key}${c_bracket}]${c_norm}${suffix}`
    return s
  }

  exports.renderOptions = (o) => {
    const slash = seq(bold, cyan) + ' / '
    let s = ''
    let preSlash = ''
    
    o.forEach((x) => {
      s += preSlash + x
      preSlash = slash
    })

    return s
  }

  exports.response = (text) => (
    seq(norm, hi_cyan) + '   ' + text + rst
  )

  exports.debugging = (text) => (
    seq(norm, hi_green) + '   ' + text + rst
  )

  exports.c = {
    esc,
    
    black,
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    white,
    
    hi_black,
    hi_red,
    hi_green,
    hi_yellow,
    hi_blue,
    hi_magenta,
    hi_cyan,
    hi_white,
    
    bg_black,
    bg_red,
    bg_green,
    bg_yellow,
    bg_blue,
    bg_magenta,
    bg_cyan,
    bg_white,
    
    bg_hi_black,
    bg_hi_red,
    bg_hi_green,
    bg_hi_yellow,
    bg_hi_blue,
    bg_hi_magenta,
    bg_hi_cyan,
    bg_hi_white,    

    bold,
    norm,
    
    rst,
  }

  const ansiColours = {
    esc, 
    
    black: seq(norm, black),
    red: seq(norm, red),
    green: seq(norm, green),
    yellow: seq(norm, yellow),
    blue: seq(norm, blue),
    magenta: seq(norm, magenta),
    cyan: seq(norm, cyan),
    white: seq(norm, white),
    
    hi_black: seq(bold, black),
    hi_red: seq(bold, red),
    hi_green: seq(bold, green),
    hi_yellow: seq(bold, yellow),
    hi_blue: seq(bold, blue),
    hi_magenta: seq(bold, magenta),
    hi_cyan: seq(bold, cyan),
    hi_white: seq(bold, white),
    
    bg_black: seq(bg_black),
    bg_red: seq(bg_red),
    bg_green: seq(bg_green),
    bg_yellow: seq(bg_yellow),
    bg_magenta: seq(bg_magenta),
    bg_cyan: seq(bg_cyan),
    bg_blue: seq(bg_blue),
    bg_white: seq(bg_white),

    bg_hi_black: seq(bg_hi_black),
    bg_hi_red: seq(bg_hi_red),
    bg_hi_green: seq(bg_hi_green),
    bg_hi_yellow: seq(bg_hi_yellow),
    bg_hi_blue: seq(bg_hi_blue),
    bg_hi_magenta: seq(bg_hi_magenta),
    bg_hi_cyan: seq(bg_hi_cyan),
    bg_hi_white: seq(bg_hi_white),

    rst: '\x1b[m', 
  }
  exports.ansiColours = ansiColours

  exports.fgRgb = (r, g, b) => {
    const fg_code = `${esc}38;2`
    return `${fg_code};${r.toFixed(0)};${g.toFixed(0)};${b.toFixed(0)}m`
  }

  exports.bgRgb = (r, g, b) => {
    const bg_code = `${esc}48;2`
    return `${bg_code};${r.toFixed(0)};${g.toFixed(0)};${b.toFixed(0)}m`
  }

  const nl = '\r\n'
  
  const save_state = '\x1b7'
  const restore_state = '\x1b8'
  
  function set_pos(row, col) {
    return `\x1b[${row};${col}f`
  }

  function place_text(text, row, col) {
    let i = 0
    return text.split(/\r?\n/)
      .map((line) => `${set_pos(row + i++, col)}${line}`)
      .join('')
  }
  
  function place_text_list(listy) {
    return listy.map(([ text, row, col ]) => place_text(text, row, col)).join('')
  }

  exports.save_state = save_state
  exports.restore_state = restore_state
  exports.set_pos = set_pos
  exports.place_text = place_text
  exports.place_text_list = place_text_list

  // xtermjs does links differently, but this is how it's done elsewhere.
  // '\e]8;;http://example.com\e\\This is a link\e]8;;\e\\\n'
  function hyperlink(url, text) {
    const e = '\x1B'
    const a = `${e}]8;;`
    const b = `${e}\\`
    const c = `${e}]8;;${e}\\`
    return `${a}${url}${b}${text}${c}`
  }
  
  function normalPicRender(data, w, h) {
    
    const { length } = data
    const colour = `${esc}48;2`
    const rst = `${esc}0m`
      
    let ansi = ''
    let i = 0
    const iTest = () => (i + 4 <= length)

    for (let y = 0; y < h && iTest(); ++y) {
      for (let x = 0; x < w && iTest(); ++x) {
        const r = data[i++]
        const g = data[i++]
        const b = data[i++]
        const a = data[i++]

        ansi += a === 0 ? `${rst}  ` : `${colour};${r};${g};${b}m  `
      }
      // ansi += rst
      // break
      ansi += `${rst}\r\n`
    }
    return ansi
  }

  function subpixelPicRender(data, w, h) {
    const fg_colour = `${esc}38;2`
    const bg_colour = `${esc}48;2`
    const upper_half_block = '\u2580'

    const { length } = data
    let ansi = ''
    let i = 0
    const iTest = (x) => (i + x <= length)

    // round up to even
    const hh = h + (h % 2)

    const fgs = new Array(w)
    const bgs = new Array(w)

    for (let y = 0; y < hh; y += 2) {

      let k = 0

      for (let x = 0; x < w && iTest(4); ++x) {
        const r = data[i++]
        const g = data[i++]
        const b = data[i++]
        const a = data[i++]
        fgs[k++] = (a === 0) ? '' : `${fg_colour};${r};${g};${b}m`
      }

      k = 0

      for (let x = 0; x < w; ++x) {
        const oddness = !iTest(4)
        const r = oddness ? 0 : data[i++]
        const g = oddness ? 0 : data[i++]
        const b = oddness ? 0 : data[i++]
        const a = oddness ? 0 : data[i++]
        bgs[k++] = (a === 0) ? '' : `${bg_colour};${r};${g};${b}m`
      }

      for (k = 0; k < w; ++k) {
        ansi += rst + fgs[k] + bgs[k] + upper_half_block
      }
  
      // ansi += rst
      // break
      ansi += `${rst}\r\n`
    }
    return ansi
  }

  function sRGBtoLin(colorChannel) {
    // Send this function a decimal sRGB gamma encoded color value
    // between 0.0 and 1.0, and it returns a linearized value.
    if ( colorChannel <= 0.04045 )
      return colorChannel / 12.92

    return Math.pow(((colorChannel + 0.055) / 1.055), 2.4)
  }

  function YtoLstar(Y) {
    // Send this function a luminance value between 0.0 and 1.0,
    // and it returns L* which is "perceptual lightness"
    if (Y <= (216 / 24389))
      return Y * (24389 / 27)

    return Math.pow(Y, 1 / 3) * 116 - 16
  }

  // L* is a value from 0 (black) to 100 (white) where 50 is the perceptual "middle grey".
  // L* = 50 is the equivalent of Y = 18.4, or in other words an 18% grey card, 
  // representing the middle of a photographic exposure (Ansel Adams zone V).
  //  -- thanks stackoverflow
  function calculatePerceivedLuminance(sR, sG, sB) {
    const vR = sR / 255
    const vG = sG / 255
    const vB = sB / 255

    const Y = 0.2126 * sRGBtoLin(vR) + 0.7152 * sRGBtoLin(vG) + 0.0722 * sRGBtoLin(vB)

    return YtoLstar(Y)
  }
  
  class ColourRecord {
    constructor(r, g, b, l) {
      this.r = Math.floor(r)
      this.g = Math.floor(g)
      this.b = Math.floor(b)
      this.l = l
    }
  }

  const null_colour = new ColourRecord(0,0,0,0)
  const overbright_white_colour = new ColourRecord(255,255,255,1000)
  
  function seperateLightAndDark(lightest_to_darkest) {
    const n = lightest_to_darkest.length
    const mid = (lightest_to_darkest[0].l + lightest_to_darkest[n - 1].l) / 2
    
    const lighter = (x) => (x.l >= mid)
    const darker = (x) => (x.l < mid)

    const light = lightest_to_darkest.filter(lighter)
    const dark = lightest_to_darkest.filter(darker)

    return [ light, dark ]
  }

  function selectLightest(listy) {
    let o = null_colour
    listy.forEach((x) => {
      if (x.l >= o.l) {
        o = x
      }
    })
    return o
  }
  
  function selectDarkest(listy) {
    let o = overbright_white_colour
    listy.forEach((x) => {
      if (x.l <= o.l) {
        o = x
      }
    })
    return o
  }

  function averageColour(colorRecords) {
    const n = colorRecords.length
    if (n === 0) 
      return null_colour
    
    const sumSquaresReducerR = (accum, x) => accum + (x.r * x.r)
    const sumSquaresReducerG = (accum, x) => accum + (x.g * x.g)
    const sumSquaresReducerB = (accum, x) => accum + (x.b * x.b)

    const f = (x) => Math.sqrt(x / n)

    const r = f(colorRecords.reduce(sumSquaresReducerR, 0))
    const g = f(colorRecords.reduce(sumSquaresReducerG, 0))
    const b = f(colorRecords.reduce(sumSquaresReducerB, 0))

    return new ColourRecord(r, g, b, 0)
  }

  function quadPixelPicRender(data, w, h) {
    const fg_colour = `${esc}38;2`
    const bg_colour = `${esc}48;2`
    
    const makeFgColour = (c) => `${fg_colour};${c.r.toFixed(0)};${c.g.toFixed(0)};${c.b.toFixed(0)}m`
    const makeBgColour = (c) => `${bg_colour};${c.r.toFixed(0)};${c.g.toFixed(0)};${c.b.toFixed(0)}m`
   
    const quad_ALL = '\u2588';   // █

    const quad_LL = '\u2596';    // ▖
    const quad_UL = '\u2598';    // ▘
    const quad_LR = '\u2597';    // ▗
    const quad_UR = '\u259D';    // ▝

    const quad_UB = '\u2580';    // ▀
    const quad_LB = '\u2584';    // ▄
    const quad_BL = '\u258C';    // ▌
    const quad_BR = '\u2590';    // ▐
    const quad_UL_LR = '\u259A'; // ▚
    const quad_LL_UR = '\u259E'; // ▞

    const quad_BL_UR = '\u259B'; // ▛
    const quad_BL_LR = '\u2599'; // ▙
    const quad_UL_BR = '\u259C'; // ▜
    const quad_LL_BR = '\u259F'; // ▟
    
    const { length } = data
    let ansi = ''
    let i = 0
    const iTest = (x) => (i + x <= length)

    // round up to even
    const ww = w + (w % 2)
    const hh = h + (h % 2)

    const sideOddness = ww > w
    const bottomOddness = hh > h

    const fgs = new Array(ww)
    const bgs = new Array(ww)

    const u_colours = new Array(ww)
    const l_colours = new Array(ww)

    const getColourRecord = (oddness = false) => {
      if (oddness)
        return new ColourRecord(0,0,0,0)

      let r = data[i++]
      let g = data[i++]
      let b = data[i++]
      const a = data[i++]

      if (a === 0) {
        r = g = b = 0
      }

      const lum = calculatePerceivedLuminance(r, g, b)
      return new ColourRecord(r, g, b, lum); 
    }

    for (let y = 0; y < hh; y += 2) {

      // collect colour records
      let k = 0
      for (let x = 0; x < ww && iTest(4); x += 2) {
        u_colours[k++] = getColourRecord()
        u_colours[k++] = getColourRecord(sideOddness && (x === w))
      }

      k = 0
      for (let x = 0; x < ww && iTest(4); x += 2) {
        l_colours[k++] = getColourRecord()
        l_colours[k++] = getColourRecord(bottomOddness && (y === h))
      }

      // go through them four at a time
      for (k = 0; k < ww; k += 2) {
        const ul = u_colours[k]
        const ll = l_colours[k]
        const ur = u_colours[k + 1]
        const lr = l_colours[k + 1]
        
        const lightest_to_darkest = [ul, ll, ur, lr].sort((a, b) => (b.lum - a.l))
        const [ lightest, darkest ] = seperateLightAndDark(lightest_to_darkest)
        
        let fg = ''
        let bg = ''
       
        let char = 'X'
        switch (lightest.length) {
          
          case 4:
            char = ' '
            bg = makeBgColour(averageColour(lightest))
            break

          case 3:
            // swap colours, use the inverse, small chars
            fg = makeFgColour(averageColour(darkest))
            bg = makeBgColour(averageColour(lightest))
            switch (darkest[0]) {
              case ul:
                char = quad_UL; // 1/quad_LL_BR
                break
              case ll:
                char = quad_LL; // 1/quad_UL_BR
                break
              case ur:
                char = quad_UR; // 1/quad_BL_LR
                break
              default:
                char = quad_LR; // 1/quad_BL_UR
                break
            }
            break
          
          case 2:
            fg = makeFgColour(averageColour(lightest))
            bg = makeBgColour(averageColour(darkest))

            char = lightest.includes(ul) ? (
              lightest.includes(ll) ? (
                quad_BL
              ) : (
                lightest.includes(ur) ? quad_UB : quad_UL_LR
              )
            ) : (
              lightest.includes(ll) ? (
                lightest.includes(ur) ? quad_LL_UR : quad_LB
              ) : (
                quad_BR
              )
            )
            break
          
          case 1:
            fg = makeFgColour(averageColour(lightest))
            bg = makeBgColour(averageColour(darkest))
            switch (lightest[0]) {
              case ul:
                char = quad_UL
                break
              case ll:
                char = quad_LL
                break
              case ur:
                char = quad_UR
                break
              default:
                char = quad_LR
                break
            }
            break

          default:
            fg = ''
            bg = makeBgColour(averageColour(darkest))
            char = ' ';         
            break
        }

        ansi += rst + fg + bg + char
      }

  
      // ansi += rst
      // break
      ansi += `${rst}\r\n`

      //break

    }
    return ansi
  }

// =====================================================================
//   bsort
// 
// Copyright 2011, Tom Switzer
// Under terms of ISC License: http://www.isc.org/software/license
// 
// =====================================================================

/**
 * Sorts an array of integers in linear time using bucket sort.
 * This gives a good speed up vs. built-in sort in new JS engines
 * (eg. V8). If a key function is given, then the result of
 * key(a[i]) is used as the integer value to sort on instead a[i].
 *
 * @param a A JavaScript array.
 * @param key A function that maps values of a to integers.
 * @return The array a.
 */
function bsort(a, key) {
  key = key || function(x) { return x }
  var len = a.length,
      buckets = [],
      i, j, b, d = 0
  for (; d < 32; d += 4) {
      for (i = 16; i--;)
          buckets[i] = []
      for (i = len; i--;)
          buckets[(key(a[i]) >> d) & 15].push(a[i])
      for (b = 0; b < 16; b++)
          for (j = buckets[b].length; j--;)
              a[++i] = buckets[b][j]
  }
  return a
}


// =========================================================================
//
//    Gandalf Render
//
// =========================================================================


function gandalfRender(data, w, h, brightenIfAllBlack = false) {
  const fg_code = `38;2`
  const bg_code = `48;2`
  
  const fix = Math.floor
  const makeColour = (fg, bg) => `${esc}${fg_code};${fix(fg.r)};${fix(fg.g)};${fix(fg.b)};${bg_code};${fix(bg.r)};${fix(bg.g)};${fix(bg.b)}m`
  

  // const quad_UB = 'A'
  // const quad_BL = 'L'
  const quad_UB = '\u2580';    // ▀
  const quad_BL = '\u258C';    // ▌
  // const quad_BR = '\u2590';    // ▐
  
  const { length } = data
  const lines = []
  let ansi = ''
  let i = 0
  const iTest = (x) => (i + x <= length)

  // round up to even
  const ww = w + (w % 2)
  const hh = h + (h % 2)

  const sideOddness = ww > w
  const bottomOddness = hh > h

  const fgs = new Array(ww)
  const bgs = new Array(ww)

  const u_colours = new Array(ww)
  const l_colours = new Array(ww)

  const sum = (acc, cur) => acc + cur
  const colourSum = brightenIfAllBlack ? data.filter((x, k) => (k + 1) % 4 !== 0).reduce(sum) : false
  const allBlack = brightenIfAllBlack ? colourSum === 0 : false

  const getColourRecord = (oddness = false) => {
    if (oddness)
      return new ColourRecord(0,0,0,0)

    let r = data[i++]
    let g = data[i++]
    let b = data[i++]
    const a = data[i++]

    const brightBlack = 220
    
    if (a !== 0) {
      r = allBlack ? brightBlack : r
      g = allBlack ? brightBlack : g
      b = allBlack ? brightBlack : b
    }
    else {
      r = g = b = 0
    }

    const lum = calculatePerceivedLuminance(r, g, b)
    return new ColourRecord(r, g, b, lum); 
  }

  for (let y = 0; y < hh; y += 2) {

    // collect colour records
    let k = 0
    for (let x = 0; x < ww && iTest(4); x += 2) {
      u_colours[k++] = getColourRecord()
      u_colours[k++] = getColourRecord(sideOddness && (x === w))
    }

    k = 0
    for (let x = 0; x < ww && iTest(4); x += 2) {
      l_colours[k++] = getColourRecord()
      l_colours[k++] = getColourRecord(bottomOddness && (y === h))
    }

    // go through them four at a time
    for (k = 0; k < ww; k += 2) {
      const ul = u_colours[k]
      const ll = l_colours[k]
      const ur = u_colours[k + 1]
      const lr = l_colours[k + 1]
      
      //const lightest_to_darkest = [ul, ll, ur, lr].sort((a, b) => (b.l - a.l))
      const lightest_to_darkest = [ul, ll, ur, lr]
      bsort(lightest_to_darkest, x => x.l)
      
      const [ lightest, darkest ] = seperateLightAndDark(lightest_to_darkest)
      
      const nLightest = lightest.length
      const nDarkest = darkest.length

      const isLighter = nLightest > nDarkest
      const isDarker = nLightest < nDarkest

      const top = [ul, ur]
      const bot = [ll, lr]
      const left = [ul, ll]
      const right = [ur, lr]

      const lumy = (a) => {
        const x = a[0].l
        const y = a[1].l

        return Math.sqrt((x * x + y * y) / 2)
      }

      const topLumy = lumy(top)
      const botLumy = lumy(bot)
      const leftLumy = lumy(left)
      const rightLumy = lumy(right)
      
      const dVert = Math.abs(topLumy - botLumy)
      const dHoriz = Math.abs(leftLumy - rightLumy)

      let char = 'X'
      let fg_colour = null_colour
      let bg_colour = null_colour
      
      if (dVert > dHoriz) {
        char = quad_UB
        fg_colour = averageColour(top)
        bg_colour = averageColour(bot)

        if (topLumy > botLumy) {
          if (isLighter) {
            const c = selectDarkest(top)
            bg_colour = averageColour([bg_colour, c]); 
          }
          else if (isDarker) {
            const c = selectLightest(bot)
            fg_colour = averageColour([fg_colour, c])
          }
        }
        else {
          if (isLighter) {
            const c = selectDarkest(bot)
            fg_colour = averageColour([fg_colour, c]); 
          }
          else if (isDarker) {
            const c = selectLightest(top)
            bg_colour = averageColour([bg_colour, c])
          }
        }
      }
      else {
        char = quad_BL
        fg_colour = averageColour(left)
        bg_colour = averageColour(right)
        if (leftLumy > rightLumy) {
          if (isLighter) {
            const c = selectDarkest(left)
            bg_colour = averageColour([bg_colour, c]); 
          }
          else if (isDarker) {
            const c = selectLightest(right)
            fg_colour = averageColour([fg_colour, c])
          }
        }
        else {
          if (isLighter) {
            const c = selectDarkest(right)
            fg_colour = averageColour([fg_colour, c]); 
          }
          else if (isDarker) {
            const c = selectLightest(left)
            bg_colour = averageColour([bg_colour, c])
          }
        }
      }

      //const fg = makeFgColour(fg_colour)
      //const bg = makeBgColour(bg_colour)

      const colour = makeColour(fg_colour, bg_colour)

      //ansi += rst + fg + bg + char
      ansi += `${colour}${char}`
    }


    // ansi += rst
    // break
    ansi += rst

    lines.push(ansi)
    ansi = ''
    //break

  }
  return lines
}




























  exports.renderUrlSubPixel = (url, w_wish, h_wish, onComplete, onError = () => {}) => {
    

    load_image(url,
      (canvas, meta) => {
        w = canvas.width
        h = canvas.height

        //console.log("canvas", canvas, w, h)
        //console.dir(canvas)
        // [r1, g1, b1, a1, r2, b2, g2, a2, ... ] - Same as canvas.getImageData
        const context = canvas.getContext("2d")
        const { data } = context.getImageData(0, 0, w, h)
        const ansi = subpixelPicRender(data, w, h)
        onComplete(ansi)
      },
      // options
      { 
        canvas: true, 
        crossOrigin: 'anonymous', 
        maxWidth: w_wish,
        maxHeight: h_wish 
      }
    )
  }

  exports.renderUrlGandalf = (url, w_wish, h_wish, onComplete, onError = () => {}) => {
  
    load_image(url,
      (img, meta) => {
        const w = img.width * 2
        const h = img.height
        img.width = w
        
        const canvas = document.createElement('canvas')
        const context = canvas.getContext("2d")
        canvas.width = w
        canvas.height = h
        context.drawImage(img, 0, 0, w, h)

        // [r1, g1, b1, a1, r2, b2, g2, a2, ... ] - Same as canvas.getImageData
        const { data } = context.getImageData(0, 0, w, h)
        const ansi = gandalfRender(data, w, h)
        //console.log(ansi)
        onComplete(ansi)
      },
      // options
      { 
        canvas: false, 
        crossOrigin: 'anonymous', 
        maxWidth: w_wish,
        minWidth: w_wish,
        maxHeight: h_wish, 
        minHeight: h_wish 
      }
    )
  }

  exports.renderUrl8Bit = (url, w_wish, h_wish, onComplete, onError = () => {}) => {
    

    load_image(url,
      (img, meta) => {
        const w = img.width
        const h = img.height
        img.width = w
        
        const canvas = document.createElement('canvas')
        const context = canvas.getContext("2d")
        canvas.width = w
        canvas.height = h
        context.drawImage(img, 0, 0, w, h)

        // [r1, g1, b1, a1, r2, b2, g2, a2, ... ] - Same as canvas.getImageData
        const { data } = context.getImageData(0, 0, w, h)
        const ansi = subpixelPicRender(data, w, h)
        //console.log(ansi)
        onComplete(ansi)
      },
      // options
      { 
        canvas: false, 
        crossOrigin: 'anonymous', 
        maxWidth: w_wish,
        minWidth: w_wish,
        maxHeight: h_wish, 
        minHeight: h_wish 
      }
    )
  }


  exports.gandalfRender = gandalfRender
  exports.hyperlink = hyperlink
  
}).call(this);