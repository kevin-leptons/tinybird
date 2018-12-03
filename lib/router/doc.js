const {Router} = require('express')

const {doc_source} = require('../service')

let router = new Router()

router.
get('/', (req, res) => {
    let query = req.query
    let param = {
        keyword: query.keyword,
        page: query.page ? parseInt(query.page) - 1 : 0
    }
    let items = doc_source.list(param)
    if (items.length > 0) {
        res.render('doc_list', {
            items: items
        })
    } else {
        res.render('doc_list_empty')
    }
})

router.
get('/:id', (req, res) => {
    let doc = doc_source.fetch(req.params.id)
    if (!doc) {
        res.render('http_404')
        return
    }
    res.render('doc_item', {
        item: doc
    })
})


module.exports = router
