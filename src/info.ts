/* eslint-disable camelcase */
import { AxiosInstance } from 'axios'
import { axiosManager } from './axios'
import { handleRequestErrs, appendURL } from './util'

import STREAMING_PROTOCOLS from './protocols'
import FORMATS from './formats'

/**
 * A Soundcloud user
 */
export interface User {
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

/** @internal */
const getTrackInfoBase = async (clientID: string, axiosRef: AxiosInstance, ids: number[]): Promise<TrackInfo> => {
  try {
    const { data } = await axiosRef.get(appendURL('https://api-v2.soundcloud.com/tracks', 'ids', ids.join(','), 'client_id', clientID))

    return data as TrackInfo
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

  const incompleteTracks = setInfo.tracks.filter(track => !track.title)
  if (incompleteTracks.length === 0) {
    return setInfo
  }
  const completeTracks = setInfo.tracks.filter(track => track.title)

  const ids = incompleteTracks.map(t => t.id)
  const info = await getTrackInfoByID(clientID, ids)

  setInfo.tracks = completeTracks.concat(info)
  return setInfo
}

/** @internal */
const getInfo = async (url: string, clientID: string): Promise<TrackInfo> => {
  const data = await getInfoBase<TrackInfo>(url, clientID, axiosManager.instance)
  if (!data.media) throw new Error('The given URL does not link to a Soundcloud track')
  return data
}

/** @internal */
export const getSetInfo = async (url: string, clientID: string): Promise<SetInfo> => {
  const data = await getSetInfoBase(url, clientID, axiosManager.instance)
  if (!data.tracks) throw new Error('The given URL does not link to a Soundcloud set')
  return data
}

/** @intenral */
export const getTrackInfoByID = async (clientID: string, ids: number[]) => {
  return await getTrackInfoBase(clientID, axiosManager.instance, ids)
}
export default getInfo
