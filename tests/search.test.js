/**
 * @jest-environment node
 */

import scdl from '../'

describe('search()', () => {
  it('returns a valid search object', async done => {
    try {
      const query = 'borderline tame impala'
      const searchResponse = await scdl.search('all', query)
      const keys = ['collection', 'total_results', 'query_urn'].forEach(key => expect(searchResponse[key]).toBeDefined())
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })
})
