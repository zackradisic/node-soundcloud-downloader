const scdl = require('../').default

scdl.getLikes({
  profileURL: 'https://soundcloud.com/sfsdjfhkhs'
}, 10, 0).then(({ collection }) => collection.forEach(like => console.log(like.track)))
