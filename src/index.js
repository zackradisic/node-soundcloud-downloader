import getInfo from './info'
import filterMedia from './filter-media'
import downloadMedia from './download-media'
import downloadURL from './download-url'

import STREAMING_PROTOCOLS from './protocols'
import FORMATS from './formats'

const scdl = {}
const download = async (url, clientID) => {
  const info = await getInfo(url, clientID)
  return await downloadMedia(info.media.transcodings[0], clientID)
}

scdl.filterMedia = filterMedia
scdl.STREAMING_PROTOCOLS = STREAMING_PROTOCOLS
scdl.FORMATS = FORMATS
scdl.download = download
scdl.downloadMedia = downloadMedia
scdl.downloadFromURL = downloadURL
scdl.getInfo = getInfo

export default scdl
