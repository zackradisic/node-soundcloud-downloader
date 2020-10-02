/**
 * @jest-environment node
 */
const scdl = require('..')
const fileType = require('file-type')

let streams
let trackNames
describe('downloadPlaylist()', () => {
  beforeAll(async () => {
    try {
      const [s, t] = await scdl.downloadPlaylist('https://soundcloud.com/zack-radisic-103764335/sets/test')
      streams = s
      trackNames = t
    } catch (err) {
      console.log(err)
    }
  })

  it('streams are defined', () => {
    streams.forEach(stream => expect(stream).toBeDefined())
  })

  it('stream mime type is mpeg', async done => {
    try {
      for (const stream of streams) {
        const type = await fileType.fromStream(stream)
        expect(type).toBeDefined()
        expect(type.mime).toBe('audio/mpeg')
      }
      done()
    } catch (err) {
      console.log(err)
      done(err)
    }
  })

  it('Track names are defined and are of type string', () => {
    trackNames.forEach(trackName => {
      expect(trackName).toBeDefined()
      expect(typeof trackName).toBe('string')
    })
  })

  it('No Errors in Stream', () => {
    streams.forEach(stream => stream.on('error', (err) => {
      expect(err).toBeFalsy()
    }))
  })
})
