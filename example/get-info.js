const scdl = require('../')
const constants = require('./constants')

scdl.getSetInfo('https://soundcloud.com/user-845046062/sets/playlist', constants.clientID)
  .then(info => console.log(info))
  .catch(err => console.log(err.message))
