const fs = require('fs')
require('../example/download-file')

const stats = fs.statSync('audio.mp3')
fs.unlinkSync('audio.mp3')
if (stats.size !== 3616181) {
  process.exit(1)
}

process.exit(0)
