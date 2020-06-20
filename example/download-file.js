import scdl from '../index'
import fs from 'fs'

const SOUNDCLOUD_URL = 'https://soundcloud.com/monsune_inc/outta-my-mindf'
const CLIENT_ID = 'YOUR CLIENT ID HERE'

const downloadToFile = async () => {
  const data = await scdl.download(SOUNDCLOUD_URL, CLIENT_ID)
  data.pipe(fs.createWriteStream('audio.mp3'))
}

downloadToFile()
