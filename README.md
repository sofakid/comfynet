ComfyNet
========

What is it? 
  - A commandline to your browser.
  - A commandline interface to the web.
  - TUI widget library and runtime. 
  - A platform to make text based apps in your browser.
    - Some example apps (plz help)
  - Woefully unfinished. 
  - Slightly buggy. 
  - A start.
  - Definitely Comfy.

Quick Demo
==========
[![Quick basic demo](https://img.youtube.com/vi/4DxC6FovFKE/0.jpg)](https://www.youtube.com/watch?v=4DxC6FovFKE "Quick basic demo")

Quickstart
==========

First install the dependencies with `yarn install` or `npm install`.

globally install `browserify`, `watchify`, and `pegjs`

On windows there's `build.bat` that you need to run at least once to build the parser and bundle up everything. `watch.bat` afterward if you are working on the code. examine those for other platforms and adapt. they're super simple.

Then add it to your browser as a developer extension. It will take over your new-tab. Maximum comfy.

What do I do first?
---

First thing you should do is run `settings`. At the top you'll find three fields for mail, amazon, and ebay. (You can use your mouse, you may have to in order to scroll down to the lower settings).

Set those to the urls you use, https://protonmail.com or something. There's settings for amazon and ebay because they have different urls for different countries. The idea is you just type `mail` and it will load your web mail. `amazon` and it will load amazon.co.uk or whatever you set it to.

Press `esc` to quit out of settings, they will be saved. (The other settings are for API keys for various services you can set up. we'll do those later)

These commands `mail`, `amazon`, `ebay` run the "JustGo" comfy program. They will just load a new tab with your desired site in it.

There are other justgo commands, they're hardcoded in the JustGo program near the top. Let's take a peek:

```javascript
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
```

So yeah there's some wallets and examples there.. it's the least impressive part but the most useful, you can edit these, remeber to `build.bat` to rebrowserify it, or `watch.bat` if you're doing alot of editing.

Show me the ANSI
---

Ok there's a demo of the ansi renderer, try these: (Esc will quit)
  - `test`
  - `test beethoven`
  - `test gandalf`
  - `test goku`
  - `test termy`
  - `test redpanda`
  - `test dragos`
  - `test frowthgiant`

What's this stuff in the top corner?
---
`- | & o _ + x` these are the runes.

The first two - and | split the term in half. & and o adjust size and margins, x kills the term, _ and + are supposed to minimise and maximise but they aren't implemented yet.


DuckDuckGo Bangs
---

They should just werk. `!yt something` will search youtube for "something"

bang info here: https://duckduckgo.com/bangs

Show me the apps
================
In comfynet, we call them Programs. They are pretty unfinished. Sorry. PRs welcomed. Contact me for help. I was going to do a reddit one and a chans one but you know, life and stuff.

Searchy Program
---

The default search program will access DuckDuckGo instant answers for a brief result, and you can hit `d` or `i` to search duckduckgo (the `i` is for image search)

If you want text results, you need to head over to the most interesting search engine in the world, https://gigablast.com, and send him $5 for api access. It's been 2 years and I haven't run out of credits yet.

Put the api and user key under Gigablast in the `settings` program.

Search results should work now, you'll also get news results in the `coin` program.

If your search terms are being parsed as commands or something, you can be explicit and put a `?` in front. it will search for whatever you put. 

ComfyCoin
---

set up API keys for Binance (for the candles, read only key is fine) and coinmarketcap in the `settings` (there's some other coiny apis in there but they aren't used yet)

run it like `coin BTC` the coin symbol must be in caps or it won't find it.

If you set up a gigablast API key it will search for related news.

OpenAI
---
This one is the `ai` command. This one is very unfinished. It was going to be a chat. It connects to the api. It doesn't get very far. This one is very unfinished.


I want to make my own comfy programs
==============================
I like you. Bear with me, I will explain how this works. In a nutshell, it's kind of like writing a GUI in JUCE. Except there are goblins, and you stab them with magic daggers.


TuiThings, Rectangles, and Rendering
---

The way things are layed out is inspired by JUCE, the methods of subdividing rectangles. (see here: https://docs.juce.com/master/tutorial_rectangle_advanced.html go get a sense of how that works and then come back here.)

The widgets are objects, classes that extend `TuiThing`.

When a TuiThing is told what size it should be its `onResize()` will be called. Here it must figure out the bounds for all of the more simple TuiThings that it is made of, if that is the case.

When it is time to render the TuiThing, its `onRender(f)` will be called, where `f` is a function that is to be run and supplied an array of `TuiLine` objects. 

The `TuiLine` is the simplest rendered text, it's just some text, and a row and column that it should begin at.

Let's look at couple simple ones.

Label
---

```javascript
class Label extends TuiThing {
    constructor(tui, text = '', length = null) {
      super(tui)
      this.text = text
      this.length = length === null ? clean(text).length : length; 
    }

    onRender(f) {
      const { bounds, text } = this
      const { row, col } = bounds
      f([new TuiLine(row, col, text)])
    }

    onResize() {
    }
    
  }
```

The label is a simple TuiThing, it has no children, so it has no responsibility in `onResize()`.

in `onRender(f)`, it simply passes a 1 element array of `TuiLine`, the text and where (row, col) it is supposed to go.  

What `f` is doing, is queuing up in a tree structure, all the text to be rendered. It's not actually writing it to the terminal at this stage, all of the (dirty) TuiThings will be processed first, and then it preorder traverses the tree. 

Box
---

Let's look at box. It has no children, but the size informs what the text will be. So it does do stuff in it's `onResize()`:

```javascript
class Box extends TuiThing {
    constructor(tui, char, colours) {
      super(tui)
      this.char = char
      this.colour = colours.join === undefined ? colours : colours.join('')
      this.text = ''
    }

    onRender(f) {
      const { row, rows, col } = this.bounds
      let a = []
      for (let i = row; i < row + rows; ++i) {
        a.push(new TuiLine(i, col, `${this.colour}${this.text}${esc}[m`))
      }
      f(a)
    }

    onResize() {
      const r = this.bounds
      if (r.cols > 0) {
        this.text = this.char.repeat(r.cols)
      }
    }
  }
```

ComfyWindowDressings
---
Let's look at the `onResize()` and `onRender(f)` of `ComfyWindowDressings` (the title bar at the top of the comfy windows).

Note that in `onRender`, there is nothing about those runes in the top right corner (`- | @ & _ + x`). This is because they are child things that this thing owns. They will implement their own `onRender`.

`onResize()` however, does set the bounds for each of those runes, this is how they will know how to render themselves in the right spot. Note how `r` is a copy of the title bar's bounds, and then we remove a rectangle from the right for each rune, and that removed rectangle is the bounds for that rune. Get it?

```javascript

    onRender(f) {
      const { title, bounds, colourScheme } = this
      const { row, col, cols } = bounds
      const { rst } = ansiColours
      const notHighlighted = false
      const { hasFocus } = this.comfyWindow.program.spot.tui
      const colour = colourScheme.getColour(notHighlighted, hasFocus)
      const n = title.length
      const m = cols - n
      
      const pad = m > 0 ? ' '.repeat(m) : ''

      f([new TuiLine(row, col, `${colour}${title}${pad}${rst}`)])
    }

    onResize() {
      const { 
        minusRune, barRune, whirlRune, ampRune,
        oRune, underscoreRune, plusRune, xRune,
        bounds } = this
      const { copy: r } = bounds
      
      const runeWidth = 3
      xRune.setBounds(r.removeFromRight(runeWidth))
      plusRune.setBounds(r.removeFromRight(runeWidth))
      underscoreRune.setBounds(r.removeFromRight(runeWidth))
      oRune.setBounds(r.removeFromRight(runeWidth))
      ampRune.setBounds(r.removeFromRight(runeWidth))
      whirlRune.setBounds(r.removeFromRight(runeWidth))
      barRune.setBounds(r.removeFromRight(runeWidth))
      minusRune.setBounds(r.removeFromRight(runeWidth))
    }
```



Goblins and Magic Daggers
-------

You think a night raid by orcs is a joke?

to be continued...













