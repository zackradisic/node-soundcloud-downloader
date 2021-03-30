/**
 * @jest-environment node
 */

import scdl from '..'

describe('getLikes()', () => {
  const profileUrl = 'https://soundcloud.com/uiceheidd'
  const limit = 41

  let response
  let count

  beforeAll(async () => {
    try {
      response = await scdl.getLikes({
        profileUrl,
        limit
      })
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })

  it('returns a paginated query', () => {
    expect(response).toBeDefined()
    const keys = ['collection', 'next_href', 'query_urn']
    keys.forEach(key => expect(response[key]).toBeDefined())
  })

  it('the paginated query collection is an array of likes', () => {
    response.collection.forEach(like => expect(like.kind).toEqual('like'))
  })

  it('each like should have a track object', () => response.collection.forEach(like => {
    expect(like.track.kind).toBeDefined()
    expect(like.track.kind).toEqual('track')
  }))

  it('collection length should be less than or equal to limit if limit !== -1', () => {
    count = response.collection.length
    expect(response.collection.length).toBeLessThanOrEqual(limit)
  })

  it('should fetch as many liked tracks as possible when limit === -1', async (done) => {
    try {
      const likes = await scdl.getLikes({
        profileUrl,
        limit: -1
      })
      expect(likes.collection.length).toBeGreaterThanOrEqual(count)
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })
})
