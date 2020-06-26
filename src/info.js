import axios from 'axios'
import { handleRequestErrs } from './util'

export const getInfoBase = async (url, clientID, axiosRef) => {
  try {
    const res = await axiosRef.get(`https://api-v2.soundcloud.com/resolve?url=${url}&client_id=${clientID}`, {
      withCredentials: true
    })
    return res.data
  } catch (err) {
    console.log(err)
    throw handleRequestErrs(err)
  }
}
const getInfo = async (url, clientID) => {
  return await getInfoBase(url, clientID, axios)
}

export default getInfo
