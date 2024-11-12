const express = require('express')
const { createRole, getRoles, getRoleById, editRole, deleteRole } = require('../../controller/admin/roles.controller')
const routerRoles = express.Router()
routerRoles.post("/roles/create", createRole)
routerRoles.get("/roles", getRoles)
routerRoles.get("/roles/:id", getRoleById)
routerRoles.post("/roles/edit/:id", editRole)
routerRoles.post("/roles/delete", deleteRole)
module.exports = routerRoles