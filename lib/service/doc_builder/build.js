const Builder = require('./builder')

function build(root) {
    return new Builder(root)
}

module.exports = build
