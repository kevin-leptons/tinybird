const {Router} = require('express')

const {doc_source} = require('../service')

let router = new Router()

router.
get('/', (req, res) => {
    let doc = doc_source.find_name('help')

    if (doc) {
        res.render('doc_item', {
            item: doc
        })
    } else {
        res.render('http_404')
    }
})

module.exports = router
