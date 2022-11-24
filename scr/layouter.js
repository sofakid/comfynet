(function() {

  const EShushumna_none = 0
  const EShushumna_vertical = 1
  const EShushumna_horizontal = 2

  // --------------
  // --- Chakra ---
  // --------------
  let i = 0
  class Chakra {
    constructor(parent) {
      this.yay = `yay ${i++}`
      this.nadis = []
      this.parent = parent
      this.shushumna = EShushumna_none

      this.v_shift = 0
      this.h_shift = 0
    }

    purify() {
      this.depthFirstTraversal((chakra) => {
        const { nadis, shushumna } = chakra
        const { length: n } = nadis
//        console.log(` === PROCESSING CHAKRA ${chakra.yay} ===`)

        if (n === 0) {
          console.log("bail: n === 0")
          return
        }

        const newNadis = []
        function f(c) {
          if (c.nadis.length === 1) {
            const d = c.nadis[0]
            f(d)
            return
          }

          if (c.shushumna === shushumna) {
            c.nadis.forEach((d) => {
              newNadis.push(d)
              d.parent = chakra
            })

          } else {
            newNadis.push(c)
            c.parent = chakra
          }
        }

        nadis.forEach(f)
        chakra.nadis = newNadis
      })
    }

    destroy() {
      const { parent } = this
      this.clear()
      if (parent) {
        parent.remove(this)
      }
    }

    remove(chakra) {
      this.nadis = this.nadis.filter(x => x !== chakra)
    }

    contains(chakra) {
      if (chakra === this) {
        return true
      }
      let found = false
      this.nadis.forEach((x) => {
        found = found || x.contains(chakra)
      })
      return found
    }

    whichNadi(chakra) {
      if (this === chakra) {
        return [ this, 0 ]
      }
      let found = null
      this.nadis.forEach((c, i) => {
        if (c.contains(chakra)) {
          found = [c, i]
        }
      })
      return found
    }

    isFirst(chakra) {
      const { nadis } = this
      if (nadis.length === 0) {
        return this === chakra
      }
      return nadis[0].contains(chakra); 
    }

    isLast(chakra) {
      const { nadis } = this
      const { length: n } = nadis
      if (n === 0) {
        return this === chakra
      }
      return nadis[n - 1].contains(chakra); 
    }

    findVerticalShushumnicChakra() {
      const { parent } = this
      if (parent === null) {
        return this
      }
      if (this.shushumna === EShushumna_vertical) {
        return this
      }
      return parent.findVerticalShushumnicChakra()
    }

    findHorizontalShushumnicChakra() {
      const { parent } = this
      if (parent === null) {
        return this
      }
      if (this.shushumna === EShushumna_horizontal) {
        return this
      }
      return parent.findHorizontalShushumnicChakra()
    }

    // -----------------------------------------------------------------
    // with these shifties, we're trying to find the top and right edges

    // to shift horizontally, we need to find the right vertical shushumna
    findHorizontalShiftyChakra() {
      let h_chakra = this.findVerticalShushumnicChakra()
      while (h_chakra.isLast(this) && h_chakra.parent !== null) {
        h_chakra = h_chakra.parent.findVerticalShushumnicChakra()
      }

      const a = h_chakra.whichNadi(this)
      if (a) {
        const [ chakra, i ] = a
        return chakra
      }
      console.error("findHorizontalShiftyChakra() something's wrong here")
      return null
    }

    // to shift vertally, we need to find the right horizontical shushumna
    findVerticalShiftyChakra() {
      let v_chakra = this.findHorizontalShushumnicChakra()

      while (v_chakra.isFirst(this) && v_chakra.parent !== null) {
        v_chakra = v_chakra.parent.findHorizontalShushumnicChakra()
      }

      const a = v_chakra.whichNadi(this)
      if (a) {
        const { nadis } = v_chakra
        const [ chakra, i ] = a
        const x = i - 1
        return nadis.length > x && x >= 0 ? nadis[ x ] : null
      }
      console.error("findVerticalShiftyChakra() something's wrong here")
      return null
    }

    _splitAt(chakra) {
      const { nadis } = this
      if (chakra === this) {
        nadis.push(new Chakra(this))
        nadis.push(new Chakra(this))
        return
      }

      const [ c, i ] = this.whichNadi(chakra)
      nadis.splice(i, 0, new Chakra(this))
    }

    _split(splits) {
      const { nadis } = this
      if (nadis.length === 0) {
        nadis.push(new Chakra(this))
      }
      for (let i = 0; i < splits; ++i) {
        nadis.push(new Chakra(this))
      }
    }

    splitH(splits = 1, chakra = this) {
      const { parent } = this
      if (parent && parent.shushumna === EShushumna_horizontal) {
        parent.splitH(splits, chakra)
        return
      }
      this.shushumna = EShushumna_horizontal
      this._splitAt(chakra)
    }

    splitV(splits = 1, chakra = this) {
      const { parent } = this
      if (parent && parent.shushumna === EShushumna_vertical) {
        parent.splitV(splits, chakra)
        return
      }
      this.shushumna = EShushumna_vertical
      this._splitAt(chakra)
    }

    clear() {
      this.nadis.forEach((x) => {
        x.clear()
      })
      this.v_shift = 0
      this.h_shift = 0
      this.parent = null
      this.nadis.length = 0
      this.shushumna = EShushumna_none
    }

    depthFirstTraversal(f) {
      const { nadis } = this
      nadis.slice().forEach((chakra) => {
        if (chakra.parent !== null) {
          chakra.depthFirstTraversal(f)
        }
      })

      f(this)
    }

    depthLastTraversal(f) {
      f(this)
      this.nadis.forEach((chakra) => {
        chakra.depthLastTraversal(f)
      })
    }

    contemplationOrderTraversal(f) {
      const { shushumna, nadis } = this
      if (shushumna === EShushumna_none) {
        f(this)
        return
      }
      
      nadis.forEach((chakra) => {
        chakra.contemplationOrderTraversal(f)
      })
    }

    contemplate(entire, rect, acc, options) {
      const { nadis, shushumna } = this
      switch (shushumna) {
        case EShushumna_horizontal: {
          const { length: n } = nadis
          const { rows: m } = rect
          let last = 0
          nadis.forEach((nadi, i) => {
            const h = Math.floor(m / n)
            const r = i === n - 1 ? rect : rect.removeFromTop(h + nadi.v_shift - last)
            nadi.contemplate(entire, r, acc, options)
            last = nadi.v_shift
          })
          break
        }

        case EShushumna_vertical: {
          const { length: n } = nadis
          const { cols: m } = rect
          let last = 0
          nadis.forEach((nadi, i) => {
            const w = Math.floor(m / n)
            const r = i === n - 1 ? rect : rect.removeFromLeft(w + nadi.h_shift - last)
            nadi.contemplate(entire, r, acc, options)
            last = nadi.h_shift
          })
          break
        }

        default: {
          const { v_pad, h_pad } = options
          
          const top_edge = entire.row === rect.row
          const bottom_edge = entire.row + entire.rows === rect.row + rect.rows
          const left_edge = entire.col === rect.col
          const right_edge = entire.col + entire.cols === rect.col + rect.cols
          
          const half_t_pad = Math.floor(v_pad / 2)
          const half_b_pad = Math.ceil(v_pad / 2)
          const half_l_pad = Math.floor(h_pad / 2)
          const half_r_pad = Math.ceil(h_pad / 2)

          const t_pad = top_edge ? v_pad : half_t_pad
          const b_pad = bottom_edge ? v_pad : half_b_pad
          
          const l_pad = left_edge ? h_pad : half_l_pad
          const r_pad = right_edge ? h_pad : half_r_pad

          const { copy: r } = rect
          r.removeFromTop(t_pad)
          r.removeFromBottom(b_pad)
          r.removeFromLeft(l_pad)
          r.removeFromRight(r_pad)
          acc.push(r)
        }  
      }
    }

  }

  // ------------
  // --- Soul ---
  // ------------
  class Soul {
    constructor() {
      this.muludhara = new Chakra()
    }

    dump() {
      let i = 0
      this.muludhara.depthLastTraversal((chakra) => {
        console.log(` SOUL DUMP  :: ${i++} :: ${chakra.yay}`, chakra)
      })
    }

    applyChakras(windowList) {
      const { muludhara } = this
      const { length: n, windows } = windowList
      
      // console.log("BEFORE PURIFY")
      // this.dump()
      
      muludhara.purify()
      
      // console.log("AFTER PURIFY")
      // this.dump()
      
      let i = 0
      muludhara.contemplationOrderTraversal((chakra) => {
        if (i < n) {
          windows[i++].chakra = chakra
        }
      })
    }

    autoChakra_monocle(windowList) {
      const { windows } = windowList
      this.muludhara.clear()
      this.applyChakras(windowList)
    }

    autoChakra_master_stack(windowList) {
      const { windows } = windowList
      const { muludhara: chakra } = this
      chakra.clear()
      const n = windowList.length - 1
      if (n <= 0) {
        return
      }
      
      if (n === 1) {
        this.autoChakra_monocle(windowList)
        return
      }

      chakra.splitV(1)
      chakra.nadis[1].splitH(n - 1)

      this.applyChakras(windowList)
    }

    autoChakra_trimurti(windowList) {
      const { windows } = windowList
      const { muludhara } = this
      muludhara.clear()
      muludhara.splitV(2);      
      this.applyChakras(windowList)
    }

    contemplate(bounds, options) {
      const rectangles = []
      this.muludhara.contemplate(bounds.copy, bounds.copy, rectangles, options)
      return rectangles
    }
  }
  
  // ------------------
  // --- WindowList ---
  // ------------------
  class WindowList {
    constructor() {
      this.windows = []
    }

    get length() {
      return this.windows.length
    }

    remove(w) {
      this.windows = this.windows.filter(x => x !== w)
    }

    push(w) {
      this.windows.push(w)
    }

    forEach(f) {
      this.windows.forEach(f)
    }

    insertBefore(before, w) {
      const { length: n, windows } = this
      for (let i = 0; i < n; ++i) {
        if (windows[i] === before) {
          windows.splice(i, 0, w)
          return
        }
      }
    }

    swap(i, j) {
      const { windows } = this
      const t = windows[i]
      windows[i] = windows[j]
      windows[j] = t
    }

    cycle() {
      const { windows } = this
      const { length: n } = windows
      if (n === 0) {
        return
      }
      console.log('cycling')
      // insert last element at front
      windows.splice(0, 0, windows[n - 1])
      // truncate
      windows.pop()
    }

    cycleReverse() {
      const { windows } = this
      const { length: n } = windows
      if (n === 0) {
        return
      }
      windows.push(windows[0])
      windows.shift()
    }
  }
  /// --- exports --------------------------
  exports.Soul = Soul
  exports.WindowList = WindowList

}).call(this);