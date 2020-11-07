const scdl = require('../')
const constants = require('./constants')

scdl.getSetInfo('adfkjhalskdjfhlas', constants.clientID)
  .then(info => console.log(info))
  .catch(err => console.log(err))
