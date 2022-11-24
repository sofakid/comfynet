(function() {
  
  const xregexp = require('xregexp')
  const { SimpleContentListEntryContent, SimpleContentListEntry, SimpleContentList } = require('./simple_content')

  const re_nonprintable = xregexp("[^\\PC\n]")
  const clean = (s) => xregexp.replace(s, re_nonprintable, '', 'all')

  // ----------------------------------------------------------------
  //    Search Result stuff
  // ----------------------------------------------------------------
  class SelectionBoxContent extends SimpleContentListEntryContent {
    constructor(tui, option, selectionConfig) {
      super(tui)
      this.option = option
      this.selectionConfig = selectionConfig
    }

    get desiredCols() {
      // override if you use it
      return 0
    }

    // overide this and set n_rows after
    preRender() {
    }
  }

  class SelectionBoxEntry extends SimpleContentListEntry {
    constructor(tui, option, selectionConfig) {
      const { contentClass, fc_selected, fc_border } = selectionConfig
      const content = new contentClass(tui, option, selectionConfig)
      super(tui, content, fc_selected.ansi, fc_border.ansi)
      this.option = option
      this.selectionConfig = selectionConfig
    }

    onEnterWhenSelected(event) {
      const { selectionConfig, option } = this
      selectionConfig.onSelected(option)
    }

    onClick(event) {
      const { selectionConfig, option } = this
      selectionConfig.onSelected(option)
    }
    
    get desiredRows() {
      return 1
    }
  }

  class SelectionBox extends SimpleContentList {
    constructor(tui, onSelected, onCancel, fc_selected, fc_unselected, fc_border, contentClass) {
      super(tui)
      this.selectionConfig = { 
        onSelected, onCancel, fc_selected, fc_unselected, fc_border, contentClass
      }
    }
    
    load(options) {
      console.log('SelectionBox.load(options)')
      const { tui, selectionConfig } = this
      
      const yesAlsoCleanNodes = true
      this.removeAllNodes(yesAlsoCleanNodes)

      const nodes = options.map((x) => new SelectionBoxEntry(tui, x, selectionConfig))
      if (nodes.length > 0) {
        nodes.forEach((x) => {
          this.addNodeAndDagger(x)
        })
        nodes[0].select()
      }
    }

    get desiredRows() {
      return this.nodes.length
    }

    selectLast() {
      console.log('SelectionBox.selectLast()')
      const i = this.findSelectedIndex()
      this.selectAtIndex(i - 1)
    }

    selectNext() {
      console.log('SelectionBox.selectNext()')
      const i = this.findSelectedIndex()
      this.selectAtIndex(i + 1)
    }

    selectAtIndex(i) {
      const { nodes } = this
      const m = nodes.length - 1
      const j = i < 0 ? 0 : (i > m ? m : i)
      for (let k = 0; k <= m ; ++k) {
        const o = nodes[k]
        if (j === k) {
          o.select()
        } 
        else {
          o.unselect()
        }
      }
    }

    findSelectedIndex() {
      const { nodes } = this
      const { length: n } = nodes
      for (let i = 0; i < n; ++i) {
        const o = nodes[i]
        if (o.selected === true) {
          return i
        }
      }
      return 0
    }
  }
  
  
  // --- exports ------------------------------------------------------
  exports.SelectionBox = SelectionBox
  exports.SelectionBoxContent = SelectionBoxContent

}).call(this)