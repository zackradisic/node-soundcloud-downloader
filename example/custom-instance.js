const clientID = require('./constants')
const scdlCreate = require('../').create
const axios = require('axios').default

const scdl = scdlCreate({
  clientID: 'adasdasd',
  saveClientID: true,
  filePath: './client_id.json',
  axiosInstance: axios.create()
})
