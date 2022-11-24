(function() {

  const { c } = require('./picasso')
  const esc = '\x1B'
  const start = esc + '['
  const seq = (z, ... listy) => start + listy.join(';') + z

  function position(row, col) {
    return seq('f', row, col)
  }

  function drawStatusBar(term, andThen = () => {}) {
    const { rows, cols } = term.getNumbers()
    const push = esc + '7'
    const pop = esc + '8'

    const move_start = position(rows, 0)
    const colour = seq('m', c.bg_hi_black, c.bold, c.white)

    const text = ' <--- comfyweb -------------> '
    const more = cols - text.length
    const padding = ' '.repeat(more)

    term.writeRaw(push + move_start + colour + text + padding + pop, andThen)
  }

  function bumpBottomLine(term, andThen = () => {}) {
    const { baseY, cursorX, cursorY, length, cols } = term.getNumbers()

    const pad_amount = cols - cursorX
    const padding = ' '.repeat(pad_amount)

    if (baseY + cursorY === length - 1) {

      term.writeRaw(padding + '\r\n' + position(cursorY - 1, cursorX), () => {
        drawStatusBar(term, andThen)
      })

      return
    }

    andThen()
  }

  exports.drawStatusBar = drawStatusBar
  exports.bumpBottomLine = bumpBottomLine

}).call(this);