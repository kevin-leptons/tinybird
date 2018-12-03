const path = require('path')
const fs = require('fs')

const shell = require('shelljs')
const sha1 = require('sha1')

const DocRawSource = require('./doc_raw_source')
const DocConverter = require('./doc_converter')
const DocSource = require('./doc_source')
const {DuplicatedDocError} = require('../error')

/*
Arguments.
    * src - String.
    * dest - String.
Return DocSource
*/
function build_doc(src, dest) {
    clear_dest(dest)
    copy_icon(src, dest)
    return build_from_markdown(src, dest)
}

function clear_dest(dest) {
    shell.rm('-r', dest)
}

function copy_icon(root_src, root_dest) {
    let src = path.join(root_src, 'icon.png')
    let dest = path.join(root_dest, 'asset/favicon.png')

    shell.mkdir('-p', path.dirname(dest))
    shell.cp(src, dest)
}

function build_from_markdown(root_src, root_dest) {
    let raw_source = new DocRawSource({
        src: root_src
    })
    let converter = new DocConverter({
        dest:  path.join(root_dest, 'doc')
    })
    let id_map = new Map()
    let name_map = new Map()

    for (;;) {
        let doc = raw_source.next()
        if (!doc) {
            break
        }

        let other_doc = name_map.get(doc.name)
        if (other_doc) {
            throw new DuplicatedDocError(doc.name, doc.src, other_doc.src)
        }

        let src_file = path.join(doc.src, 'index.md')
        let content = converter.convert(src_file)
        doc.id = content.id
        doc.dest = content.dest

        copy_asset(doc.src, root_dest)

        name_map.set(doc.name, doc)
        id_map.set(doc.id, doc)
    }

    return id_map
}

function copy_asset(doc_src, root_dest) {
    let src = path.join(doc_src, 'asset')
    if (!fs.existsSync(src)) {
        return
    }

    let doc_name = path.basename(doc_src)
    let dest = path.join(root_dest, 'asset', doc_name)

    shell.mkdir('-p', path.dirname(dest))
    shell.cp('-r', src, dest)
}

module.exports = build_doc
