/**
 * @jest-environment node
 */

import scdl from '../'

describe('getSetInfo()', () => {
  describe('returns valid SetInfo', () => {
    let info

    beforeAll(async () => {
      try {
        info = await scdl.getSetInfo('https://soundcloud.com/user-845046062/sets/playlist')
      } catch (err) {
        console.log(err)
        process.exit(1)
      }
    })

    it('returns SetInfo', () => {
      expect(info).toBeDefined()
      expect(info.title).toBeDefined()
      expect(typeof info.title).toBe('string')
      expect(info.tracks).toBeDefined()
      expect(typeof info.tracks).toBe('object')
    })

    it('returns SetInfo with every track containing full information', () => {
      for (const track of info.tracks) {
        expect(track.title).toBeDefined()
      }
    })
  })
})
