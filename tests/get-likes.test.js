/**
 * @jest-environment node
 */

import scdl from '..'

describe('getLikes()', () => {
  const profileURL = 'https://soundcloud.com/uiceheidd'
  const limit = 10

  let response

  beforeAll(async () => {
    try {
      response = await scdl.getLikes({
        profileURL
      }, limit)
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

  it('collection length should be equal to limit', () => {
    expect(response.collection.length).toEqual(limit)
  })
})
