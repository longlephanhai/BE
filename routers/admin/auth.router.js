const express = require('express')
const { loginPost, checkToken, logout } = require('../../controller/admin/login.cotroller')
const { validateLogin } = require('../../validate/admin/login.validate')
const router = express.Router()
router.get('/auth/login', checkToken)
router.post('/auth/login', validateLogin, loginPost)
router.get("/auth/logout", logout)
module.exports = router