const path = require('path')
const {Service} = require('logcore/service')

let service = new Service({
    storage_file: path.join(__dirname, '../../tmp/db.sqlite')
})

module.exports = service
