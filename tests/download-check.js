// const readChunk = require('read-chunk')
const fileType = require('file-type')
const scdl = require('../')

scdl.download('https://soundcloud.com/monsune_inc/outta-my-mind', process.env.CLIENT_ID)
  .then(stream => {
    fileType.fromStream(stream)
      .then(type => {
        if (type.mime !== 'audio/mpeg') {
          console.log('Invalid file type: ' + type.mime)
          process.exit(1)
        }

        console.log('Success running download-check')
        process.exit(0)
      })
      .catch(err => {
        console.log(err)
        process.exit(1)
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
