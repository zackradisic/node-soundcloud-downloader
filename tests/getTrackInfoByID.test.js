/**
 * @jest-environment node
 */
import scdl from '../'

describe('getTrackInfoByID()', () => {
  it('returns track info when given a valid url', async done => {
    try {
      const info = await scdl.getTrackInfoByID(145997673)
      expect(info.title).toBeDefined()
      expect(info.title).toEqual('Logic Ft. Big Sean - Alright (Prod. By Tae Beast)')
      done()
    } catch (err) {
      console.error(err)
      done(err)
    }
  })
})
