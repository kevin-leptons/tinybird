const fs = require('fs')
const path = require('path')

class DocSource {
    constructor(conf, doc_table) {
        this._conf = conf
        this._doc_table = doc_table

        this._init_params()
    }

    /*
    Arguments.
        * id - String. SHA1 identity.
    Return Object.
        * id - String. SHA1 identity.
        * name - String.
        * path - String.
        * tags - Array<String>
        * content - String.
    */
    async find(id) {
        let doc = await this._doc_table.find(id)
        if (!doc) {
            return null
        }

        doc.content = this._read_doc_content(id)
        return doc
    }

    async find_path(doc_path) {
        let doc = await this._doc_table.find_path(doc_path)
        if (!doc) {
            return null
        }

        doc.content = this._read_doc_content(doc.id)
        return doc
    }

    async pagination(keyword, current) {
        return await this._doc_table.pagination(keyword, current)
    }

    /*
    Arguments.
        * conf - Object.
            * page - Number. Base on 0.
            * keyword - String.
    Return Array<Object>.
        * id - String.
        * name - String.
        * path - String.
        * tags - Array<String>.
    */
    async list(conf) {
        return this._doc_table.list(conf)
    }

    // private members

    _init_params() {
        this._doc_dir = path.join(this._conf.get('root'), 'doc')
    }

    _read_doc_content(id) {
        let content_file = path.join(this._doc_dir, id)
        return fs.readFileSync(content_file, 'utf-8')
    }
}

module.exports = DocSource
