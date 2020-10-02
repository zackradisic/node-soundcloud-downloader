import { download } from './download'
import { getSetInfo } from './info'

export const downloadPlaylist = async (url: string, clientID: string): Promise<[ReadableStream<any>[], String[]]> => {
  const info = await getSetInfo(url, clientID)

  const trackNames = []
  const result = await Promise.all(info.tracks.map(track => {
    const p = download(track.permalink_url, clientID)
    trackNames.push(track.title)
    return p
  }))

  return [result, trackNames]
}
