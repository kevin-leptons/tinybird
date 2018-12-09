const dateformat = require('dateformat')

const {hash} = require('../util')

const INSERT_QUERY = `
    INSERT INTO document (id, path, name, tags, modified)
    VALUES (?, ?, ?, ?, ?)
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
    ORDER BY modified DESC
    LIMIT ?
    OFFSET ?
`
const COUNT_QUERY = `
    SELECT COUNT(*) as count
    FROM document
    WHERE
        name LIKE ? OR
        tags LIKE ?
`

class DocumentTable {
    constructor(conf, store) {
        this._conf = conf
        this._db = store.get()
    }

    /*
    Arguments.
        * item / Object.
        * item.name / String.
        * item.path / String / short_sha(name).
        * item.tags / Array<String>.
        * item.modified / Date.
    */
    async create(item) {
        let id = hash.short(item.name)
        let doc_path = item.path ? item.path : id
        let params = [
            id,
            doc_path,
            item.name,
            item.tags.join(','),
            item.modified
        ]

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

                this._modify_raw_item(item)
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

                this._modify_raw_item(item)
                resolve(item)
            })
        })
    }

    async list(conf) {
        let new_conf = this._read_conf(conf)
        let page_size = this._conf.get('page_size')

        let offset = (new_conf.page - 1) * page_size
        let pattern = this._get_search_pattern(new_conf.keyword)
        let params = [pattern, pattern, page_size, offset]

        return new Promise((resolve, reject) => {
            this._db.all(LIST_QUERY, params, (e, items) => {
                if (e) {
                    reject(e)
                } else {
                    this._modify_raw_items(items)
                    resolve(items)
                }
            })
        })
    }

    async pagination(keyword, current) {
        let total = await this._get_num_page(keyword)

        return {
            keyword: keyword ? keyword : '',
            current: current,
            total: total,
            first: total > 0 ? 1 : 0,
            prev: current > 1 ? current - 1 : 0,
            next: current < total ? current + 1 : 0
        }
    }

    // private members

    _modify_raw_item(item) {
        item.tags = item.tags.split(',')

        let modified = new Date(item.modified)
        item.modified = dateformat(modified, 'yyyy-mm-dd hh:MM:ss o')
    }

    _modify_raw_items(items) {
        for (let item of items) {
            this._modify_raw_item(item)
        }
    }

    async _get_num_page(keyword) {
        let count = await this._count(keyword)
        return Math.ceil(count / this._conf.get('page_size'))
    }

    async _count(keyword) {
        let pattern = this._get_search_pattern(keyword)

        return new Promise((resolve, reject) => {
            this._db.get(COUNT_QUERY, [pattern, pattern], (e, item) => {
                if (e) {
                    reject(e)
                    return
                }

                resolve(item.count)
            })
        })
    }

    _get_search_pattern(keyword) {
         return !keyword ? `%%` : `%${keyword}%`
    }

    _read_conf(conf) {
        let new_conf = Object.assign({}, conf)

        new_conf.page = conf.page ? conf.page : 1
        return new_conf
    }
}

module.exports = DocumentTable
