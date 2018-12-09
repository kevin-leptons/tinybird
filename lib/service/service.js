const path = require('path')

const Store = require('./store')
const DocumentTable = require('./document_table')
const ConfTable = require('./conf_table')
const DocBuilder = require('./doc_builder')
const DocSource = require('./doc_source')
const Conf = require('./conf')

class Service {
    /*
    Arguments.
        * conf / Object / {}.
        * conf.root / String. Directory contain built documents.
        * conf.storage_file / String. Path to SQLite database file.
        * conf.page_size / Integer / 16.
    */
    constructor(conf={}) {
        this._map = new Map()
        this._init_conf(conf)
        this._init_store()
        this._init_document_table()
        this._init_conf_table()
        this._init_doc_builder()
        this._init_doc_source()
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
        return this._get(type)
    }

    // private members

    _get(type) {
        return this._map.get(type)
    }

    _set(type, value) {
        this._map.set(type, value)
    }

    _init_conf(conf) {
        let conf_sv = new Conf({
            root: conf.root,
            storage_file: conf.storage_file,
            page_size: conf.page_size
        })
        this._set(Conf, conf_sv)
    }

    _init_store() {
        let conf = this._get(Conf)
        let store = new Store({
            storage_file: conf.get('storage_file')
        })
        this._set(Store, store)
    }

    _init_document_table() {
        let doc_table = new DocumentTable(
            this._get(Conf),
            this._get(Store)
        )
        this._set(DocumentTable, doc_table)
    }

    _init_conf_table() {
        let conf_table = new ConfTable(
            this._get(Store)
        )
        this._set(ConfTable, conf_table)
    }

    _init_doc_builder() {
        let doc_builder = new DocBuilder(
            this._get(ConfTable),
            this._get(DocumentTable)
        )
        this._set(DocBuilder, doc_builder)
    }

    _init_doc_source() {
        let doc_source = new DocSource(
            this._get(Conf),
            this._get(DocumentTable)
        )
        this._set(DocSource, doc_source)
    }
}

module.exports = Service
