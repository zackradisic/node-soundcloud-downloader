/**
 * @jest-environment node
 */

import scdl from '../'

describe('search()', () => {
  it('returns a valid search object', async done => {
    try {
      const query = 'borderline tame impala'
      const types = ['all', 'tracks', 'users', 'albums', 'playlists']

      types.forEach(async (type, idx) => {
        try {
          const searchResponse = await scdl.search({
            query,
            resourceType: types[idx]
          })
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

  it('next_href pagination works', async done => {
    try {
      const query = 'borderline tame impala'
      const types = ['all', 'tracks', 'users', 'albums', 'playlists']
      let nextHref = ''

      types.forEach(async (type, idx) => {
        try {
          const searchResponse = await scdl.search({
            query,
            resourceType: types[idx]
          })
          let keys = ['collection', 'total_results', 'query_urn'].forEach(key => expect(searchResponse[key]).toBeDefined())
          nextHref = searchResponse.next_href
          const response = await scdl.search({
            nextHref
          })
          keys = ['collection', 'total_results', 'query_urn'].forEach(key => expect(response[key]).toBeDefined())
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

  it('resource count is equal to limit', async done => {
    try {
      const query = 'borderline tame impala'
      const limit = 15
      const offset = 0

      const searchResponse = await scdl.search({ query, limit, offset, resourceType: 'tracks' })
      expect(searchResponse.collection.length).toEqual(limit)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })
})
