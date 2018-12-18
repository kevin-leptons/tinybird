const fs = require('fs')
const path = require('path')
const assert = require('assert')
const url = require('url')

const shell = require('shelljs')
const yaml = require('js-yaml')
const marked = require('marked');
const highlight = require('highlightjs')

const {doc_renderer, make_toc} = require('../util')
const file_proxy = require('../file_proxy')

class DocBuilder {
    constructor(conf_table, doc_table) {
        this._conf_table = conf_table
        this._doc_table = doc_table
    }

    /*
    Arguments.
        * conf / Object / {}.
        * conf.src / String. Path to root directory which contains documents
          and metadata such as index.yaml, logo.png.
        * conf.dest / String. Path to directory to write build files.
        * conf.extends / Array<String> / []. Path to sub directory contains
          documents.
        * conf.dist / Boolean / false. Optimize build files.
    */
    async build(conf) {
        this._import_conf(conf)
        await this._build_metadata()
        await this._copy_core_asset()
        this._copy_shared_asset()
        await this._build_src_docs()
        await this._build_extend_docs()
    }

    // private methods

    _import_conf(raw_conf) {
        let conf = Object.assign({}, raw_conf)

        assert(conf.src, 'Missing attribute "src"')
        assert(conf.dest, 'Missing attribute "dest"')

        if (!conf.extends) {
            conf.extends = []
        } else if (conf.extends.constructor !== Array) {
            throw new Error('Must be array "extends"')
        }
        conf.dest_asset = path.join(conf.dest, 'asset')

        this._conf = conf
    }

    async _build_metadata() {
        let conf = this._read_conf()
        await this._save_conf(conf)
    }

    _read_conf() {
        let index_file = path.join(this._conf.src, 'index.yaml')
        let conf_str = fs.readFileSync(index_file, 'utf-8')
        let conf = yaml.safeLoad(conf_str)

        assert(conf.name, `Missing attribute "name", file "${index_file}"`)

        return conf
    }

    async _save_conf(conf) {
        for (let key in conf) {
            if (!conf.hasOwnProperty(key)) {
                continue
            }
            await this._conf_table.set(key, conf[key])
        }
    }

    async _copy_core_asset() {
        if (this._conf.dist) {
            await this._compile_core_asset()
        } else {
            this._link_core_asset()
        }
    }

    async _compile_core_asset() {
        let src = path.join(__dirname, '../asset')
        let dest = path.join(this._conf.dest, 'asset', 'core')

        shell.mkdir('-p', dest)
        shell.cp('-r', src + '/*', dest)

        let src_main_css = path.join(src, 'main.css')
        let dest_main_css = path.join(dest, 'main.css')
        file_proxy.css.copy(src_main_css, dest_main_css, {
            optimize: true
        })

        let src_main_js = path.join(src, 'main.js')
        let dest_main_js = path.join(dest, 'main.js')
        await file_proxy.js.copy(src_main_js, dest_main_js, {
            optimize: true
        })
    }

    _link_core_asset() {
        let src = path.join(__dirname, '../asset')
        let dest = path.join(this._conf.dest, 'asset', 'core')
        file_proxy.raw.link(src, dest)
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
        if (!fs.existsSync(src)) {
            return
        }
        
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

        process.stdout.write(`+ ${src} "${spec.name}"...`)

        let doc = await this._save_doc(spec)
        this._copy_doc_asset(src, doc.id)
        this._create_doc_dir()
        this._compile_doc(src, doc.id)

        process.stdout.write(' done\n')
    }

    _read_doc_spec(src) {
        let spec_file = path.join(src, 'index.yaml')
        if (!fs.existsSync(spec_file)) {
            throw new Error(`Missing file "${spec_file}"`)
        }
        let spec_str = fs.readFileSync(spec_file, 'utf-8')
        let spec = yaml.safeLoad(spec_str)
        spec.modified = this._get_modified_date(src)

        assert(spec.name, `Missing attribute "name", file "${spec_file}"`)
        assert(spec.tags, `Missing attribute "tags[]", file "${spec_file}"`)

        return spec
    }

    _get_modified_date(src) {
        let spec_file = path.join(src, 'index.yaml')
        let content_file = path.join(src, 'index.md')
        let spec_stat = fs.statSync(spec_file)
        let content_stat = fs.statSync(content_file)

        return spec_stat.mtime > content_stat.mtime
            ? spec_stat.mtime : content_stat.mtime
    }

    async _save_doc(spec) {
        let item = Object.assign({}, spec)
        item.id = await this._doc_table.create(item)
        return item
    }

    _copy_doc_asset(src, id) {
        let dest = path.join(this._conf.dest_asset, id)
        shell.cp('-r', src, dest)
        shell.rm('-f', path.join(dest, 'index.yaml'))
        shell.rm('-f', path.join(dest, 'index.md'))
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
        this._convert_doc(src_file, dest_file, id)
    }

    _convert_doc(src, dest, id) {
        let markdown = fs.readFileSync(src, 'utf-8')
        let toc = make_toc(markdown)

        markdown = toc + '\n\n' + markdown

        let html = marked(markdown, {
            gfm: true,
            renderer: doc_renderer(id),
            baseUrl: '/asset/' + id + '/'
        })

        file_proxy.html.write(dest, html, {
            optimize: this._conf.dist
        })
    }
}

module.exports = DocBuilder
