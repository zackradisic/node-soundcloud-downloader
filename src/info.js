import axios from 'axios'


const getInfo = async (url, clientID) => {
  const res = await axios.get(`https://api-v2.soundcloud.com/resolve?url=${url}&client_id=${clientID}`, {
    withCredentials: true
  })

  return res.data
}

export default getInfo
