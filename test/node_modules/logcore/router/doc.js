const {Router} = require('express')

const {async_hand} = require('../middleware')
const {make_description} = require('../util')

let router = new Router()

router.
get('/', async_hand(async (req, res) => {
    let page = req.query.p ? parseInt(req.query.p) : 1
    let items = await req._sv.doc_source.list({
        keyword: req.query.k,
        page: page
    })

    if (items.length > 0) {
        res.render('doc', {
            items: items,
            description: 'list documents',
            page: await req._sv.doc_source.pagination(req.query.k, page)
        })
    } else if (req.query.k) {
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
        item: doc,
        description: make_description(doc)
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
