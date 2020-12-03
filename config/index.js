
const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './<config filename>.json')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: '<id>',
})

module.exports = storage
