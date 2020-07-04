import getInfo from './info'
import filterMedia from './filter-media'
import { fromURL, fromMediaObj } from './download'

import isValidURL from './is-url'

import STREAMING_PROTOCOLS, { _PROTOCOLS } from './protocols'
import FORMATS, { _FORMATS } from './formats'

const download = async (url: string, clientID: string) => {
  const info = await getInfo(url, clientID)
  return await fromMediaObj(info.media.transcodings[0], clientID)
}

const downloadFormat = async (url: string, clientID: string, format: FORMATS) => {
  const info = await getInfo(url, clientID)
  const filtered = filterMedia(info.media.transcodings, { format: format })
  console.log(filtered)
  if (filtered.length === 0) throw new Error(`Could not find media with specified format: (${format})`)
  return await fromMediaObj(filtered[0], clientID)
}

export interface scdl {
  filterMedia: typeof filterMedia,
  download: typeof download,
  downloadMedia: typeof fromMediaObj,
  downloadFromURL: typeof fromURL,
  getInfo: typeof getInfo,
  isValidURL: typeof isValidURL,
  downloadFormat: typeof downloadFormat,
  STREAMING_PROTOCOLS: { [key: string]: STREAMING_PROTOCOLS },
  FORMATS: { [key: string]: FORMATS }
}
const scdl = {} as scdl

scdl.filterMedia = filterMedia
scdl.STREAMING_PROTOCOLS = _PROTOCOLS
scdl.FORMATS = _FORMATS
scdl.download = download
scdl.downloadMedia = fromMediaObj
scdl.downloadFromURL = fromURL
scdl.getInfo = getInfo
scdl.isValidURL = isValidURL
scdl.downloadFormat = downloadFormat

export default scdl
