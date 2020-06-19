const axios = require('axios')

const scdl = (url, clientID) => {
    return new Promise((resolve, reject) => {

        axios.get(url, {
            withCredentials: true
        })
        .then(res => {
            let searchStr = 'soundcloud://sounds:'
            let start = res.data.indexOf(searchStr)
            let end = 0
            for(let x = 1; x < 200; x++) {
                if (res.data[start + x] === '"') {
                    end = x
                    break
                }
            }

            const id = res.data.slice(start + searchStr.length, start + end)

            searchStr = 'https://api-v2.soundcloud.com/media/soundcloud:tracks:'
            start = res.data.indexOf(searchStr)
            for(let x = 1; x < 500; x++) {
                if (res.data[start + x] === '"') {
                    end = x
                    break
                }
            }

            const hlsLink = res.data.slice(start, start + end)
            let progressiveLink = hlsLink.replace('/hls', '/progressive') 
            progressiveLink += `?client_id=${clientID}`
            axios.get(progressiveLink, {
                headers: {
                    'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br'
                },
                withCredentials: true
            }).then(res => {
                
                axios.get(res.data.url, {
                    withCredentials: true,
                    responseType: 'stream'
                }).then(res => {
                    return resolve(res.data)
                }).catch(err => reject(err))

            }).catch(err => reject(err))
        })
        .catch(err => reject(err))

    })
}

module.exports = scdl