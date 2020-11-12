const fs = require('fs')
const path = require('path')
const scdl = require('../')

scdl
  .downloadPlaylist('URL TO PLAYLIST')
  .then(([streams, trackNames]) => {
    streams.forEach((val, idx) => {
      val.pipe(fs.createWriteStream(path.join('/path/to/folder/', trackNames[idx] + '.mp3')))
    })
  })
