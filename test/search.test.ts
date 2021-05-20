/**
 * @jest-environment node
 */

import scdl from '../dist'
import { SoundcloudResource } from '../dist/search'

describe('search()', () => {
  it('returns a valid search object and collection length equal or less than limit and next_href pagination works', async (done) => {
    try {
      const query = 'borderline tame impala'
      const types: ('all' | SoundcloudResource)[] = ['all', 'tracks', 'users', 'albums', 'playlists']

      types.forEach(async (type) => {
        try {
          let searchResponse = await scdl.search({
            query,
            resourceType: type,
            limit: 5
          })
          
          const keys = [
            'collection',
            'total_results',
            'query_urn'
          ] 

          keys.forEach((key) => expect(searchResponse[key as keyof typeof searchResponse]).toBeDefined())
          expect(searchResponse.collection.length).toBeLessThanOrEqual(5)

          searchResponse = await scdl.search({
            nextHref: searchResponse.next_href
          })
          keys.forEach((key) =>
            expect(searchResponse[key as keyof typeof searchResponse]).toBeDefined()
          )

          done()
        } catch (err) {
          console.error(err)
          done(err)
        }
      })
    } catch (err) {
      console.error(err)
      done(err)
    }
  })
})
