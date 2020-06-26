import axios from 'axios'
import m3u8stream from 'm3u8stream'
import { handleRequestErrs } from './util'

export const getMediaURL = async (url, clientID, axiosInstance) => {
  const res = await axiosInstance.get(`${url}?client_id=${clientID}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br'
    },
    withCredentials: true
  })
  if (!res.data.url) throw new Error(`Invalid response from Soundcloud. Check if the URL provided is correct: ${url}`)
  return res.data.url
}

export const getProgressiveStream = async (mediaUrl, axiosInstance) => {
  const r = await axiosInstance.get(mediaUrl, {
    withCredentials: true,
    responseType: 'stream'
  })

  return r.data
}

export const getHLSStream = mediaUrl => m3u8stream(mediaUrl)

export const fromURLBase = async (url, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, axiosInstance) => {
  try {
    const mediaUrl = await getMediaURLFunction(url, clientID, axiosInstance)

    if (url.includes('/progressive')) {
      return await getProgressiveStreamFunction(mediaUrl, axiosInstance)
    }

    return getHLSStreamFunction(mediaUrl)
  } catch (err) {
    throw handleRequestErrs(err)
  }
}

export const fromURL = async (url, clientID) => await fromURLBase(url, clientID, getMediaURL, getProgressiveStream, getHLSStream, axios)

export const fromMediaObjBase = async (media, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, fromURLFunction, axiosInstance) => {
  if (!validatemedia(media)) throw new Error('Invalid media object provided')
  return await fromURLFunction(media.url, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, axiosInstance)
}

export const fromMediaObj = async (media, clientID) => await fromMediaObjBase(media, clientID, getMediaURL, getProgressiveStream, getHLSStream, fromURL, axios)

const validatemedia = media => {
  if (!media.url || !media.format) return false
  return true
}
