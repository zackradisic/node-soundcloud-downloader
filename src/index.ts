import sckey from 'soundcloud-key-fetch'

import getInfo, { getSetInfo, Transcoding, getTrackInfoByID, TrackInfo, User } from './info'
import filterMedia, { FilterPredicateObject } from './filter-media'
import { download, fromMediaObj } from './download'

import isValidURL from './is-url'

import STREAMING_PROTOCOLS, { _PROTOCOLS } from './protocols'
import FORMATS, { _FORMATS } from './formats'
import { search, related, SoundcloudResource } from './search'
import { downloadPlaylist } from './download-playlist'
import axios, { AxiosInstance } from 'axios'

import * as path from 'path'
import * as fs from 'fs'
import { PaginatedQuery } from './util'
import { getLikes, Like } from './likes'
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

interface GetLikesOptions {
  profileURL?: string,
  id?: number
}

export interface SCDLOptions {
  // Set a custom client ID to use
  clientID?: string,
  // Set to true to save client ID to file
  saveClientID?: boolean,
  // File path to save client ID, defaults to '../client_id.json"
  filePath?: string,
  // Custom axios instance to use
  axiosInstance?: AxiosInstance
}

export class SCDL {
  STREAMING_PROTOCOLS: { [key: string]: STREAMING_PROTOCOLS }
  FORMATS: { [key: string]: FORMATS }

  private _clientID?: string
  private _filePath?: string

  axios: AxiosInstance
  saveClientID = process.env.SAVE_CLIENT_ID ? process.env.SAVE_CLIENT_ID.toLowerCase() === 'true' : false

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
   * @returns A ReadableStream containing the audio data
  */
  async download (url: string) {
    return download(url, await this.getClientID(), this.axios)
  }

  /**
   *  Get the audio of a given track with the specified format
   * @param url - The URL of the Soundcloud track
   * @param format - The desired format
  */
  async downloadFormat (url: string, format: FORMATS) {
    return downloadFormat(url, await this.getClientID(), format, this.axios)
  }

  /**
   * Returns info about a given track.
   * @param url - URL of the Soundcloud track
   * @returns Info about the track
  */
  async getInfo (url: string) {
    return getInfo(url, await this.getClientID(), this.axios)
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
    return getSetInfo(url, await this.getClientID(), this.axios)
  }

  /**
   * Searches for tracks/playlists for the given query
   * @param type - The type of resource, one of: 'tracks', 'users', 'albums', 'playlists', 'all'
   * @param query - The keywords for the search
   * @returns SearchResponse
   */
  async search (type: SoundcloudResource | 'all', query: string) {
    return search(type, query, this.axios, await this.getClientID())
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
    return downloadPlaylist(url, await this.getClientID(), this.axios)
  }

  /**
   * Returns track information for a user's likes
   * @param options - Can either be the profile URL of the user, or their ID
   * @returns - An array of tracks
   */
  async getLikes (options: GetLikesOptions, limit = 10, offset = 0): Promise<PaginatedQuery<Like>> {
    let id: number
    const clientID = await this.getClientID()
    if (options.id) {
      id = options.id
    } else if (options.profileURL) {
      const user = await getUser(options.profileURL, clientID, this.axios)
      id = user.id
    } else {
      throw new Error('options.id or options.profileURL must be provided.')
    }

    return await getLikes(id, clientID, this.axios, limit, offset)
  }

  /**
   * Returns information about a user
   * @param url - The profile URL of the user
   */
  async getUser (url: string): Promise<User> {
    return getUser(url, await this.getClientID(), this.axios)
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
    return isValidURL(url)
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
        if (!d.getDay()) return reject(new Error("Invalid date object from 'date' in client_id.json"))
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
}

// SCDL instance with default configutarion
const scdl = new SCDL()

// Creates an instance of SCDL with custom configuration
const create = (options: SCDLOptions): SCDL => new SCDL(options)

export { create }

scdl.STREAMING_PROTOCOLS = _PROTOCOLS
scdl.FORMATS = _FORMATS

export default scdl
