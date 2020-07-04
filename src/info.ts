/* eslint-disable camelcase */
import axios, { AxiosInstance } from 'axios'
import { handleRequestErrs } from './util'

import STREAMING_PROTOCOLS from './protocols'
import FORMATS from './formats'

export interface TrackInfo {
  comment_count: number,
  full_duration: number,
  downloadable: false,
  created_at: string,
  description?: string,
  media: { transcodings: Transcoding[] },
  title: string,
  publisher_metadata: any,
  duration: number,
  has_downloads_left: boolean,
  artwork_url: string,
  public: boolean,
  streamable: true,
  tag_list: string,
  genre: string,
  id: number,
  reposts_count: number,
  label_name?: string,
  state: string,
  last_modified: string,
  commentable: boolean,
  policy: string,
  uri: string,
  download_count: number,
  likes_count: number,
  display_date: string,
  user_id: number,
  waveform_url: string,
  permalink: string,
  permalink_url: string,
  user: {
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
  },
  playback_count: number

}

export interface Transcoding {
  url: string,
  preset: string,
  snipped: boolean,
  format: { protocol: STREAMING_PROTOCOLS, mime_type: FORMATS}
}

export const getInfoBase = async (url: string, clientID: string, axiosRef: AxiosInstance): Promise<TrackInfo> => {
  try {
    const res = await axiosRef.get(`https://api-v2.soundcloud.com/resolve?url=${url}&client_id=${clientID}`, {
      withCredentials: true
    })
    return res.data as TrackInfo
  } catch (err) {
    console.log(err)
    throw handleRequestErrs(err)
  }
}
const getInfo = async (url: string, clientID: string): Promise<TrackInfo> => {
  return await getInfoBase(url, clientID, axios)
}

export default getInfo
