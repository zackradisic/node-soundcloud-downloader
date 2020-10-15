/* eslint-disable camelcase */
import { axiosManager } from './axios'
import { TrackInfo, User, SetInfo } from './info'
import { appendURL } from './util'

/** @internal */
const baseURL = 'https://api-v2.soundcloud.com/search'

export type SearchResponse<T> = {
    collection: T[]
    total_results: number,
    next_href: string,
    query_urn: string
}

export type RelatedResponse<T> = {
  collection: T[]
  next_href: string,
  query_urn: string,
  variant: string
}

export type SearchResponseAll = SearchResponse<User | SetInfo | TrackInfo>

export type SoundcloudResource = 'tracks' | 'users' | 'albums' | 'playlists'

/** @internal */
export const search = async (type: SoundcloudResource | 'all', query: string, clientID?: string): Promise<SearchResponseAll> => {
  const { data } = await axiosManager.instance.get(appendURL(`${baseURL}${type === 'all' ? '' : `/${type}`}`, 'client_id', clientID, 'q', query))
  return data as SearchResponseAll
}

/** @internal */
export const related = async <T extends TrackInfo> (id: number, limit = 10, offset = 0, clientID: string): Promise<RelatedResponse<T>> => {
  const { data } = await axiosManager.instance.get(appendURL(`https://api-v2.soundcloud.com/tracks/${id}/related`, 'client_id', clientID, 'offset', '' + offset, 'limit', '' + limit))
  return data as RelatedResponse<T>
}
