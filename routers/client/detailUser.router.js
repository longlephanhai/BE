const express = require('express')
const { user } = require('../../controller/client/detailUser.controller')

const routerDetailUser = express.Router()

routerDetailUser.get("/detail-user", user)

module.exports = routerDetailUser