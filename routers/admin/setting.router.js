const express = require('express')
const authMiddlewares = require('../../middlewares/admin/auth.middlewares')
const multer = require('multer')
const { updateSetting, general } = require('../../controller/admin/setting.controller')
const uploadFiles = require('../../middlewares/admin/uploadFiles')
const upload = multer()
const routerSetting = express.Router()
routerSetting.get("/setting", authMiddlewares, general)
routerSetting.post("/setting",
    authMiddlewares,
    upload.array('image'),
    uploadFiles,
    updateSetting
)

module.exports = routerSetting