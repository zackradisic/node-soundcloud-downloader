import filterFormats from '../src/filter-media'
import STREAMING_PROTOCOLS from '../src/protocols'
import FORMATS from '../src/formats'
import { Transcoding } from '../dist/info'

const testInfo = [
  {
    url:
      'https://api-v2.soundcloud.com/media/soundcloud:tracks:673346252/5bbe88bd-64e9-4512-a98a-c1cba75a5cef/stream/hls',
    preset: 'mp3_0_0',
    duration: 226031,
    snipped: false,
    format: { protocol: 'hls', mime_type: 'audio/mpeg' },
    quality: 'sq'
  },
  {
    url:
      'https://api-v2.soundcloud.com/media/soundcloud:tracks:673346252/5bbe88bd-64e9-4512-a98a-c1cba75a5cef/stream/progressive',
    preset: 'mp3_0_0',
    duration: 226031,
    snipped: false,
    format: { protocol: 'progressive', mime_type: 'audio/mpeg' },
    quality: 'sq'
  },
  {
    url:
      'https://api-v2.soundcloud.com/media/soundcloud:tracks:673346252/1f2b5d95-95e2-4bd2-a7ec-dab872d7e725/stream/hls',
    preset: 'opus_0_0',
    duration: 225955,
    snipped: false,
    format: { protocol: 'hls', mime_type: 'audio/ogg; codecs="opus"' },
    quality: 'sq'
  }
]

describe('filterFormats', () => {
  it('should match a format with the given streaming protocol', () => {
    let formats = filterFormats(testInfo as Transcoding[], {
      protocol: STREAMING_PROTOCOLS.PROGRESSIVE
    })
    expect(formats.length).toBe(1)
    expect(formats[0]).toMatchObject(testInfo[1])

    formats = filterFormats(testInfo as Transcoding[], { protocol: STREAMING_PROTOCOLS.HLS })
    expect(formats.length).toBe(2)
    expect(formats[0]).toMatchObject(testInfo[0])
    expect(formats[1]).toMatchObject(testInfo[2])
  })

  it('should match a format with the given format', () => {
    let formats = filterFormats(testInfo as Transcoding[], { format: FORMATS.MP3 })
    expect(formats.length).toBe(2)
    expect(formats[0]).toMatchObject(testInfo[0])
    expect(formats[1]).toMatchObject(testInfo[1])

    formats = filterFormats(testInfo as Transcoding[], { format: FORMATS.OPUS })
    expect(formats.length).toBe(1)
    expect(formats[0]).toMatchObject(testInfo[2])
  })
})
