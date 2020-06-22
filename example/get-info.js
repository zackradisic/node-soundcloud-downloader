const scdl = require('../')
const constants = require('./constants')

scdl.getInfo(constants.url, constants.clientID)
  .then(info => console.log(info))
  .catch(err => console.log(err.message))
