/* eslint-disable camelcase */
import { AxiosInstance } from 'axios'
import { handleRequestErrs, appendURL, extractIDFromPersonalizedTrackURL } from './util'

import STREAMING_PROTOCOLS from './protocols'
import FORMATS from './formats'

/**
 * A Soundcloud user
 */
export interface User {
  kind: string,
  avatar_url: string,
  city: string,
  comments_count: number,
  country_code: string,
  created_at: string,
  description: string,
  followers_count: number,
  followings_count: number,
  first_name: string,
  full_name: string,
  groups_count: number,
  id: number,
  last_name: string,
  permalink_url: string,
  uri: string,
  username: string
}

/**
 * Details about the track
 */
export interface TrackInfo {
  kind: string
  monetization_model: string,
  id: number,
  policy: string,
  comment_count?: number,
  full_duration?: number,
  downloadable?: false,
  created_at?: string,
  description?: string,
  media?: { transcodings: Transcoding[] },
  title?: string,
  publisher_metadata?: any,
  duration?: number,
  has_downloads_left?: boolean,
  artwork_url?: string,
  public?: boolean,
  streamable?: true,
  tag_list?: string,
  genre?: string,
  reposts_count?: number,
  label_name?: string,
  state?: string,
  last_modified?: string,
  commentable?: boolean,
  uri?: string,
  download_count?: number,
  likes_count?: number,
  display_date?: string,
  user_id?: number,
  waveform_url?: string,
  permalink?: string,
  permalink_url?: string,
  user?: User,
  playback_count?: number
}

/**
 * Details about a Set
 */
export interface SetInfo {
  duration: number,
  permalink_url: string,
  reposts_count: number,
  genre: string,
  permalink: string,
  purchase_url?: string,
  description?: string,
  uri: string,
  label_name?: string,
  tag_list: string,
  set_type: string,
  public: boolean,
  track_count: number,
  user_id: number,
  last_modified: string,
  license: string,
  tracks: TrackInfo[],
  id: number,
  release_date?: string,
  display_date: string,
  sharing: string,
  secret_token?: string,
  created_at: string,
  likes_count: number,
  kind: string,
  purchase_title?: string,
  managed_by_feeds: boolean,
  artwork_url?: string,
  is_album: boolean,
  user: User,
  published_at: string,
  embeddable_by: string
}

/**
 * Represents an audio link to a Soundcloud Track
 */
export interface Transcoding {
  url: string,
  preset: string,
  snipped: boolean,
  format: { protocol: STREAMING_PROTOCOLS, mime_type: FORMATS }
}

const getTrackInfoBase = async (clientID: string, axiosRef: AxiosInstance, ids: number[], playlistID?: number, playlistSecretToken?: string): Promise<TrackInfo[]> => {
  let url = appendURL('https://api-v2.soundcloud.com/tracks', 'ids', ids.join(','), 'client_id', clientID)
  if (playlistID && playlistSecretToken) {
    url = appendURL(url, 'playlistId', '' + playlistID, 'playlistSecretToken', playlistSecretToken)
  }
  try {
    const { data } = await axiosRef.get(url)

    return data as TrackInfo[]
  } catch (err) {
    throw handleRequestErrs(err)
  }
}

/** @internal */
export const getInfoBase = async <T extends TrackInfo | SetInfo>(url: string, clientID: string, axiosRef: AxiosInstance): Promise<T> => {
  try {
    const res = await axiosRef.get(appendURL('https://api-v2.soundcloud.com/resolve', 'url', url, 'client_id', clientID), {
      withCredentials: true
    })

    return res.data as T
  } catch (err) {
    console.log(err)
    throw handleRequestErrs(err)
  }
}

/** @internal */
const getSetInfoBase = async (url: string, clientID: string, axiosRef: AxiosInstance): Promise<SetInfo> => {
  const setInfo = await getInfoBase<SetInfo>(url, clientID, axiosRef)
  const temp = [...setInfo.tracks].map(track => track.id)
  const playlistID = setInfo.id
  const playlistSecretToken = setInfo.secret_token
  const incompleteTracks = setInfo.tracks.filter(track => !track.title)
  if (incompleteTracks.length === 0) {
    return setInfo
  }
  const completeTracks = setInfo.tracks.filter(track => track.title)

  const ids = incompleteTracks.map(t => t.id)
  if (ids.length > 50) {
    const splitIds = []
    for (let x = 0; x <= Math.floor(ids.length / 50); x++) {
      splitIds.push([])
    }

    for (let x = 0; x < ids.length; x++) {
      const i = Math.floor(x / 50)
      splitIds[i].push(ids[x])
    }

    const promises = splitIds.map(async ids => await getTrackInfoByID(clientID, axiosRef, ids, playlistID, playlistSecretToken))
    const info = await Promise.all(promises)
    setInfo.tracks = completeTracks.concat(...info)
    setInfo.tracks = sortTracks(setInfo.tracks, temp)
    return setInfo
  }
  const info = await getTrackInfoByID(clientID, axiosRef, ids, playlistID, playlistSecretToken)

  setInfo.tracks = completeTracks.concat(info)
  setInfo.tracks = sortTracks(setInfo.tracks, temp)
  return setInfo
}

/** @internal */
const sortTracks = (tracks: TrackInfo[], ids: number[]): TrackInfo[] => {
  for (let i = 0; i < ids.length; i++) {
    if (tracks[i].id !== ids[i]) {
      for (let j = 0; j < tracks.length; j++) {
        if (tracks[j].id === ids[i]) {
          const temp = tracks[i]
          tracks[i] = tracks[j]
          tracks[j] = temp
        }
      }
    }
  }

  return tracks
}

/** @internal */
const getInfo = async (url: string, clientID: string, axiosInstance: AxiosInstance): Promise<TrackInfo> => {
  let data
  if (url.includes('https://soundcloud.com/discover/sets/personalized-tracks::')) {
    const idString = extractIDFromPersonalizedTrackURL(url)
    if (!idString) throw new Error('Could not parse track ID from given URL: ' + url)
    let id: number
    try {
      id = parseInt(idString)
    } catch (err) {
      throw new Error('Could not parse track ID from given URL: ' + url)
    }

    data = (await getTrackInfoByID(clientID, axiosInstance, [id]))[0]
    if (!data) throw new Error('Could not find track with ID: ' + id)
  } else {
    data = await getInfoBase<TrackInfo>(url, clientID, axiosInstance)
  }
  if (!data.media) throw new Error('The given URL does not link to a Soundcloud track')
  return data
}

/** @internal */
export const getSetInfo = async (url: string, clientID: string, axiosInstance: AxiosInstance): Promise<SetInfo> => {
  const data = await getSetInfoBase(url, clientID, axiosInstance)
  if (!data.tracks) throw new Error('The given URL does not link to a Soundcloud set')
  return data
}

/** @intenral */
export const getTrackInfoByID = async (clientID: string, axiosInstance: AxiosInstance, ids: number[], playlistID?: number, playlistSecretToken?: string) => {
  return await getTrackInfoBase(clientID, axiosInstance, ids, playlistID, playlistSecretToken)
}
export default getInfo
