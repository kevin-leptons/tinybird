const assert = require('assert')

function require_attribute(object, names) {
    for (let name of names) {
        assert(object[name], `Missing attribute ${name}`)
    }
}

module.exports = require_attribute
