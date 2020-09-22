/** @internal @packageDocumentation */
import { URL } from 'url'
import { AxiosError } from 'axios'

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
