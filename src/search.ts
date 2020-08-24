/* eslint-disable camelcase */
import axios from 'axios'
import { TrackInfo, User, SetInfo } from './info'

/** @internal */
const baseURL = 'https://api-v2.soundcloud.com/search'

export type SearchResponse<T> = {
    collection: T[]
    total_results: number,
    next_href: string,
    query_urn: string
}

export type SearchResponseAll = SearchResponse<User | SetInfo | TrackInfo>

export type SoundcloudResource = 'tracks' | 'people' | 'albums' | 'playlists'

/** @internal */
export const search = async (type: SoundcloudResource | 'all', query: string, clientID?: string): Promise<SearchResponseAll> => {
  const { data } = await axios.get(`${baseURL}${type === 'all' ? '' : `/${type}/`}?client_id=${clientID}&q=${query}`)
  return data as SearchResponseAll
}

/** @internal */
export const related = async <T extends TrackInfo | User | SetInfo> (type: SoundcloudResource, id: number, limit = 10, offset = 0, clientID: string): Promise<SearchResponse<T>> => {
  const { data } = await axios.get(`https://api-v2.soundcloud.com/${type}/${id}/related?client_id=${clientID}&offset=${offset}&limit=${limit}`)
  return data as SearchResponse<T>
}
