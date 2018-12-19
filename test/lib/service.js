const {Service} = require('tinybird/service')

let service = new Service({
    storage_file: ':memory:'
})

module.exports = service
