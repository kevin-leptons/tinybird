const fs = require('fs')

const CleanCSS = require('clean-css')

let cleaner = new CleanCSS({
    level: 2,
    format: {
        wrapAt: 127
    }
})

/*
Arguments.
    * dest / String. Path to destination file.
    * content / String. Content to write.
    * conf / Object / {}.
    * conf.optimize / Boolean / false. Minify content.
*/
function write_css(dest, content, conf={}) {
    let to_write = conf.optimize ? minify(content) : content
    fs.writeFileSync(dest, to_write)
}

/*
Arguments.
    * src / String. Path to source file.
    * dest / String. Path to destination file.
    * conf / Object / {}.
    * conf.optimize / Boolean / false. Minify content.
*/
function copy_css(src, dest, conf={}) {
    let content = fs.readFileSync(src, 'utf-8')
    write_css(dest, content, conf)
}

function minify(content) {
    let out = cleaner.minify(content)
    return out.styles
}

module.exports = {
    write: write_css,
    copy: copy_css
}
