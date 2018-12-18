function http_404(req, res) {
    res.
    status(404).
    render('http_404')
}

module.exports = http_404
