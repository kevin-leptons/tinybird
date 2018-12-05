const LIST_QUERY = `
    SELECT * FROM conf
`

class ConfTable {
    constructor(store) {
        this._db = store.get()
    }

    async set(key, value) {
        let query = `
            BEGIN  TRANSACTION;

            DELETE FROM conf
            WHERE key = '${key}';

            INSERT INTO conf (key, value)
            VALUES ('${key}', '${value}');

            COMMIT;
        `

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

    async list() {
        return new Promise((resolve, reject) => {
            this._db.all(LIST_QUERY, (e, items) => {
                if (e) {
                    reject(e)
                } else {
                    let conf = this._items_to_object(items)
                    resolve(conf)
                }
            })
        })
    }

    // private methods

    async _items_to_object(items) {
        let conf = new Map()
        for (let item of items) {
            conf.set(item.key, item.value)
        }
        return conf
    }
}

module.exports = ConfTable
