/**
 * @jest-environment node
 */

import scdl from '../'

describe('search()', () => {
  it('returns a valid search object and collection length equal or less than limit and next_href pagination works', async done => {
    try {
      const query = 'borderline tame impala'
      const types = ['all', 'tracks', 'users', 'albums', 'playlists']

      types.forEach(async (type, idx) => {
        try {
          let searchResponse = await scdl.search({
            query,
            resourceType: types[idx],
            limit: 5
          })
          let keys = ['collection', 'total_results', 'query_urn'].forEach(key => expect(searchResponse[key]).toBeDefined())
          expect(searchResponse.collection.length).toBeLessThanOrEqual(5)

          searchResponse = await scdl.search({
            nextHref: searchResponse.next_href
          })
          keys = ['collection', 'total_results', 'query_urn'].forEach(key => expect(searchResponse[key]).toBeDefined())
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
