const fs = require('fs')
const scdl = require('../')

scdl.download('https://soundcloud.com/monsune_inc/outta-my-mind', process.env.CLIENT_ID)
  .then(stream => {
    stream.pipe(fs.createWriteStream('audio.mp3'))

    stream.on('finish', () => {
      const stats = fs.statSync('audio.mp3')
      fs.unlinkSync('audio.mp3')
      if (stats.size !== 3616181) {
        console.log(stats.size)
        process.exit(1)
      }

      process.exit(0)
    })

    stream.on('error', err => {
      console.log(err)
      process.exit(1)
    })
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
