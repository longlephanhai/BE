const express = require('express')
const { createProductCategory, getProductCategory, getProductCategoryById, editProductCategory, deleProductCategory } = require('../../controller/admin/productCategory.controller')
const multer = require('multer')
const uploadClound = require('../../middlewares/admin/uploadCloud')
const authMiddlewares = require('../../middlewares/admin/auth.middlewares')
const upload = multer()
const routerProductCategory = express.Router()
routerProductCategory.post("/product-category/create",
    authMiddlewares,
    upload.single('thumbnail'),
    uploadClound,
    createProductCategory
)
routerProductCategory.get("/product-category", authMiddlewares, getProductCategory)
routerProductCategory.get("/product-category/detail/:slug", authMiddlewares, getProductCategoryById)
routerProductCategory.post("/product-category/edit/:slug",
    authMiddlewares,
    upload.single('thumbnail'),
    uploadClound,
    editProductCategory
)
routerProductCategory.post("/product-category/delete", authMiddlewares, deleProductCategory)
module.exports = routerProductCategory