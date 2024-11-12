const express = require('express')
const { middlewareClient } = require('../../middlewares/client/auth.middelewares')
const { placeOrder, verifyOrder } = require('../../controller/client/checkout.controller')
const routerCheckout = express.Router()
routerCheckout.post("/checkout", middlewareClient, placeOrder)
routerCheckout.post("/verify", verifyOrder)
module.exports = routerCheckout