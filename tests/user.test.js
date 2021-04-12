/**
 * @jest-environment node
 */

import scdl from '..'

describe('getUser()', () => {
  const profileURL = 'https://soundcloud.com/uiceheidd'

  it('returns a valid user response', async (done) => {
    try {
      const user = await scdl.getUser(profileURL)

      expect(user).toBeDefined()
      expect(user.kind).toEqual('user')
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })
})
