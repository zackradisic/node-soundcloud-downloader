const Discord = require('discord.js')
const scdl = require('../index')
const constants = require('./constants')

const client = new Discord.Client()
const token = 'YOUR DISCORD CLIENT TOKEN HERE'
const channelID = '123456789'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  const channel = client.channels.cache.get(channelID)
  channel.join().then(connection => {
    scdl(constants.url, constants.clientIDclientID).then(stream => {
      connection.play(stream)
    })
  })
})

client.login(token)
