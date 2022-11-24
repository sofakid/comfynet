(function() {

  function chunkString(str, size) {
    if (!str.length)
      return ['']

    if (size <= 0) {
      console.error(`zero size found -- str: ${str} -- size: ${size}`)
      return ['']
    }

    const n = Math.ceil(str.length / size)

    if (n <= 0)
      return ['']

    console.log(`str: ${str} -- size: ${size} -- n: ${n}`)
    const chunks = new Array(n)

    for (let i = 0, j = 0; i < n; ++i, j += size)
      chunks[i] = str.substr(j, size)

    return chunks
  }

  function ellipsisText(str, size) {
    const suffix = '...'
    const n_suffix = 3
    if (size <= 0) {
      return ''
    }
    if (size < n_suffix) {
      return '.'.repeat(size)
    }
    if (str.length <= size) {
      return str
    }
    const s = str.substr(0, size - n_suffix)
    return `${s}${suffix}`
  }

  function flowText(str, size) {
    if (size <= 0) {
      return []
    }
    const lines = []
    const re_whitespace = /\s/

    const b = []
    let i = 0
    str.trim().split(re_whitespace).forEach((x) => {
      const n = x.length + 1; // one for the whitespace char 
      i += n
      if (i >= size && b.length > 0) {
        lines.push(b.join(' '))
        b.length = 0
        i = n
      }

      // too big, chop rudely
      if (n > size) {
        const a = chunkString(x, size)
        const m = a.length - 1
        if (m >= 0) {
          for (let j = 0; j < m; ++j) {
            lines.push(a[j])
          }
          b.push(a[m])
          i = a[m].length + 1
        }
      }
      else {
        b.push(x)
      }

    })
    if (i !== 0) {
      lines.push(b.join(' ').trim())
    }

    return lines
  }

  // --- exports -------------------------------
  exports.chunkString = chunkString
  exports.ellipsisText = ellipsisText
  exports.flowText = flowText

}).call(this)
