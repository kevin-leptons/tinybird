const path = require('path')

const express = require('express')

const ASSET_DIR = path.join(__dirname, '../asset')

module.exports = express.static(ASSET_DIR)
