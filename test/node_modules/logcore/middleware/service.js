const {DocSource} = require('../service')

function service(pool) {
    let sv = {
        doc_source: pool.get(DocSource)
    }

    return function(req, res, next) {
        req._sv = sv
        next()
    }
}

module.exports = service
