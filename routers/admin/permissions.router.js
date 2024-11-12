const express = require('express')
const { permissions, editPermissions } = require('../../controller/admin/permissions')
const authMiddlewares = require('../../middlewares/admin/auth.middlewares')
const routerPermissions = express.Router()
routerPermissions.get("/permissions", authMiddlewares, permissions)
routerPermissions.post("/permissions/edit", authMiddlewares, editPermissions)
module.exports = routerPermissions