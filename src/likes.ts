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
  limit?: number // -1 indicates no limit
  offset?: number
  nextHref?: string
}

/** @internal */
export const getLikes = async (options: GetLikesOptions, clientID: string, axiosInstance: AxiosInstance): Promise<PaginatedQuery<Like>> => {
  let u = ''
  if (!options.nextHref) {
    if (!options.limit) options.limit = -1
    if (!options.offset) options.offset = 0
    u = appendURL(
      `https://api-v2.soundcloud.com/users/${options.id}/likes`,
      'client_id', clientID,
      'limit', '' + (options.limit === -1 ? 200 : options.limit),
      'offset', '' + options.offset)
  } else {
    u = appendURL(options.nextHref, 'client_id', clientID)
  }

  let response: PaginatedQuery<Like>
  let nextHref = 'start'

  // If options.limit > 0, query each page of likes until we have collected
  // `options.limit` liked tracks.
  // If options.limit === -1, query every page of likes
  while (nextHref && (options.limit > 0 || options.limit === -1)) {
    const { data } = await axiosInstance.get(u)

    const query = data as PaginatedQuery<Like>
    if (!query.collection) throw new Error('Invalid JSON response received')
    if (query.collection.length === 0) return data

    if (query.collection[0].kind !== 'like') throw kindMismatchError('like', query.collection[0].kind)

    // Only add tracks (for now)
    query.collection = query.collection.reduce((prev, curr) => curr.track ? prev.concat(curr) : prev, [])
    if (!response) {
      response = query
    } else {
      response.collection.push(
        ...query.collection
      )
    }

    if (options.limit !== -1) {
      options.limit -= query.collection.length
      // We have collected enough likes
      if (options.limit <= 0) break
    }

    nextHref = query.next_href
    if (nextHref) {
      if (options.limit !== -1) {
        const url = new URL(nextHref)
        url.searchParams.set('limit', '' + options.limit)
        nextHref = url.toString()
      }
      u = appendURL(nextHref, 'client_id', clientID)
    }
  }

  return response
}
