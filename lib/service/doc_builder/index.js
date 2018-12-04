const redis = require('redis')

class DocBuilder {
    constructor(conf_table, doc_table) {
        this._conf_table = conf_table
        this._doc_table = doc_table
        this._doc_dirs = []
        this._docs = []
    }

    set_root(root) {
        this._root = root
    }

    add_many(src) {
        this._doc_dirs.push(src)
        return this
    }

    add(src) {
        this._docs.push(src)
        return this
    }

    async write(dest) {
        await this._build_metadata()
        await this._build_doc_dirs()
        await this._build_docs()
    }

    // private methods

    async _build_metadata() {

    }

    async _build_doc_dirs() {

    }

    async _build_docs() {

    }
}

module.exports = DocBuilder
