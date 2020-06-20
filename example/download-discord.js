const Discord = require('discord.js')
const scdl = require('../index')

const client = new Discord.Client()
const token = 'YOUR DISCORD CLIENT TOKEN HERE'

const url = 'https://soundcloud.com/monsune_inc/outta-my-mind'
const clientID = 'asdlkajasd'
const channelID = '123456789'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  const channel = client.channels.cache.get(channelID)
  channel.join().then(connection => {
    scdl(url, clientID).then(stream => {
      connection.play(stream)
    })
  })
})

client.login(token)
