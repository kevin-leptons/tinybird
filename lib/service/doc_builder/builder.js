const redis = require('redis')

class Builder {
    constructor(root) {
        this._root = root
        this._doc_dirs = []
        this._docs = []
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
        await this._open_db()
        await this._build_metadata()
        await this._build_doc_dirs()
        await his._build_docs()
        await this._close_db()
    }

    // private methods

    async _open_db() {

    }

    async _build_metadata() {

    }

    async _build_doc_dirs() {

    }

    async _build_docs() {

    }
}

module.exports = Builder
