import { axiosManager } from './axios'
import { TrackInfo } from './info'
import { appendURL, kindMismatchError, PaginatedQuery } from './util'

const baseURL = 'https://api-v2.soundcloud.com/users/'

export interface Like {
    // eslint-disable-next-line camelcase
    created_at: string,
    kind: string,
    track: TrackInfo
}

export const getLikes = async (id: number, clientID: string, limit = 10, offset = 0): Promise<PaginatedQuery<Like>> => {
  const u = appendURL(`https://api-v2.soundcloud.com/users/${id}/likes`, 'client_id', clientID, 'limit', '' + limit, 'offset', '' + offset)

  const { data } = await axiosManager.instance.get(u)

  const query = data as PaginatedQuery<Like>
  if (!query.collection) throw new Error('Invalid JSON response received')
  if (query.collection.length === 0) return data

  if (query.collection[0].kind !== 'like') throw kindMismatchError('like', query.collection[0].kind)

  return query
}
