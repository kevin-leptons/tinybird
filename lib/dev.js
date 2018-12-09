
const build = require('./build')
const serve = require('./serve')

async function dev(src, dest, conf={}) {
    await build(src, dest, {
        dist: conf.dist
    })
    await serve(dest, {
        port: conf.port,
        page_size: conf.page_size
    })
}

module.exports = dev
