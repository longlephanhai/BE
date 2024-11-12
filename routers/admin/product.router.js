const express = require('express')
const { getProduct, detailProduct, deleteProduct, editProduct, createProduct, changeMultiStatus } = require('../../controller/admin/product.cotroller')
const multer = require('multer')
const uploadClound = require('../../middlewares/admin/uploadCloud')
const authMiddlewares = require('../../middlewares/admin/auth.middlewares')
const upload = multer()
const routerProduct = express.Router()
routerProduct.get('/product', authMiddlewares, getProduct)
routerProduct.get('/product/:id', authMiddlewares, detailProduct)
routerProduct.post('/product/delete', authMiddlewares, deleteProduct)
routerProduct.post('/product/edit/:id',
    authMiddlewares,
    upload.single('thumbnail'),
    uploadClound,
    editProduct)
routerProduct.post('/product/create',
    authMiddlewares,
    upload.single('thumbnail'),
    uploadClound,
    createProduct
)
routerProduct.post('/product/change-multi-status', authMiddlewares, changeMultiStatus)
module.exports = routerProduct