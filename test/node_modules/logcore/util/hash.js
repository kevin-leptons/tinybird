const {SHA3} = require('sha3')

function short(input) {
    let hash = new SHA3(512)
    hash.update(input)

    let hex = hash.digest('hex')
    return hex.substring(0, 8)
}

module.exports = {
    short: short
}
