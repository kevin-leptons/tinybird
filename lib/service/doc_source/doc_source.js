const fs = require('fs')

const sha1 = require('sha1')

const build_doc = require('./build_doc')

class DocSource {
    constructor() {
        this._map = new Map()
    }

    static get PAGE_SIZE() {
        return 16
    }

    /*
    Arguments.
        * conf - Object.
            * src - String. Path to directory which contains source documents.
            * dest - String. Path to temporary directory  which contains
              compiled documents.
    */
    load(conf) {
        this._map = build_doc(conf.src, conf.dest)
    }

    /*
    Arguments.
        * id - String. SHA1 identity.
    Return Object.
        * id - String. SHA1 identity.
        * path - String. Path to file which contents document.
        * name - String.
        * tags - Array<String>
    */
    find(id) {
        return this._map.get(id)
    }

    find_name(name) {
        let id = sha1(name.toLowerCase())
        return this.find(id)
    }

    /*
    Arguments.
        * conf - Object.
            * page - Number. Base on 0.
            * keyword - String.
    Return Array<Object>.
    */
    list(conf) {
        let it = this._map.values()
        this._skip(it, conf.page)
        let items = this._get(it, conf.keyword)
        items.sort((a, b) => {
            return a.birthtime < b.birthtime
        })
        return items
    }

    fetch(id) {
        let doc = Object.assign({}, this.find(id))
        if (!doc) {
            return null
        }
        doc.content = fs.readFileSync(doc.dest)
        return doc
    }

    // private members

    _skip(it, page) {
        let skip = page * DocSource.PAGE_SIZE
        for (let i = 0; i < skip; ++i) {
            let item = it.next()
            if (item.done) {
                return
            }
        }
    }

    _get(it, keyword='') {
        let docs = []
        for (let i = 0; i < DocSource.PAGE_SIZE; ++i) {
            let item = it.next()
            if (item.done) {
                break
            }
            if (!this._match_keyword(item.value, keyword)) {
                continue
            }
            docs.push(item.value)
        }
        return docs
    }

    _match_keyword(item, keyword) {
        let name = item.name.trim().toLowerCase()
        let key = keyword.trim().toLowerCase()

        if (key.length === 0) {
            return true
        }

        if (name.includes(key)) {
            return true
        }
        if (item.tags.indexOf(key) >= 0) {
            return true
        }
        return false
    }
}

module.exports = DocSource
