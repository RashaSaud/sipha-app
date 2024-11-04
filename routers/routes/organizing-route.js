const express = require('express')

const orgRoute = express.Router()

const {add_organizing,get_organizing} = require('../controller/organizing-controller')
orgRoute.post('/add-org',add_organizing)
orgRoute.get('/get-org',get_organizing)
module.exports = orgRoute