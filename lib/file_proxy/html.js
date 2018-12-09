const fs = require('fs')

const html_minify = require('html-minifier')

/*
Arguments.
    * dest / String. Path to destination file.
    * content / String. Content to write.
    * conf / Object / {}.
    * conf.optimize / Boolean / false. Minify content.
*/
function write_html(dest, content, conf={}) {
    let to_write = conf.optimize ? minify(content) : content
    fs.writeFileSync(dest, to_write)
}

function minify(content) {
    return html_minify.minify(content, {
        removeComments : true,
        collapseWhitespace: true,
        maxLineLength: 128
    })
}

module.exports = {
    write: write_html
}
