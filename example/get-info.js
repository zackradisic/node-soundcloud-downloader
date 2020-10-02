const scdl = require('../')
const constants = require('./constants')

scdl.getSetInfo('https://soundcloud.com/zack-radisic-103764335/sets/test', constants.clientID)
  .then(info => console.log(info))
  .catch(err => console.log(err))
