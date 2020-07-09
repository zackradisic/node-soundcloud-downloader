import getInfo, { Transcoding } from './info'
import filterMedia, { FilterPredicateObject } from './filter-media'
import { fromURL, fromMediaObj } from './download'

import isValidURL from './is-url'

import STREAMING_PROTOCOLS, { _PROTOCOLS } from './protocols'
import FORMATS, { _FORMATS } from './formats'

/** @internal */
const download = async (url: string, clientID: string) => {
  const info = await getInfo(url, clientID)
  return await fromMediaObj(info.media.transcodings[0], clientID)
}

/** @internal */
const downloadFormat = async (url: string, clientID: string, format: FORMATS) => {
  const info = await getInfo(url, clientID)
  const filtered = filterMedia(info.media.transcodings, { format: format })
  if (filtered.length === 0) throw new Error(`Could not find media with specified format: (${format})`)
  return await fromMediaObj(filtered[0], clientID)
}

export class SCDL {
  STREAMING_PROTOCOLS: { [key: string]: STREAMING_PROTOCOLS }
  FORMATS: { [key: string]: FORMATS }

  /**
   * Returns a media Transcoding that matches the given predicate object
   * @param media - The Transcodings to filter
   * @param predicateObj - The desired Transcoding object to match
   * @returns An array of Transcodings that match the predicate object
   */
  filterMedia (media: Transcoding[], predicateObj: FilterPredicateObject) {
    return filterMedia(media, predicateObj)
  }

  /**
   * Get the audio of a given track. It returns the first format found.
   *
   * @param url - The URL of the Soundcloud track
   * @param clientID - A Soundcloud Client ID
   * @returns A ReadableStream containing the audio data
  */
  download (url: string, clientID: string) {
    return download(url, clientID)
  }

  /**
   *  Get the audio of a given track with the specified format
   * @param url - The URL of the Soundcloud track
   * @param clientID - A Soundcloud Client ID
   * @param format - The desired format
  */
  downloadFormat (url: string, clientID: string, format: FORMATS) {
    return downloadFormat(url, clientID, format)
  }

  /**
   * Returns a info about a given track.
   * @param url - URL of the Soundcloud track
   * @param clientID - A Soundcloud Client ID
   * @returns Info about the track
  */
  getInfo (url: string, clientID: string) {
    return getInfo(url, clientID)
  }

  /**
   * Returns whether or not the given URL is a valid Soundcloud URL
   * @param url - URL of the Soundcloud track
  */
  isValidUrl (url: string) {
    return isValidURL(url)
  }
}
const scdl = new SCDL()

scdl.STREAMING_PROTOCOLS = _PROTOCOLS
scdl.FORMATS = _FORMATS

export default scdl
