class Conf {
    constructor(conf) {
        this._conf = conf
    }

    get(key) {
        return this._conf[key]
    }
}

module.exports = Conf
