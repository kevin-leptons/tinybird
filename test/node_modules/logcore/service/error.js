class DuplicatedDocError extends Error {
    constructor(name, src_1, src_2) {
        let message = `name="${name}" at "${src_1}" and "${src_2}"`
        super(message)
        this.name = this.constructor.name
    }
}

module.exports = {
    DuplicatedDocError: DuplicatedDocError
}
