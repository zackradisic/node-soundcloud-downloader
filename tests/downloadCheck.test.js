/**
 * @jest-environment node
 */

/**
 *  This file tests the actual download of the a song, without mocking axios
 *
 * Author : Rahul Tarak
 *
 */
require('dotenv').config()
const scdl = require('../').default
const fileType = require('file-type')
const mm = require('music-metadata')

let downloadedFile
let downloadedFile2

describe('Real Download Tests', () => {
  beforeAll(async () => {
    try {
      downloadedFile = await scdl.download(
        'https://soundcloud.com/monsune_inc/outta-my-mind'
      )
      downloadedFile2 = await scdl.download(
        'https://soundcloud.com/dakota-perez-7/omfg-mashup-hello-i-love-you-yeah-ice-cream-and-wonderful'
      )
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
    // console.log(downloadedFile)
  })
  it('Stream is Defined', () => {
    expect(downloadedFile).toBeDefined()
  })
  it('Check File Type is Mpeg', async () => {
    const type = await fileType.fromStream(downloadedFile)
    expect(type).toBeDefined()
    expect(type.mime).toBe('audio/mpeg')
  })
  it('Check Bitrate of file downloaded by provided link', async () => {
    const {
      format: { bitrate }
    } = await mm.parseStream(downloadedFile2)
    expect(bitrate / 1000).toBeGreaterThan(200)
  })

  it('No Errors in Stream', () => {
    downloadedFile.on('error', (err) => {
      expect(err).toBeFalsy()
    })
  })
})
