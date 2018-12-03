const {Router} = require('express')

let router = new Router()

router.
get('/', (req, res) => {
    res.redirect('/doc/list')
})

module.exports = router
