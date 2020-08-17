/**
 * @jest-environment node
 */

import scdl from '../'

describe('getSetInfo()', () => {
  describe('called with full = false', () => {
    let info

    beforeAll(async () => {
      try {
        info = await scdl.getSetInfo('https://soundcloud.com/user-845046062/sets/playlist')
      } catch (err) {
        console.error(err)
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
  })

  describe('called with full = true', () => {
    let info

    beforeAll(async () => {
      jest.setTimeout(20 * 1000)
      try {
        info = await scdl.getSetInfo('https://soundcloud.com/user-845046062/sets/playlist', true)
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
    })

    it('returns SetInfo with every track containing full information', () => {
      expect(info).toBeDefined()
      expect(info.title).toBeDefined()
      expect(typeof info.title).toBe('string')
      expect(info.tracks).toBeDefined()
      expect(typeof info.tracks).toBe('object')

      for (const track of info.tracks) {
        expect(track.title).toBeDefined()
      }
    })
  })
})
