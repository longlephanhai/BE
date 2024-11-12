const express = require('express')
const { getOrder, getOrderById } = require('../../controller/client/order.controller')
const { middlewareClient } = require('../../middlewares/client/auth.middelewares')

const routerOrder = express.Router()
routerOrder.get("/order", middlewareClient, getOrder)
routerOrder.get("/order/:id", middlewareClient, getOrderById)
module.exports = routerOrder