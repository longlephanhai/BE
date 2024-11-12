const express = require('express')
const { home, categorySlug, email,setting } = require('../../controller/client/home.controller')
const routerHome = express.Router()
routerHome.get("/home", home)
routerHome.get("/home/:slugCategory", categorySlug)
routerHome.post("/home/send-email", email)
routerHome.get("/settingClient",setting)
module.exports = routerHome