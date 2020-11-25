import { AxiosInstance } from 'axios'
import { User } from './info'
import { appendURL, resolveURL } from './util'

/** @internal */
export const getUser = async (url: string, clientID: string, axiosInstance: AxiosInstance): Promise<User> => {
  const u = appendURL(resolveURL, 'url', url, 'client_id', clientID)
  const { data } = await axiosInstance.get(u)

  if (!(data as User).avatar_url) throw new Error('JSON response is not a user. Is profile URL correct? : ' + url)

  return data as User
}
