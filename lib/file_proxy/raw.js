const fs = require('fs')
const path = require('path')

const shell = require('shelljs')

function link_file(src, dest) {
    shell.mkdir('-p', path.dirname(dest))
    fs.symlinkSync(src, dest)
}

module.exports = {
    link: link_file
}
