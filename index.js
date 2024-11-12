const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./routers/admin/auth.router')
const port = process.env.PORT

// config cookis=e
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// config cors
var cors = require('cors')
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))
// connect database
const database = require("./config/database")
database.connect();
app.use(express.json())

// parse application/x-www-form-urlencoded
var bodyParser = require('body-parser')
const routerUser = require('./routers/admin/user.router')
const routerProduct = require('./routers/admin/product.router')
const routerProductCategory = require('./routers/admin/productCategory.router')
const routerRoles = require('./routers/admin/roles.router')
const routerPermissions = require('./routers/admin/permissions.router')
const routerAccounts = require('./routers/admin/account.router')
const routerSetting = require('./routers/admin/setting.router')
const routersignup = require('./routers/client/signup.router')
const routerHome = require('./routers/client/home.router')
const routerDetailProduct = require('./routers/client/detail.router')
const routerDetailUser = require('./routers/client/detailUser.router')
const routerCart = require('./routers/client/cart.router')
const routerCheckout = require('./routers/client/checkout.router')
const routerOrder = require('./routers/client/order.router')
const routerEmail = require('./routers/admin/email.router')
const routerOrderAdmin = require('./routers/admin/orderAdmin.router')
const routerCharts = require('./routers/admin/charts.router')
app.use(bodyParser.urlencoded({ extended: false }))

// app router (đường dẫn backend)
app.use("/api", router)
app.use("/api", routerUser)
app.use("/api", routerProduct)
app.use("/api", routerProductCategory)
app.use("/api", routerRoles)
app.use("/api", routerPermissions)
app.use("/api", routerAccounts)
app.use("/api", routerEmail)
app.use("/api", routerSetting)
app.use("/api", routerOrderAdmin)
app.use("/api", routerCharts)
app.use("/api/user", routersignup)
app.use("/api/user", routerHome)
app.use("/api/user", routerDetailProduct)
app.use("/api/user", routerDetailUser)
app.use("/api/user", routerCart)
app.use("/api/user", routerCheckout)
app.use("/api/user", routerOrder)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})