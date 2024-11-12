const express = require('express')
const { detailProduct } = require('../../controller/client/detail.controller')
const routerDetailProduct = express.Router()
routerDetailProduct.get("/detail-product/:slug", detailProduct)

module.exports = routerDetailProduct