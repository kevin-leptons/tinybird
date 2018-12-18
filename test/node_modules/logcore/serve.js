const App = require('./app')

async function serve(dest, conf={}) {
    let app = new App({
        root: dest,
        port: conf.port ? conf.port : 8080,
        page_size: conf.page_size ? conf.page_size : 16
    })
    await app.serve()
}

module.exports = serve
