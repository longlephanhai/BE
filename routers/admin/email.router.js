const express = require('express')
const authMiddlewares = require('../../middlewares/admin/auth.middlewares')
const { getEmail, responseEmail } = require('../../controller/admin/email.controller')
const routerEmail = express.Router()
routerEmail.get("/email",authMiddlewares,getEmail)
routerEmail.post("/response-email",authMiddlewares,responseEmail)
module.exports = routerEmail