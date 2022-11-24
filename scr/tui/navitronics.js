(function() {

  class Navitron {
    constructor(id, tui_thing, field) {
      this.id = id
      this.tui_thing = tui_thing
      this.field = field
      this.N = null
      this.E = null
      this.S = null
      this.W = null
      this.com_r = 0
      this.com_c = 0
    }

    vaporize() {
      this.N = null
      this.E = null
      this.S = null
      this.W = null
      this.field = null
      this.tui_thing = null
    }

    disturb() {
      this.N = null
      this.E = null
      this.S = null
      this.W = null
    }

  }

}).call(this)

class NavitronField {
  constructor() {
    this.navitrons = []
  }
  

  disturb() {
    this.navitrons.forEach((x) => {
      x.disturb()
    })
  }

}