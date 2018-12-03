const path = require('path')
const fs = require('fs')

const {Database} = require('sqlite3').verbose()

class Store {

    /*
    Arguments.
        * storage_file - String.
    */
    constructor(conf) {
        this._conf = conf
        this._connect_db()
    }

    async close() {
        return new Promise((resolve, reject) => {
            if (!this._db) {
                resolve()
                return
            }

            this._db.close((e) => {
                if (e) {
                    reject(e)
                } else {
                    resolve()
                }
            })
        })
    }

    async renew() {
        let schema_file = path.join(__dirname, 'store_schema.sql')
        let query = fs.readFileSync(schema_file, 'utf-8')

        return new Promise((resolve, reject) => {
            this._db.exec(query, (e) => {
                if (e) {
                    reject(e)
                } else {
                    resolve()
                }
            })
        })
    }

    get(key) {
        return this._db
    }

    // private members

    _connect_db() {
        this._db = new Database(this._conf.storage_file)
    }
}

module.exports = Store
