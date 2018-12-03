const fs = require('fs')
const path = require('path')

const {std_short_datetime} = require('../../util')

class DocRawSource {
    /*
    Arguments.
        * conf - Object.
            * src - String. Path to directory contains document.
    */
    constructor(conf) {
        this._conf = conf
    }

    /*
    Return.
        * String - Path to a document file.
        * null - End of stream.
    */
    next() {
        this._read_dir()

        let item = this._doc_dir_it.next()
        return item.value
    }

    reset() {
        if (this._doc_dir_it) {
            this._doc_dir_it = this._doc_dirs.values()
        }
    }

    // private members

    _read_dir() {
        if (this._doc_dirs) {
            return
        }

        this._doc_dirs = new Set()
        let files = fs.readdirSync(this._conf.src)
        for (let file of files) {
            let file_path = path.join(this._conf.src, file)
            let stat = fs.statSync(file_path)

            if (!stat.isDirectory()) {
                continue
            }

            let spec = this._read_doc_spec(file_path)
            let meta = this._read_metadata(file_path)
            spec.src = path.join(file_path)
            spec.birthtime = meta.birthtime
            spec.mtime = meta.mtime
            this._doc_dirs.add(spec)
        }
        this._doc_dir_it = this._doc_dirs.values()
    }

    _read_doc_spec(doc_dir) {
        let index_file = path.join(doc_dir, 'index.json')
        let index_raw = fs.readFileSync(index_file)
        return JSON.parse(index_raw)
    }

    _read_metadata(doc_dir) {
        let doc_path = path.join(doc_dir, 'index.md')
        let stat = fs.statSync(doc_path)

        return {
            birthtime: std_short_datetime(stat.birthtime),
            mtime: std_short_datetime(stat.mtime)
        }
    }
}

module.exports = DocRawSource
