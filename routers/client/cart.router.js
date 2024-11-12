const express = require('express')
const { addCart, getCart, deleteCart, updateQuantity } = require('../../controller/client/cart.controller')
const { middlewareClient } = require('../../middlewares/client/auth.middelewares')
const category = require('../../middlewares/client/category.middlewares')

const routerCart = express.Router()
routerCart.use(category)
routerCart.use(middlewareClient)
routerCart.post("/add", middlewareClient, addCart)
routerCart.get("/get",middlewareClient, getCart)
routerCart.post("/delete",middlewareClient, deleteCart)
routerCart.post("/update",middlewareClient, updateQuantity)
module.exports = routerCart