# node-soundcloud-downloader
Download Soundcloud tracks with Node.js
```
npm install soundcloud-downloader
```

I couldn't find any packages that worked with a Discord bot I was working on so I created my own. 

### Usage
The easiest way to get Soundcloud audio is with the `scdl.download(url: string, clientID: string)` function, which returns a Promise containing a ReadableStream.
```javascript
const scdl = require('soundcloud-downloader')
const fs = require('fs')

const SOUNDCLOUD_URL = 'https://soundcloud.com/askdjfhaklshf'
const CLIENT_ID = 'asdhkalshdkhsf'

scdl.download(SOUNDCLOUD_URL, CLIENT_ID).then(stream => stream.pipe(fs.createWriteStream('audio.mp3')))
```

You can do anything you like with the stream that is returned, an example with [Discord.js](https://github.com/discordjs/discord.js/):
```javascript
const client = new Discord.Client()
const url = 'https://soundcloud.com/monsune_inc/outta-my-mind'
const clientID = 'asdlkajasd'
const channelID = '123456789'
client.on('ready', () => {
  const channel = client.channels.cache.get(channelID)
  channel.join().then(connection => {
    scdl.download(url, clientID).then(stream => {
      connection.play(stream)
    })
  })
})
```


### Client ID
You can obtain a Client ID by visting the Soundcloud website and inspecting network traffic (perhaps with Chrome DevTools or some HTTP proxy software) and looking for any requests to the Soundcloud API. Ex:
```
https://api-v2.soundcloud.com/me/play-history/tracks?client_id={CLIENT ID IS HERE}&limit=25&offset=0&linked_partitioning=1&app_version=1590494738&app_locale=en
```

### To-do
If I have the time and there is enough demand, I am interested in implementing the following functionalities:
- Audio format selection ✅
- Ability to use HTTP Live Streaming (HLS) ✅
- Some more integrations with Discord.js like selecting best format for voice channels

If you have any feature requests, suggestions or questions do not hesistate to post them in the issues section
