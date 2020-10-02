const fs = require('fs')
const path = require('path')
const scdl = require('../')

scdl
  .downloadPlaylist('https://soundcloud.com/user-845046062/sets/playlist')
  .then(([streams, trackNames]) => {
    streams.forEach((val, idx) => {
      val.pipe(fs.createWriteStream(path.join('/Users/zackradisic/Desktop/sc-test', trackNames[idx] + '.mp3')))
    })
  })
