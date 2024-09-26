const express = require('express')

const orgRoute = express.Router()

const {add_organizing} = require('../controller/organizing-controller')
orgRoute.post('/add-org',add_organizing)