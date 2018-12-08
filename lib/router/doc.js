const {Router} = require('express')

const {async_hand} = require('../middleware')

let router = new Router()

router.
get('/', async_hand(async (req, res) => {
    let items = await req._sv.doc_source.list({
        keyword: req.query.keyword,
        page: req.query.page ? parseInt(query.page) : 1
    })

    if (items.length > 0) {
        res.render('doc', {
            items: items
        })
    } else if (param.keyword) {
        res.render('doc_not_found')
    } else {
        res.render('doc_empty')
    }
}))

router.
get('/:id', async_hand(async (req, res) => {
    let doc = await req._sv.doc_source.find(req.params.id)
    if (!doc) {
        res.render('http_404')
        return
    }
    res.render('doc_item', {
        item: doc
    })
}))

router.
get('/path/:path', async_hand(async (req, res) => {
    let doc = await req._sv.doc_source.find_path(req.params.path)
    if (!doc) {
        res.render('http_404')
        return
    }
    res.render('doc_item', {
        item: doc
    })
}))


module.exports = router
