/** @internal @packageDocumentation */

import { Readable } from 'stream'

import { AxiosInstance } from 'axios'
import m3u8stream from 'm3u8stream'

import getInfo, { Transcoding } from './info'
import { DownloadOptions } from './types'
import { appendURL, handleRequestErrs } from './util'

export const getMediaURL = async (
  url: string,
  clientID: string,
  axiosInstance: AxiosInstance
): Promise<string> => {
  const res = await axiosInstance.get(appendURL(url, 'client_id', clientID), {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br'
    },
    withCredentials: true
  })
  if (!res.data.url) {
    throw new Error(
      `Invalid response from Soundcloud. Check if the URL provided is correct: ${url}`
    )
  }
  return res.data.url
}

export const getProgressive = async (
  mediaUrl: string,
  axiosInstance: AxiosInstance
) => {
  const r = await axiosInstance.get(mediaUrl, {
    withCredentials: true,
    responseType: 'stream'
  })

  return r.data
}

export const getHLSStream = (mediaUrl: string) => m3u8stream(mediaUrl)

export const fromURL = async (
  url: string,
  clientID: string,
  axiosInstance: AxiosInstance
): Promise<any | m3u8stream.Stream> => {
  try {
    const mediaUrl = await getMediaURL(url, clientID, axiosInstance)

    if (url.includes('/progressive')) {
      return await getProgressive(mediaUrl, axiosInstance)
    }

    return getHLSStream(mediaUrl)
  } catch (err) {
    throw handleRequestErrs(err)
  }
}

export const fromMediaObj = async (
  media: Transcoding,
  clientID: string,
  axiosInstance: AxiosInstance
) => {
  if (!validatemedia(media)) throw new Error('Invalid media object provided')
  return await fromURL(media.url, clientID, axiosInstance)
}

export const fromDownloadLink = async (
  id: number,
  clientID: string,
  axiosInstance: AxiosInstance
): Promise<Readable> => {
  const {
    data: { redirectUri }
  } = await axiosInstance.get(
    appendURL(
      `https://api-v2.soundcloud.com/tracks/${id}/download`,
      'client_id',
      clientID
    )
  )
  const { data } = await axiosInstance.get(redirectUri, {
    responseType: 'stream'
  })

  return data
}

/** @internal */
export const download = async (
  url: string,
  options: DownloadOptions,
  clientID: string,
  axiosInstance: AxiosInstance
): Promise<Readable> => {
  const info = await getInfo(url, clientID, axiosInstance)
  if (info.downloadable && options.useDirectLink) {
    // Try the direct link. If it fails use standard procedure
    try {
      return await fromDownloadLink(info.id, clientID, axiosInstance)
    } catch (err) {}
  }
  if (!info.media) throw new Error('No media found for given URL')
  return await fromMediaObj(info.media.transcodings[0], clientID, axiosInstance)
}

const validatemedia = (media: Transcoding) => {
  if (!media.url || !media.format) return false
  return true
}
