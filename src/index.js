import getInfo from './info'
import filterFormats from './filter-formats'
import fromInfo from './fromInfo'

import STREAMING_PROTOCOLS from './protocols'
import FORMATS from './formats'

const scdl = {}
const download = async (url, clientID) => {
  const info = await getInfo(url, clientID)
  return await fromInfo(info[0], clientID)
}

scdl.filterFormats = filterFormats
scdl.STREAMING_PROTOCOLS = STREAMING_PROTOCOLS
scdl.FORMATS = FORMATS
scdl.download = download
scdl.getInfo = getInfo

export default scdl
