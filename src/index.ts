import sckey from 'soundcloud-key-fetch'

import getInfo, { getSetInfo, Transcoding, getTrackInfoByID } from './info'
import filterMedia, { FilterPredicateObject } from './filter-media'
import { download, fromMediaObj } from './download'

import isValidURL from './is-url'

import STREAMING_PROTOCOLS, { _PROTOCOLS } from './protocols'
import FORMATS, { _FORMATS } from './formats'
import { search, related, SoundcloudResource } from './search'
import { downloadPlaylist } from './download-playlist'
import { AxiosInstance } from 'axios'
import { axiosManager } from './axios'

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

  private _clientID?: string
  axios: AxiosInstance

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
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns A ReadableStream containing the audio data
  */
  async download (url: string, clientID?: string) {
    return download(url, await this._assignClientID(clientID))
  }

  /**
   *  Get the audio of a given track with the specified format
   * @param url - The URL of the Soundcloud track
   * @param format - The desired format
   * @param clientID - A Soundcloud Client ID, will find one if not provided
  */
  async downloadFormat (url: string, format: FORMATS, clientID?: string) {
    return downloadFormat(url, await this._assignClientID(clientID), format)
  }

  /**
   * Returns info about a given track.
   * @param url - URL of the Soundcloud track
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns Info about the track
  */
  async getInfo (url: string, clientID?: string) {
    return getInfo(url, await this._assignClientID(clientID))
  }

  /**
   * Returns info about the given track(s) specified by ID.
   * @param ids - The ID(s) of the tracks
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns Info about the track
   */
  async getTrackInfoByID (ids: number[], clientID?: string) {
    return await getTrackInfoByID(await this._assignClientID(clientID), ids)
  }

  /**
   * Returns info about the given set
   * @param url - URL of the Soundcloud set
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns Info about the set
   */
  async getSetInfo (url: string, clientID?: string) {
    return getSetInfo(url, await this._assignClientID(clientID))
  }

  /**
   * Searches for tracks/playlists for the given query
   * @param type - The type of resource, one of: 'tracks', 'users', 'albums', 'playlists', 'all'
   * @param query - The keywords for the search
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   * @returns SearchResponse
   */
  async search (type: SoundcloudResource | 'all', query: string, clientID?: string) {
    return search(type, query, await this._assignClientID(clientID))
  }

  /**
   * Finds related tracks to the given track specified by ID
   * @param id - The ID of the track
   * @param limit - The number of results to return
   * @param offset - Used for pagination, set to 0 if you will not use this feature.
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   */
  async related (id: number, limit: number, offset = 0, clientID?: string) {
    return related(id, limit, offset, await this._assignClientID(clientID))
  }

  /**
   * Returns the audio streams and titles of the tracks in the given playlist.
   * @param url - The url of the playlist
   * @param clientID - A Soundcloud Client ID, will find one if not provided
   */
  async downloadPlaylist (url: string, clientID?: string): Promise<[ReadableStream<any>[], String[]]> {
    return downloadPlaylist(url, await this._assignClientID(clientID))
  }

  /**
   * Sets the instance of Axios to use to make requests to SoundCloud API
   * @param instance - An instance of Axios
   */
  setAxiosInstance (instance: AxiosInstance) {
    this.axios = instance
    axiosManager.instance = instance
  }

  /**
   * Returns whether or not the given URL is a valid Soundcloud URL
   * @param url - URL of the Soundcloud track
  */
  isValidUrl (url: string) {
    return isValidURL(url)
  }

  /** @internal */
  private async _assignClientID (clientID?: string): Promise<string> {
    if (!clientID) {
      if (!this._clientID) {
        this._clientID = await sckey.fetchKey()
      }

      return this._clientID
    }

    return clientID
  }
}
const scdl = new SCDL()

scdl.STREAMING_PROTOCOLS = _PROTOCOLS
scdl.FORMATS = _FORMATS

export default scdl
