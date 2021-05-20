
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./soundcloud-downloader.cjs.production.min.js')
} else {
  module.exports = require('./soundcloud-downloader.cjs.development.js')
}
