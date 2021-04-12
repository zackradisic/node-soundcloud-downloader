const scdl = require('../').default

scdl
  .getSetInfo('adfkjhalskdjfhlas')
  .then((info) => console.log(info))
  .catch((err) => console.log(err))
