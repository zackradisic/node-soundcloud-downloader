import Discord from 'discord.js'
import scdl from '../index'

const client = new Discord.Client()
const token = 'YOUR DISCORD CLIENT TOKEN HERE'

const SOUNDCLOUD_URL = 'https://soundcloud.com/monsune_inc/outta-my-mindf'
const CLIENT_ID = 'YOUR CLIENT ID HERE'

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  const channel = client.channels.cache.get('694156987927363608')
  const conn = await channel.join()
  const audioStream = scdl.download(SOUNDCLOUD_URL, CLIENT_ID)
  conn.play(audioStream)
})

client.login(token)
