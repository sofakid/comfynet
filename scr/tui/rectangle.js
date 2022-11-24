(function() {

  // -----------------
  // --- Rectangle ---
  // -----------------
  class Rectangle {
    
    // just a rectangle that will not .equals() a "new Rectangle()"
    static nonDefault() {
      return new Rectangle(-1, -1, -1, -1)
    } 

    constructor(rows = 0, cols = 0, row = 1, col = 1) {
      this.rows = rows
      this.cols = cols
      this.row = row
      this.col = col
    }

    equals(other) {
      if (this.row !== other.row) return false
      if (this.col !== other.col) return false
      if (this.rows !== other.rows) return false
      if (this.cols !== other.cols) return false
      return true
    }

    contains(other) {
      if (this.bottom < other.bottom) return false
      if (this.top > other.top) return false
      if (this.left < other.left) return false
      if (this.right > other.right) return false
      return true
    }

    get isPositive() {
      const { rows, cols } = this
      return rows > 0 && cols > 0
    }

    get isPositiveOrZero() {
      const { rows, cols } = this
      return rows >= 0 && cols >= 0
    }

    shiftRowUnbounded(delta) {
      this.row += delta
    }

    shiftColUnbounded(delta) {
      this.row += delta
    }

    shiftRow(delta, max) {
      this.row += delta
      if (this.row < 1) {
        this.row = 1
      } else if (this.row > max) {
        this.row = max
      }
    }

    shiftCol(delta, max) {
      this.col += delta
      if (this.col < 1) {
        this.col = 1
      }
      else if (this.col > max) {
        this.col = max
      }
    }

    get bottom() {
      return this.row + this.rows
    }

    get right() {
      return this.col + this.cols
    }

    get top() {
      return this.row
    }

    get left() {
      return this.col
    }

    get copy() {
      return new Rectangle(this.rows, this.cols, this.row, this.col)
    }

    removeFromLeft(x) {
      const o = new Rectangle(this.rows, x, this.row, this.col)
      this.col += x
      this.cols -= x
      return o
    }

    removeFromRight(x) {
      const o = new Rectangle(this.rows, x, this.row, this.col + this.cols - x)
      this.cols -= x
      return o
    }

    removeFromTop(x) {
      const o = new Rectangle(x, this.cols, this.row, this.col)
      this.rows -= x
      this.row += x
      return o
    }

    removeFromBottom(x) {
      this.rows -= x
      const o = new Rectangle(x, this.cols, this.row + this.rows, this.col)
      return o
    }

    splitH(ratio) {
      const { copy: top } = this
      const n = Math.floor(top.rows * ratio)
      const bottom = top.removeFromBottom(n)
      return [ top, bottom ]
    }

    splitV(ratio) {
      const { copy: left } = this
      const n = Math.floor(left.cols * ratio)
      const right = left.removeFromRight(n)
      return [ left, right ]
    }

  }

  // --- exports -----------------------------------------------------
  exports.Rectangle = Rectangle
}).call(this)
