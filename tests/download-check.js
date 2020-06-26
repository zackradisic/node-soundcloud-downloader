const fs = require('fs')

const stats = fs.statSync('audio.mp3')
if (stats.size !== 3616181) {

}
