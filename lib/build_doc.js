const path = require('path')

const shell = require('shelljs')

const {Service, Store, DocBuilder} = require('./service')

shell.set('-e')

async function build_doc(src, dest) {
    create_dest_dir(dest)
    let service = create_service(dest)
    await init_database(service)
    await build(service, src, dest)
}

function create_dest_dir(dest) {
    shell.rm('-r', dest)
    shell.mkdir('-p', dest)
}

async function init_database(service) {
    let store = service.get(Store)
    await store.renew()
}

async function build(service, src, dest) {
    let doc_builder = service.get(DocBuilder)

    await doc_builder.build({
        src: src,
        dest: dest,
        extends: [
             path.join(__dirname, 'doc')
        ]
    })
}

function create_service(dest) {
    return new Service({
        root: dest,
        storage_file: path.join(dest, 'index.sqlite')
    })
}

module.exports = build_doc
