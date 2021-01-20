import axios, { AxiosInstance } from 'axios'

/** @internal @packageDocumentation */
const regexp = /^https?:\/\/(soundcloud\.com)\/(.*)$/

const mobileUrlRegex = /^https?:\/\/(m\.soundcloud\.com)\/(.*)$/

const firebaseUrlRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/

const firebaseRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,500}\.[a-zA-Z0-9()]{1,500}\b([-a-zA-Z0-9()@:%_+.~#?&//\\=]*)/g

const isURL = (url: string, testMobile?: boolean, testFirebase?: boolean) => {
  let success = false
  if (testMobile) {
    if (url.match(mobileUrlRegex)) success = !!(url.match(regexp) as RegExpMatchArray)[2]
  }

  if (!success && testFirebase) {
    if (url.match(firebaseRegexp)) success = !!(url.match(firebaseRegexp) as RegExpMatchArray)[2]
  }

  if (!success && url.match(regexp)) success = !!(url.match(regexp) as RegExpMatchArray)[2]

  return success
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

export const stripMobilePrefix = (url: string) => {
  if (!url.includes('m.soundcloud.com')) return url
  const _url = new URL(url)
  _url.hostname = 'soundcloud.com'
  return _url.toString()
}

export const isFirebaseURL = (url: string) => {
  return url.includes('https://soundcloud.app.goo.gl')
}

export const convertFirebaseURL = async (url: string, axiosInstance: AxiosInstance) => {
  const _url = new URL(url)
  _url.searchParams.set('d', '1')
  const { data }: { data: string } = await axiosInstance.get(_url.toString())

  const matches = data.match(firebaseRegexp)
  if (!matches) throw new Error(`Could not find URL for this SoundCloud Firebase URL: ${url}`)

  const firebaseURL = matches.find(match => regexp.test(match))
  if (!firebaseURL) return undefined

  // Some of the characters are in their unicode character code form (e.g. \u003d),
  // use regex to find occurences of \uXXXX, parse their hexidecimal unicode value and convert to regular char
  return firebaseURL.replace(/\\u([\d\w]{4})/gi, (_match, grp) => String.fromCharCode(parseInt(grp, 16)))
}

export default isURL
