/**
 * @jest-environment node
 */

import scdl from '../dist'

describe('prepareURL()', () => {
  it('strips a mobile URL of its prefix', async (done) => {
    const url =
      'https://m.soundcloud.com/sidewalksandskeletons/ic3peak-ill-be-found-sidewalks-and-skeletons-remix'
    const expected =
      'https://soundcloud.com/sidewalksandskeletons/ic3peak-ill-be-found-sidewalks-and-skeletons-remix'

    try {
      const result = await scdl.prepareURL(url)
      expect(result).toEqual(expected)
      done()
    } catch (err) {
      done(err)
    }
  })

  it('converts a Firebase URL to a regular URL', async (done) => {
    const url = 'https://soundcloud.app.goo.gl/z8snjNyHU8zMHH29A'
    const expected =
      'https://soundcloud.com/taliya-jenkins/double-cheese-burger-hold-the?ref=clipboard&p=i&c=0'

    try {
      const result = await scdl.prepareURL(url)
      expect(result.toString()).toEqual(expected)
      done()
    } catch (err) {
      done(err)
    }
  })

  it('returns the original string if it is not a mobile or Firebase URL', async (done) => {
    const url =
      'https://soundcloud.com/taliya-jenkins/double-cheese-burger-hold-the?ref=clipboard&p=i&c=0'
    try {
      const result = await scdl.prepareURL(url)
      expect(result).toEqual(url)
      done()
    } catch (err) {
      done(err)
    }
  })
})
