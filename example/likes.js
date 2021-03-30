const scdl = require('../').default

// scdl.getLikes({
//   profileUrl: 'https://soundcloud.com/deathcraft-200216746'
// }).then(({ collection }) => collection.forEach(like => console.log(like.track.id === 13867919, like.track.permalink_url, like.track.downloadable))).catch(err => console.log(err))

scdl.download('https://soundcloud.com/dakota-perez-7/omfg-mashup-hello-i-love-you-yeah-ice-cream-and-wonderful').then(track => { console.log('hi\n\n\n'); console.log(track) })
