import { AxiosInstance } from 'axios'
import { TrackInfo } from './info'
import { appendURL, kindMismatchError, PaginatedQuery } from './util'

const baseURL = 'https://api-v2.soundcloud.com/users/'

export interface Like {
    // eslint-disable-next-line camelcase
    created_at: string,
    kind: string,
    track: TrackInfo
}

export interface GetLikesOptions {
  profileUrl?: string
  id?: number
  limit?: number
  offset?: number
  nextHref?: string
}

/** @internal */
export const getLikes = async (options: GetLikesOptions, clientID: string, axiosInstance: AxiosInstance): Promise<PaginatedQuery<Like>> => {
  // limit = limit + 1 // For some reason SoundCloud returns limit - 1, but only for likes??
  let u = ''
  if (!options.nextHref) {
    if (!options.limit) options.limit = 10
    if (!options.offset) options.offset = 0
    u = appendURL(`https://api-v2.soundcloud.com/users/${options.id}/likes`, 'client_id', clientID, 'limit', '' + options.limit, 'offset', '' + options.offset)
  } else {
    u = appendURL(options.nextHref, 'client_id', clientID)
  }

  let response: PaginatedQuery<Like>
  let nextHref = 'start'
  while (nextHref) {
    const { data } = await axiosInstance.get(u)

    const query = data as PaginatedQuery<Like>
    if (!query.collection) throw new Error('Invalid JSON response received')
    if (query.collection.length === 0) return data

    if (query.collection[0].kind !== 'like') throw kindMismatchError('like', query.collection[0].kind)

    if (!response) {
      response = query
    } else {
      response.collection.push(
        ...query.collection
      )
    }
    nextHref = query.next_href
    u = appendURL(options.nextHref, 'client_id', clientID)
  }

  return response
}
