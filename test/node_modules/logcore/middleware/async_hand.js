function async_hand(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).
        catch(next)
    }
}

module.exports = async_hand
