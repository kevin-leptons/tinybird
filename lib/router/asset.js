const express = require('express')

function asset_router(asset_dir) {
    return express.static(asset_dir)
}

module.exports = asset_router
