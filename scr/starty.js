
(function() {
  const { initTerminal } = require('./termy')
  
  function ready() {
    initTerminal()
  }
  
  // Add event listeners once the DOM has fully loaded by listening for the
  // `DOMContentLoaded` event on the document, and adding your listeners to
  // specific elements when it triggers.
  document.addEventListener('DOMContentLoaded', ready)
}).call(this)
