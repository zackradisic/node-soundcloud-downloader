const scdl = require('../').default

scdl.getLikes({
  profileUrl: 'https://soundcloud.com/uiceheidd'
}).then(({ collection }) => collection.forEach(like => console.log(like.track))).catch(err => console.log(err))
