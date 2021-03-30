const scdl = require('../').default

scdl.getLikes({
  profileUrl: 'https://soundcloud.com/sfsdjfhkhs'
}).then(({ collection }) => collection.forEach(like => console.log(like.track)))
