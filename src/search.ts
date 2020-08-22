/* eslint-disable camelcase */
import axios from 'axios'
import { TrackInfo } from './info'

/** @internal */
const baseURL = 'https://api-v2.soundcloud.com/search'

export type SearchResponse = {
    collection: TrackInfo[]
    total_results: number,
    next_href: string,
    query_urn: string
}

/** @internal */
export const search = async (query: string, clientID?: string): Promise<SearchResponse> => {
  const { data } = await axios.get(`${baseURL}?client_id=${clientID}&q=${query}`)
  return data as SearchResponse
}
