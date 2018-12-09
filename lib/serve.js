const App = require('./app')

async function serve(dest, conf={}) {
    let app = new App({
        root: dest,
        port: conf.port,
        page_size: conf.page_size
    })
    await app.serve()
}

module.exports = serve
