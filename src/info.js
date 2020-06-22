import axios from 'axios'
import { handleRequestErrs } from './util'

const getInfo = async (url, clientID) => {
  try {
    const res = await axios.get(`https://api-v2.soundcloud.com/resolve?url=${url}&client_id=${clientID}`, {
      withCredentials: true
    })
    return res.data
  } catch (err) {
    throw handleRequestErrs(err)
  }
}

export default getInfo
