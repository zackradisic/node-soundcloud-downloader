/**
 * @jest-environment node
 */

import scdl from '../dist'
import { RelatedResponse } from '../dist/search'
import { TrackInfo } from '../dist/info'

describe('related()', () => {
  const limit = 10
  let searchResponse: RelatedResponse<TrackInfo>

  beforeAll(async () => {
    try {
      searchResponse = await scdl.related(170286204, limit, 0)
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  })

  it('returns a valid SearchResponse object', () => {
    [
      'collection',
      'next_href',
      'variant',
      'query_urn'
    ].forEach((key) => expect(searchResponse[key as keyof typeof searchResponse]).toBeDefined())
  })

  it('resource count returned is equal to limit', () => {
    expect(searchResponse.collection.length).toBeLessThanOrEqual(limit)
  })

  it('returns a valid track object', () => {
    searchResponse.collection.forEach((track) => {
      expect(track.kind).toEqual('track')
    })
  })
})
