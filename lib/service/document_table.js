const sha1 = require('sha1')

const PAGE_SIZE = 8
const INSERT_QUERY = `
    INSERT INTO document (id, path, name, tags)
    VALUES (?, ?, ?, ?)
`
const FIND_QUERY = `
    SELECT * FROM document
    WHERE id = ?
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

    async create(item) {
        let id = sha1(item.path)
        let params = [id, item.path, item.name, item.tags.join(',')]

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
                } else {
                    item.tags = item.tags.split(',')
                    resolve(item)
                }
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
