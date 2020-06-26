import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { getInfoBase } from '../src/info'

const sampleData = {
  comment_count: 952,
  full_duration: 380873,
  downloadable: false,
  created_at: '2016-11-01T11:53:09Z',
  description: null,
  media: {
    transcodings: [
      {
        url: 'https://api-v2.soundcloud.com/media/soundcloud:tracks:290949554/81a476f0-412c-4df7-b004-1e73da41ac72/stream/hls',
        preset: 'mp3_0_0',
        duration: 380873,
        snipped: false,
        format: {
          protocol: 'hls',
          mime_type: 'audio/mpeg'
        },
        quality: 'sq'
      },
      {
        url: 'https://api-v2.soundcloud.com/media/soundcloud:tracks:290949554/48624ebe-5a88-40df-9d11-a76a68fe5975/stream/hls',
        preset: 'opus_0_0',
        duration: 380793,
        snipped: false,
        format: {
          protocol: 'hls',
          mime_type: 'audio/ogg; codecs="opus"'
        },
        quality: 'sq'
      }
    ]
  },
  title: 'Me And Your Mama',
  publisher_metadata: {
    p_line_for_display: '℗ 2016 Glassnote Entertainment Group LLC',
    artist: 'Childish Gambino',
    isrc: 'USYAH1600102',
    c_line: '2016 2016 Glassnote Entertainment Group LLC',
    upc_or_ean: '9341004044821',
    p_line: '2016 Glassnote Entertainment Group LLC',
    urn: 'soundcloud:tracks:290949554',
    explicit: true,
    c_line_for_display: '© 2016 2016 Glassnote Entertainment Group LLC',
    contains_music: true,
    id: 290949554,
    album_title: '"Awaken, My Love!"',
    release_title: 'Me And Your Mama'
  },
  duration: 380873,
  has_downloads_left: true,
  artwork_url: 'https://i1.sndcdn.com/artworks-ZRiO7X4LeBvD-0-large.jpg',
  public: true,
  streamable: true,
  tag_list: '',
  genre: 'R&B & Soul',
  id: 290949554,
  reposts_count: 15762,
  state: 'finished',
  label_name: 'Liberator Music',
  last_modified: '2020-06-22T06:11:51Z',
  commentable: true,
  policy: 'MONETIZE',
  visuals: null,
  kind: 'track',
  purchase_url: null,
  sharing: 'public',
  uri: 'https://api.soundcloud.com/tracks/290949554',
  secret_token: null,
  download_count: 0,
  likes_count: 117396,
  urn: 'soundcloud:tracks:290949554',
  license: 'all-rights-reserved',
  purchase_title: null,
  display_date: '2016-11-12T00:00:00Z',
  embeddable_by: 'all',
  release_date: '2016-11-12T00:00:00Z',
  user_id: 547647,
  monetization_model: 'AD_SUPPORTED',
  waveform_url: 'https://wave.sndcdn.com/QijgbBD7w1Vg_m.json',
  permalink: 'me-and-your-mama',
  permalink_url: 'https://soundcloud.com/childish-gambino/me-and-your-mama',
  user: {
    avatar_url: 'https://i1.sndcdn.com/avatars-EJ9GGrkQ9typ3a0d-v74n4Q-large.jpg',
    city: '',
    comments_count: 1,
    country_code: 'US',
    created_at: '2010-01-21T23:08:01Z',
    creator_subscriptions: [
      {
        product: {
          id: 'creator-pro-unlimited'
        }
      }
    ],
    creator_subscription: {
      product: {
        id: 'creator-pro-unlimited'
      }
    },
    description: '',
    followers_count: 1193231,
    followings_count: 28,
    first_name: 'Childish',
    full_name: 'Childish Gambino',
    groups_count: 0,
    id: 547647,
    kind: 'user',
    last_modified: '2020-03-22T07:12:40Z',
    last_name: 'Gambino',
    likes_count: 1,
    playlist_likes_count: 0,
    permalink: 'childish-gambino',
    permalink_url: 'https://soundcloud.com/childish-gambino',
    playlist_count: 15,
    reposts_count: null,
    track_count: 128,
    uri: 'https://api.soundcloud.com/users/547647',
    urn: 'soundcloud:users:547647',
    username: 'Childish Gambino',
    verified: false,
    visuals: {
      urn: 'soundcloud:users:547647',
      enabled: true,
      visuals: [
        {
          urn: 'soundcloud:visuals:91859694',
          entry_time: 0,
          visual_url: 'https://i1.sndcdn.com/visuals-000000547647-O9aRcV-original.jpg'
        }
      ],
      tracking: null
    }
  },
  playback_count: 6505074
}

describe('getInfo()', () => {
  it('returns track info when given a valid url', async done => {
    const mock = new MockAdapter(axios)
    const url = 'https://soundcloud.com/childish-gambino/me-and-your-mama'
    const instance = axios.create()
    mock.onGet().reply(200, sampleData)

    try {
      const info = await getInfoBase(url, process.env.CLIENT_ID, instance)
      expect(info).toEqual(sampleData)
      done()
    } catch (err) {
      done(err)
    }
  })
})
