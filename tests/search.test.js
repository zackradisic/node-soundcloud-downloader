/**
 * @jest-environment node
 */

import scdl from '../'

describe('search()', () => {
  it('returns a valid search object', async done => {
    try {
      const query = 'borderline tame impala'
      const types = ['all', 'tracks', 'users', 'albums', 'playlists']

      types.forEach(async type => {
        try {
          const searchResponse = await scdl.search(type, query)
          const keys = ['collection', 'total_results', 'query_urn'].forEach(key => expect(searchResponse[key]).toBeDefined())
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
