import { axiosManager } from './axios'
import { User } from './info'
import { appendURL, resolveURL } from './util'

export const getUser = async (url: string, clientID: string): Promise<User> => {
  const u = appendURL(resolveURL, 'url', url, 'client_id', clientID)
  const { data } = await axiosManager.instance.get(u)

  if (!(data as User).avatar_url) throw new Error('JSON response is not a user. Is profile URL correct? : ' + url)

  return data as User
}
