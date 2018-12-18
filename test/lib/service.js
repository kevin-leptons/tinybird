const {Service} = require('tinydoc/service')

let service = new Service({
    storage_file: ':memory:'
})

module.exports = service
