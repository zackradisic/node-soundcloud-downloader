import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  fromURLBase,
  fromMediaObjBase,
  getMediaURL,
  getProgressiveStream,
  getHLSStream
} from '../dist/download'

const download = {
  fromURLBase,
  getMediaURL,
  getProgressiveStream,
  getHLSStream
}

const progressiveUrl =
  'https://api-v2.soundcloud.com/media/soundcloud:tracks:673346252/5bbe88bd-64e9-4512-a98a-c1cba75a5cef/stream/progressive'
const hlsUrl =
  'https://api-v2.soundcloud.com/media/soundcloud:tracks:673346252/5bbe88bd-64e9-4512-a98a-c1cba75a5cef/stream/hls'

const progressiveData = {
  url:
    'https://cf-media.sndcdn.com/xjZ4dqtlTGOU.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20veGpaNGRxdGxUR09VLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1OTI4Njc4ODl9fX1dfQ__&Signature=QDzPbJUtaAaD8FkZ~Livtsb98s~YVqFdRty3z5T9o6uAEBr1K9sTPN4ehDB82hHXCk8NIyfcgGgfi4IluRCDUgXyx-ZGS5lt4H3tFLk4BHgfKKXUhszbhT-gah-D5A0Vru~lPDQPLqNb3jYe2nT8m92q6ywbRmkmq5wWnEpnxls3AJ70f1i6k4RsfjeAj2pr6q2wJ3MPuQGR9B3EeAboUvBk2Vah8cglVGKBcdT~0~GY-AtSjFVIcjpLqTZZRGPoDmKQhbeNCYWeVFsfwEq028aKiK5~NuZZcxe-jNMjwl0Bk-CMuTsJvUg4pfQnys-qZpOjR2Tw~WyeMeVZiGBBTA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ'
}
const hlsData = {
  url:
    'https://cf-hls-media.sndcdn.com/playlist/xjZ4dqtlTGOU.128.mp3/playlist.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL3BsYXlsaXN0L3hqWjRkcXRsVEdPVS4xMjgubXAzL3BsYXlsaXN0Lm0zdTgiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1OTMxMjU1MTh9fX1dfQ__&Signature=SPBY4CPgXi9lf4SV97uxN~8Z6OztRo~ZEOxnnxAImlGmKphqnmw3WkKLI7lH4Md6HF~ZfffrDznWy08b-iFx-B~V~0zcXd~uSq6bgdOn~b7SqVV0M225okaeXaUK-vgpnsJVBiDX0DpnCt3YQZfxxFxBb62KYlXBXkNB-bzymYMX5mtcYU~nu0Exuzp4pFulaeLEMHk5VrHpzLDbGZMDhyZ7nmRwT1DwQcPrXcPMzic~hChBDMIOXEGMYvhgxVjM4lvNfyG-jkTYzRdTLVKuHzeCwkynIBAokrk58P4wmnGLq7xJPn1PdyN5UORpV3KpCf8cBO~pdMkzGs0RD2eT9A__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ'
}

describe('Download Tests', () => {
  describe('fromURL()', () => {
    it('downloads a track using progressive protocol when given a progressive link', async (done) => {
      const url = progressiveUrl
      const mock = new MockAdapter(axios)
      const instance = axios.create()
      mock
        .onGet(`${url}?client_id=${process.env.CLIENT_ID}`)
        .reply(200, progressiveData)
      mock.onGet(progressiveData.url).reply(200)
      const getMediaURLSpy = jest.spyOn(download, 'getMediaURL')
      const getProgressiveStreamSpy = jest.spyOn(
        download,
        'getProgressiveStream'
      )

      try {
        await download.fromURLBase(
          url,
          process.env.CLIENT_ID,
          getMediaURLSpy,
          getProgressiveStreamSpy,
          null,
          instance
        )
        expect(getMediaURLSpy).toHaveBeenCalled()
        expect(getProgressiveStreamSpy).toHaveBeenCalled()
        done()
      } catch (err) {
        console.log(err)
        done(err)
      }
    })

    it('downloads a track using HLS protocol when given an HLS link', async (done) => {
      const url = hlsUrl
      const mock = new MockAdapter(axios)
      const instance = axios.create()
      mock
        .onGet(`${url}?client_id=${process.env.CLIENT_ID}`)
        .reply(200, progressiveData)
      mock.onGet(hlsData.url).reply(200)
      const getMediaURLSpy = jest.spyOn(download, 'getMediaURL')
      const getHLSStreamSpy = jest.fn()

      try {
        await download.fromURLBase(
          url,
          process.env.CLIENT_ID,
          getMediaURLSpy,
          null,
          getHLSStreamSpy,
          instance
        )
        expect(getMediaURLSpy).toHaveBeenCalled()
        expect(getHLSStreamSpy).toHaveBeenCalled()
        done()
      } catch (err) {
        console.log(err)
        done(err)
      }
    })
  })

  describe('fromMediaObj()', () => {
    it('should call fromURL() when given a valid media object', async (done) => {
      const mediaObj = {
        url:
          'https://api-v2.soundcloud.com/media/soundcloud:tracks:673346252/5bbe88bd-64e9-4512-a98a-c1cba75a5cef/stream/hls',
        preset: 'mp3_0_0',
        duration: 226031,
        snipped: false,
        format: {
          protocol: 'hls',
          mime_type: 'audio/mpeg'
        },
        quality: 'sq'
      }
      const fromURLSpy = jest.fn()
      try {
        await fromMediaObjBase(
          mediaObj,
          null,
          null,
          null,
          null,
          fromURLSpy,
          null
        )
        expect(fromURLSpy).toHaveBeenCalled()
        done()
      } catch (err) {
        done(err)
      }
    })

    it('should throw an error if an invalid media object is provided', async (done) => {
      const mediaObj = {
        sdjf: 'sfsdfsdf',
        sjdfsdf: 'kjdhksdfg'
      }
      const fromURLSpy = jest.fn()
      try {
        await fromMediaObjBase(
          mediaObj,
          null,
          null,
          null,
          null,
          fromURLSpy,
          null
        )
        expect(fromURLSpy).toHaveBeenCalledTimes(0)
        done()
      } catch (err) {
        expect(!err).toBe(false)
        done()
      }
    })
  })
})
