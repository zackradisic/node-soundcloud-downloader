const scdl = require('../')
const fs = require('fs')

const constants = require('./constants')

scdl.download(constants.url, constants.clientID)
  .then(stream => stream.pipe(fs.createWriteStream('audio.mp3')))
  .catch(err => console.log(err))
