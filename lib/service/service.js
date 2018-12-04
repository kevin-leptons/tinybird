const path = require('path')

const Store = require('./store')
const DocumentTable = require('./document_table')
const ConfTable = require('./conf_table')

class Service {
    constructor(conf) {
        this._conf = conf
        this._map = new Map()
        this._init_store()
        this._init_document_table()
        this._init_conf_table()
    }

    async close() {
        for (let pair of this._map) {
            let service = pair[1]
            if (service.close) {
                await service.close()
            }
        }
    }

    get(type) {
        return this._map.get(type)
    }

    // private members

    _init_store() {
        let store = new Store({
            storage_file: this._conf.storage_file
        })
        this._map.set(Store, store)
    }

    _init_document_table() {
        let store = this._map.get(Store)
        let doc_table = new DocumentTable(store)
        this._map.set(DocumentTable, doc_table)
    }

    _init_conf_table() {
        let store = this._map.get(Store)
        let conf_table = new ConfTable(store)
        this._map.set(ConfTable, conf_table)
    }
}

module.exports = Service
