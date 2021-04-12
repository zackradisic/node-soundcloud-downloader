const scdl = require('../').default
const fs = require('fs')

const constants = require('./constants')

scdl
  .download(constants.url)
  .then((stream) => stream.pipe(fs.createWriteStream('audio.mp3')))
  .catch((err) => console.log(err))
