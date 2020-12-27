/** @internal @packageDocumentation */
const regexp = /^https?:\/\/(soundcloud\.com)\/(.*)$/

const isURL = (url: string) => {
  if (!url.match(regexp)) return false
  return url.match(regexp) && (url.match(regexp) as RegExpMatchArray)[2]
}

export const isPlaylistURL = (url: string) => {
  if (!isURL(url)) return false

  try {
    const u = new URL(url)
    return u.pathname.includes('/sets/')
  } catch (err) {
    return false
  }
}

export const isPersonalizedTrackURL = (url: string) => {
  if (!isURL(url)) return false
  return url.includes('https://soundcloud.com/discover/sets/personalized-tracks::')
}

export default isURL
