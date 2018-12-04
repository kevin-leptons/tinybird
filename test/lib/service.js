const {Service} = require('logcore/service')

let service = new Service({
    storage_file: ':memory:'
})

module.exports = service
