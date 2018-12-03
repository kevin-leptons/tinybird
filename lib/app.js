const path = require('path')
const fs = require('fs')

const express = require('express')

const {doc_source} = require('./service')
const router = require('./router')
const middleware = require('./middleware')

class App {
    /*
    Arguments.
        * conf - Object.
            * port - Number. Default is 5678.
            * src - String. Path to directory contains documents.
            * dest - String. Path to temporary build files. Default is 'tmp'
              of current directory.
    */
    constructor(conf) {
        this._read_conf(conf)
        this._load_doc()
        this._create_express()
        this._load_config()
        this._load_view_engine()
        this._load_router()
        this._serve()
    }

    // private members

    _read_conf(conf) {
        this._conf = Object.assign({}, conf)

        if (!this._conf.dest) {
            this._conf.dest = path.join(process.cwd(), 'tmp')
        }
        this._conf.asset_dir = path.join(this._conf.dest, 'asset')
    }

    _load_doc() {
        doc_source.load({
            src: this._conf.src,
            dest: this._conf.dest
        })
    }

    _create_express() {
        this._app = express()
    }

    _load_config() {
        let conf = this._read_doc_conf()

        this._app.locals = {
            title: conf.name,
            icon: '/asset/icon.png'
        }
    }

    _read_doc_conf() {
        let conf_file = path.join(this._conf.src, 'index.json')
        let raw_conf = fs.readFileSync(conf_file)

        return JSON.parse(raw_conf)
    }

    _load_view_engine() {
        this._app.set('views', path.join(__dirname, 'view'))
        this._app.set('view engine', 'pug')
    }

    _load_router() {
        this._app.use('/core/asset', router.core_asset)
        this._app.use('/asset', router.asset(this._conf.asset_dir))
        this._app.use('/', router.root)
        this._app.use('/doc', router.doc)
        this._app.use('/help', router.help)
        this._app.use('/preface', router.preface)

        this._app.use('*', middleware.http_404)
    }

    _serve() {
        let server = this._app.listen(this._conf.port, () => {
            let addr = server.address()
            console.log(`Serving at "http://localhost:${addr.port}"`)
        })
    }
}

module.exports = App
