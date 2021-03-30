import sckey from 'soundcloud-key-fetch'

import getInfo, { getSetInfo, Transcoding, getTrackInfoByID, TrackInfo, User } from './info'
import filterMedia, { FilterPredicateObject } from './filter-media'
import { download, fromMediaObj } from './download'

import isValidURL, { convertFirebaseURL, isFirebaseURL, isPersonalizedTrackURL, isPlaylistURL, stripMobilePrefix } from './url'

import STREAMING_PROTOCOLS, { _PROTOCOLS } from './protocols'
import FORMATS, { _FORMATS } from './formats'
import { search, related, SoundcloudResource, SearchOptions } from './search'
import { downloadPlaylist } from './download-playlist'
import axios, { AxiosInstance } from 'axios'

import * as path from 'path'
import * as fs from 'fs'
import { PaginatedQuery } from './util'
import { GetLikesOptions, getLikes, Like } from './likes'
import { getUser } from './user'

/** @internal */
const downloadFormat = async (url: string, clientID: string, format: FORMATS, axiosInstance: AxiosInstance) => {
  const info = await getInfo(url, clientID, axiosInstance)
  const filtered = filterMedia(info.media.transcodings, { format: format })
  if (filtered.length === 0) throw new Error(`Could not find media with specified format: (${format})`)
  return await fromMediaObj(filtered[0], clientID, axiosInstance)
}

interface ClientIDData {
  clientID: string,
  date: Date
}

export interface SCDLOptions {
  // Set a custom client ID to use
  clientID?: string,
  // Set to true to save client ID to file
  saveClientID?: boolean,
  // File path to save client ID, defaults to '../client_id.json"
  filePath?: string,
  // Custom axios instance to use
  axiosInstance?: AxiosInstance,
  // Whether or not to automatically convert mobile links to regular links, defaults to true
  stripMobilePrefix?: boolean,
  // Whether or not to automatically convert SoundCloud Firebase links copied from the mobile app
  // (e.g. https://soundcloud.app.goo.gl/xxxxxxxxx), defaults to true.
  convertFirebaseLinks?: boolean,
}

export class SCDL {
  STREAMING_PROTOCOLS: { [key: string]: STREAMING_PROTOCOLS }
  FORMATS: { [key: string]: FORMATS }

  private _clientID?: string
  private _filePath?: string

  axios: AxiosInstance
  saveClientID = process.env.SAVE_CLIENT_ID ? process.env.SAVE_CLIENT_ID.toLowerCase() === 'true' : false

  stripMobilePrefix: boolean
  convertFirebaseLinks: boolean

  constructor (options?: SCDLOptions) {
    if (!options) options = {}
    if (options.saveClientID) {
      this.saveClientID = options.saveClientID
      if (options.filePath) this._filePath = options.filePath
    } else {
      if (options.clientID) {
        this._clientID = options.clientID
      }
    }

    if (options.axiosInstance) {
      this.setAxiosInstance(options.axiosInstance)
    } else {
      this.setAxiosInstance(axios)
    }

    if (!options.stripMobilePrefix) options.stripMobilePrefix = true
    if (!options.convertFirebaseLinks) options.convertFirebaseLinks = true

    this.stripMobilePrefix = options.stripMobilePrefix
    this.convertFirebaseLinks = options.convertFirebaseLinks
  }

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
   * @param useDirectLink - Whether or not to use the download link if the artist has set the track to be downloadable. This has erratic behaviour on some environments.
   * @returns A ReadableStream containing the audio data
  */
  async download (url: string, useDirectLink = true) {
    return download(await this.prepareURL(url), await this.getClientID(), this.axios, useDirectLink)
  }

  /**
   *  Get the audio of a given track with the specified format
   * @param url - The URL of the Soundcloud track
   * @param format - The desired format
  */
  async downloadFormat (url: string, format: FORMATS) {
    return downloadFormat(await this.prepareURL(url), await this.getClientID(), format, this.axios)
  }

  /**
   * Returns info about a given track.
   * @param url - URL of the Soundcloud track
   * @returns Info about the track
  */
  async getInfo (url: string) {
    return getInfo(await this.prepareURL(url), await this.getClientID(), this.axios)
  }

  /**
   * Returns info about the given track(s) specified by ID.
   * @param ids - The ID(s) of the tracks
   * @returns Info about the track
   */
  async getTrackInfoByID (ids: number[], playlistID?: number, playlistSecretToken?: string) {
    return getTrackInfoByID(await this.getClientID(), this.axios, ids, playlistID, playlistSecretToken)
  }

  /**
   * Returns info about the given set
   * @param url - URL of the Soundcloud set
   * @returns Info about the set
   */
  async getSetInfo (url: string) {
    return getSetInfo(await this.prepareURL(url), await this.getClientID(), this.axios)
  }

  /**
   * Searches for tracks/playlists for the given query
   * @param options - The search option
   * @returns SearchResponse
   */
  async search (options: SearchOptions) {
    return search(options, this.axios, await this.getClientID())
  }

  /**
   * Finds related tracks to the given track specified by ID
   * @param id - The ID of the track
   * @param limit - The number of results to return
   * @param offset - Used for pagination, set to 0 if you will not use this feature.
   */
  async related (id: number, limit: number, offset = 0) {
    return related(id, limit, offset, this.axios, await this.getClientID())
  }

  /**
   * Returns the audio streams and titles of the tracks in the given playlist.
   * @param url - The url of the playlist
   */
  async downloadPlaylist (url: string): Promise<[ReadableStream<any>[], String[]]> {
    return downloadPlaylist(await this.prepareURL(url), await this.getClientID(), this.axios)
  }

  /**
   * Returns track information for a user's likes
   * @param options - Can either be the profile URL of the user, or their ID
   * @returns - An array of tracks
   */
  async getLikes (options: GetLikesOptions): Promise<PaginatedQuery<Like>> {
    let id: number
    const clientID = await this.getClientID()
    if (options.id) {
      id = options.id
    } else if (options.profileUrl) {
      const user = await getUser(await this.prepareURL(options.profileUrl), clientID, this.axios)
      id = user.id
    } else if (options.nextHref) {
      return await getLikes(options, clientID, this.axios)
    } else {
      throw new Error('options.id or options.profileURL must be provided.')
    }
    options.id = id

    return getLikes(options, clientID, this.axios)
  }

  /**
   * Returns information about a user
   * @param url - The profile URL of the user
   */
  async getUser (url: string): Promise<User> {
    return getUser(await this.prepareURL(url), await this.getClientID(), this.axios)
  }

  /**
   * Sets the instance of Axios to use to make requests to SoundCloud API
   * @param instance - An instance of Axios
   */
  setAxiosInstance (instance: AxiosInstance) {
    this.axios = instance
  }

  /**
   * Returns whether or not the given URL is a valid Soundcloud URL
   * @param url - URL of the Soundcloud track
  */
  isValidUrl (url: string) {
    return isValidURL(url, this.convertFirebaseLinks, this.stripMobilePrefix)
  }

  /**
   * Returns whether or not the given URL is a valid playlist SoundCloud URL
   * @param url - The URL to check
   */
  isPlaylistURL (url: string) {
    return isPlaylistURL(url)
  }

  /**
   * Returns true if the given URL is a personalized track URL. (of the form https://soundcloud.com/discover/sets/personalized-tracks::user-sdlkfjsldfljs:847104873)
   * @param url - The URL to check
   */
  isPersonalizedTrackURL (url: string) {
    return isPersonalizedTrackURL(url)
  }

  /**
   * Returns true if the given URL is a Firebase URL (of the form https://soundcloud.app.goo.gl/XXXXXXXX)
   * @param url - The URL to check
   */
  isFirebaseURL (url: string) {
    return isFirebaseURL(url)
  }

  async getClientID (): Promise<string> {
    if (!this._clientID) {
      await this.setClientID()
    }

    return this._clientID
  }

  /** @internal */
  async setClientID (clientID?: string): Promise<string> {
    if (!clientID) {
      if (!this._clientID) {
        if (this.saveClientID) {
          const filename = path.resolve(__dirname, this._filePath ? this._filePath : '../client_id.json')
          const c = await this._getClientIDFromFile(filename)
          if (!c) {
            this._clientID = await sckey.fetchKey()
            const data = {
              clientID: this._clientID,
              date: new Date().toISOString()
            }
            fs.writeFile(filename, JSON.stringify(data), {}, err => {
              if (err) console.log('Failed to save client_id to file: ' + err)
            })
          } else {
            this._clientID = c
          }
        } else {
          this._clientID = await sckey.fetchKey()
        }
      }

      return this._clientID
    }

    this._clientID = clientID

    return clientID
  }

  /** @internal */
  private async _getClientIDFromFile (filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filename)) return resolve('')

      fs.readFile(filename, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
        if (err) return reject(err)
        let c: ClientIDData
        try {
          c = JSON.parse(data)
        } catch (err) {
          return reject(err)
        }
        if (!c.date && !c.clientID) return reject(new Error("Property 'data' or 'clientID' missing from client_id.json"))
        if (typeof c.clientID !== 'string') return reject(new Error("Property 'clientID' is not a string in client_id.json"))
        if (typeof c.date !== 'string') return reject(new Error("Property 'date' is not a string in client_id.json"))
        const d = new Date(c.date)
        if (Number.isNaN(d.getDay())) return reject(new Error("Invalid date object from 'date' in client_id.json"))
        const dayMs = 60 * 60 * 24 * 1000
        if (new Date().getTime() - d.getTime() >= dayMs) {
          // Older than a day, delete
          fs.unlink(filename, err => {
            if (err) console.log('Failed to delete client_id.json: ' + err)
          })
          return resolve('')
        } else {
          return resolve(c.clientID)
        }
      })
    })
  }

  /**
   * Prepares the given URL by stripping its mobile prefix (if this.stripMobilePrefix is true)
   * and converting it to a regular URL (if this.convertFireBaseLinks is true.)
   * @param url
   */
  async prepareURL (url: string): Promise<string> {
    if (this.stripMobilePrefix) url = stripMobilePrefix(url)
    if (this.convertFirebaseLinks) {
      if (isFirebaseURL(url)) url = await convertFirebaseURL(url, this.axios)
    }

    return url
  }
}

// SCDL instance with default configutarion
const scdl = new SCDL()

// Creates an instance of SCDL with custom configuration
const create = (options: SCDLOptions): SCDL => new SCDL(options)

export { create }

scdl.STREAMING_PROTOCOLS = _PROTOCOLS
scdl.FORMATS = _FORMATS

export default scdl
