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
const scdl = require('../')
const fileType = require('file-type')
let downloadedFile

console.log(process.env.CLIENT_ID)

describe('Real Download Tests', () => {
  beforeAll(async () => {
    if (process.env.CLIENT_ID) {
      downloadedFile = await scdl.download(
        'https://soundcloud.com/monsune_inc/outta-my-mind',
        process.env.CLIENT_ID
      )
    } else {
      console.error('Client ID Undefined')
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
  it('No Errors in Stream', () => {
    downloadedFile.on('error', (err) => {
      expect(err).toBeFalsy()
    })
  })
})
