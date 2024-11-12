const express = require('express')
const authMiddlewares = require('../../middlewares/admin/auth.middlewares')
const { basicArea } = require('../../controller/admin/charts.router')
const routerCharts = express.Router()
routerCharts.get('/basicChart',authMiddlewares,basicArea)
module.exports = routerCharts