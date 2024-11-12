const express = require('express')
const { getUser, getRole } = require('../../controller/admin/user.controller')

const routerUser = express.Router()
routerUser.get('/user', getUser)
routerUser.post('/user', getRole)
module.exports = routerUser