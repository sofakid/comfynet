(function() {
  chrome.tabs.create({ url: chrome.runtime.getURL("ui/starty.html") })
  window.close()
}).call(this)