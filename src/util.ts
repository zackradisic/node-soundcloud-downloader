/** @internal @packageDocumentation */
import { URL } from 'url'
import { AxiosError } from 'axios'

/* eslint-disable camelcase */
export interface PaginatedQuery<T> {
  collection: T[],
  total_results?: number, // is omitted if limit parameter is supplied
  next_href: string,
  query_urn: string
}

export const resolveURL = 'https://api-v2.soundcloud.com/resolve'
export const handleRequestErrs = (err: AxiosError) => {
  if (!err.response) return err
  if (!err.response.status) return err

  if (err.response.status === 401) err.message += ', is your Client ID correct?'
  if (err.response.status === 404) err.message += ', could not find the song... it may be private - check the URL'
  return err
}

export const appendURL = (url: string, ...params: string[]) => {
  const u = new URL(url)
  params.forEach((val, idx) => {
    if (idx % 2 === 0) u.searchParams.append(val, params[idx + 1])
  })
  return u.href
}

export const extractIDFromPersonalizedTrackURL = (url: string): string => {
  if (!url.includes('https://soundcloud.com/discover/sets/personalized-tracks::')) return ''

  const split = url.split(':')
  if (split.length < 5) return ''
  return split[4]
}

export const kindMismatchError = (expected: string, received: string): Error => new Error(`Expected resouce of kind: (${expected}), received: (${received})`)
