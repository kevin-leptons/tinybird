const {hash} = require('../util')

const PAGE_SIZE = 8
const INSERT_QUERY = `
    INSERT INTO document (id, path, name, tags)
    VALUES (?, ?, ?, ?)
`
const FIND_QUERY = `
    SELECT * FROM document
    WHERE id = ?
`
const FIND_PATH_QUERY = `
    SELECT * FROM document
    WHERE path = ?
`
const LIST_QUERY = `
    SELECT * FROM document
    WHERE
        name LIKE ? OR
        tags LIKE ?
    LIMIT ?
    OFFSET ?
`

class DocumentTable {
    constructor(store) {
        this._db = store.get()
    }

    /*
    Arguments.
        * item - Object.
            * name - String.
            * path - String. Optional.
            * tags - Array<String>.
    */
    async create(item) {
        let id = hash.short(item.name)
        let doc_path = item.path ? item.path : id
        let params = [id, doc_path, item.name, item.tags.join(',')]

        return new Promise((resolve, reject) => {
            this._db.run(INSERT_QUERY, params, (e) => {
                if (e) {
                    reject(e)
                } else {
                    resolve(id)
                }
            })
        })
    }

    async find(id) {
        return new Promise((resolve, reject) => {
            this._db.get(FIND_QUERY, [id], (e, item) => {
                if (e) {
                    reject(e)
                    return
                }

                if (!item) {
                    resolve(null)
                    return
                }

                item.tags = item.tags.split(',')
                resolve(item)
            })
        })
    }

    async find_path(doc_path) {
        return new Promise((resolve, reject) => {
            this._db.get(FIND_PATH_QUERY, [doc_path], (e, item) => {
                if (e) {
                    reject(e)
                    return
                }

                if (!item) {
                    resolve(null)
                    return
                }

                item.tags = item.tags.split(',')
                resolve(item)
            })
        })
    }

    async list(conf) {
        let new_conf = Object.assign({}, conf)
        new_conf.page = new_conf.page ? new_conf.page : 1

        let offset = (new_conf.page - 1) * PAGE_SIZE
        let pattern = !new_conf.keyword ? `%%` : `%${new_conf.keyword}%`
        let params = [pattern, pattern, PAGE_SIZE, offset]

        return new Promise((resolve, reject) => {
            this._db.all(LIST_QUERY, params, (e, items) => {
                if (e) {
                    reject(e)
                } else {
                    for (let item of items) {
                        item.tags = item.tags.split(',')
                    }
                    resolve(items)
                }
            })
        })
    }
}

module.exports = DocumentTable
