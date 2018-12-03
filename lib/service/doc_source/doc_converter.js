const fs = require('fs')
const path = require('path')

const shell = require('shelljs')
const marked = require('marked')
const highlight = require('highlightjs')
const sha1 = require('sha1')

class DocConverter {
    /*
    Arguments.
        * conf - Object.
            * dest - String.
    */
    constructor(conf) {
        this._conf = conf
        this._opt = {
            highlight: this._highlight_convert
        }
    }

    /*
    Arguments.
        * src - String.
    Return Object.
        * id - Striing. SHA1 - Document identity.
        * path - String. Path to file contains document.
    */
    convert(src) {
        let src_doc = fs.readFileSync(src, 'utf-8')
        let dest_doc = marked(src_doc, this._opt)
        let dir_name = path.basename(path.dirname(src))
        let id = sha1(dir_name.toLowerCase())
        let dest_path = path.join(this._conf.dest, id)
        this._write_doc(dest_path, dest_doc)

        return {
            id: id,
            dest: dest_path
        }
    }

    // private members

    _highlight_convert(code) {
        return highlight.highlightAuto(code).value
    }

    _write_doc(file, content) {
        shell.mkdir('-p', path.dirname(file))
        fs.writeFileSync(file, content)
    }
}

module.exports = DocConverter
