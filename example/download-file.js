const scdl = require('../')
const fs = require('fs')

const SOUNDCLOUD_URL = 'https://soundcloud.com/monsune_inc/outta-my-mind'
const CLIENT_ID = 'your client id here'

scdl.download(SOUNDCLOUD_URL, CLIENT_ID).then(data => data.pipe(fs.createWriteStream('audio.mp3')))
