const scdl = require('../').default

scdl.search('tracks', 'redbone childish gambino')
  .then(results => results.collection.forEach(track => console.log(track.title)))
  .catch(err => console.log(err))
