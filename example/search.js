const scdl = require('../').default

scdl
  .search({
    query: 'redbone childish gambino',
    resourceType: 'tracks'
  })
  .then((results) =>
    results.collection.forEach((track) => console.log(track.title))
  )
  .catch((err) => console.log(err))
