const fs = require('fs')
const path = require('path')

const shell = require('shelljs')
const yaml = require('js-yaml')
const marked = require('marked');
const highlight = require('highlightjs')

const MARKED_OPTS = {
    highlight: (code) => {
        return highlight.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
}

class DocBuilder {
    constructor(conf_table, doc_table) {
        this._conf_table = conf_table
        this._doc_table = doc_table
    }

    /*
    Arguments.
        * conf - Object.
            * src - String. Path to root directory which contains documents
              and metadata such as index.yaml, logo.png.
            * extends - Array<String>. Path to sub directory contains
              documents.
            * dest - String. Path to directory to write build files.
    */
    async build(conf) {
        this._import_conf(conf)
        await this._build_metadata()
        this._copy_shared_asset()
        await this._build_src_docs()
        await this._build_extend_docs()
    }

    // private methods

    _import_conf(raw_conf) {
        let conf = Object.assign({}, raw_conf)

        if (!conf.src) {
            throw Error('Missing "src"')
        }
        if (!conf.dest) {
            throw new Error('Missing "dest"')
        }
        if (!conf.extends) {
            conf.extends = []
        } else if (conf.extends.constructor !== Array) {
            throw new Error('Must be array "extends"')
        }

        this._conf = conf
    }

    async _build_metadata() {
        let conf = this._read_conf()
        await this._save_conf(conf)
    }

    _read_conf() {
        let index_file = path.join(this._conf.src, 'index.yaml')
        let conf_str = fs.readFileSync(index_file, 'utf-8')
        return yaml.safeLoad(conf_str)
    }

    async _save_conf(conf) {
        for (let key in conf) {
            if (!conf.hasOwnProperty(key)) {
                continue
            }
            await this._conf_table.set(key, conf[key])
        }
    }

    _copy_shared_asset() {
        this._create_dest_asset()
        this._copy_logo()
    }

    _create_dest_asset() {
        let asset_dir = path.join(this._conf.dest, 'asset')
        shell.mkdir('-p', asset_dir)
    }

    _copy_logo() {
        let src = path.join(this._conf.src, 'logo.png')
        let dest = path.join(this._conf.dest, 'asset', 'favicon.png')
        shell.cp(src, dest)
    }

    async _build_src_docs() {
        await this._build_docs(this._conf.src)
    }

    async _build_extend_docs() {
        for (let extend of this._conf.extends) {
            await this._build_docs(extend)
        }
    }

    async _build_docs(root) {
        let entries = fs.readdirSync(root, {
            withFileTypes: true
        })
        for (let entry of entries) {
            if (entry.isDirectory()) {
                let src = path.join(root, entry.name)
                await this._build_doc(src)
            }
        }
    }

    async _build_doc(src) {
        let spec = this._read_doc_spec(src)

        let doc = await this._save_doc(spec)
        // this._copy_doc_asset(src, doc)
        this._create_doc_dir()
        this._compile_doc(src, doc.id)
    }

    _read_doc_spec(src) {
        let spec_file = path.join(src, 'index.yaml')
        if (!fs.existsSync(spec_file)) {
            throw new Error(`Missing file "${spec_file}"`)
        }
        let spec_str = fs.readFileSync(spec_file, 'utf-8')
        let spec = yaml.safeLoad(spec_str)

        if (!spec.path) {
            throw new Error(`Missing attribute "path", file "${spec_file}"`)
        }
        if (!spec.name) {
            throw new Error(`Missing attribute "name", file "${spec_file}"`)
        }
        if (!spec.tags) {
            throw new Error(`Missing attribute "tags[]", file "${spec_file}"`)
        }
        return spec
    }

    async _save_doc(spec) {
        let item = {
            name: spec.name,
            path: spec.path,
            tags: spec.tags
        }
        item.id = await this._doc_table.create(item)
        return item
    }

    _copy_doc_asset(src, spec) {
        let asset_src = path.join(src, 'asset')
        if (!fs.existsSync(asset_src)) {
            return
        }

        let asset_dest = path.join(this._conf.dest, 'asset')
    }

    _create_doc_dir() {
        let dest_doc = path.join(this._conf.dest, 'doc')
        shell.mkdir('-p', dest_doc)
    }

    _compile_doc(src, id) {
        let src_file = path.join(src, 'index.md')
        if (!fs.existsSync(src_file)) {
            throw new Error(`Missing file "${src_file}"`)
        }

        let dest_file = path.join(this._conf.dest, 'doc', id)
        this._convert_doc(src_file, dest_file)
    }

    _convert_doc(src, dest) {
        let markdown = fs.readFileSync(src, 'utf-8')
        let html = marked(markdown)
        fs.writeFileSync(dest, html)
    }
}

module.exports = DocBuilder
