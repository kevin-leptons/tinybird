const toc = require('markdown-toc')

const hash = require('./hash')

function make_toc(markdown) {
    let compiled = toc(markdown, {
        slugify: (name) => {
            return hash.short(name)
        }
    })
    return compiled.content
}

module.exports = make_toc
