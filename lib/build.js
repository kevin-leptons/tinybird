const path = require('path')
const fs = require('fs')

const shell = require('shelljs')

const {Service, Store, DocBuilder} = require('./service')

shell.set('-e')

async function build(src, dest, conf={}) {
    create_dest_dir(dest)
    let service = create_service(dest)
    await init_database(service)
    await compile(service, src, dest, conf)
}

function create_dest_dir(dest) {
    if (fs.existsSync(dest)) {
        shell.rm('-rf', dest)
    }
    shell.mkdir('-p', dest)
}

async function init_database(service) {
    let store = service.get(Store)
    await store.renew()
}

async function compile(service, src, dest, conf) {
    let doc_builder = service.get(DocBuilder)

    await doc_builder.build({
        src: src,
        dest: dest,
        extends: [
             path.join(__dirname, 'doc')
        ],
        dist: conf.dist
    })
}

function create_service(dest) {
    return new Service({
        root: dest,
        storage_file: path.join(dest, 'index.sqlite')
    })
}

module.exports = build
