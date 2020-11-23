/* eslint-disable camelcase */
import { AxiosInstance } from 'axios'
import { TrackInfo, User, SetInfo } from './info'
import { appendURL, PaginatedQuery } from './util'

/** @internal */
const baseURL = 'https://api-v2.soundcloud.com/search'

export interface RelatedResponse<T> extends PaginatedQuery<T> {
  variant: string
}

export type SearchResponseAll = PaginatedQuery<User | SetInfo | TrackInfo>

export type SoundcloudResource = 'tracks' | 'users' | 'albums' | 'playlists'

/** @internal */
export const search = async (type: SoundcloudResource | 'all', query: string, axiosInstance: AxiosInstance, clientID: string): Promise<SearchResponseAll> => {
  const { data } = await axiosInstance.get(appendURL(`${baseURL}${type === 'all' ? '' : `/${type}`}`, 'client_id', clientID, 'q', query))
  return data as SearchResponseAll
}

/** @internal */
export const related = async <T extends TrackInfo> (id: number, limit = 10, offset = 0, axiosInstance: AxiosInstance, clientID: string): Promise<RelatedResponse<T>> => {
  const { data } = await axiosInstance.get(appendURL(`https://api-v2.soundcloud.com/tracks/${id}/related`, 'client_id', clientID, 'offset', '' + offset, 'limit', '' + limit))
  return data as RelatedResponse<T>
}
