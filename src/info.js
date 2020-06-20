import axios from 'axios'

const getInfo = async url => {
  const res = await axios.get(url, {
    withCredentials: true
  })

  const mediaRaw = '{' + res.data.slice(res.data.indexOf('"media":{'), res.data.indexOf(',"title"')) + '}'
  const media = JSON.parse(mediaRaw).media.transcodings

  return media
}

export default getInfo
