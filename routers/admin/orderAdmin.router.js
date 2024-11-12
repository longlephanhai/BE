const express = require('express')
const authMiddlewares = require('../../middlewares/admin/auth.middlewares')
const { getOrders, changeStatusOrder } = require('../../controller/admin/orderAdmin.controller')

const routerOrderAdmin = express.Router()
routerOrderAdmin.get('/orders', authMiddlewares, getOrders)
routerOrderAdmin.post('/change-status-order', authMiddlewares, changeStatusOrder)
module.exports = routerOrderAdmin