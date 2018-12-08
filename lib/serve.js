const App = require('./app')

async function serve(dest, conf={}) {
    let app = new App({
        root: dest,
        port: conf.port,

    })
    await app.serve()
}

module.exports = serve
