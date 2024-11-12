const express = require('express')
const multer = require('multer')
const uploadClound = require('../../middlewares/admin/uploadCloud')
const upload = multer()
const { signup, signin, checkUserToken, logout, forgotPassword, otpPassword, resetPassword } = require('../../controller/client/signup.controller')
const { validateRegister, validateLogin } = require('../../validate/client/signin.validate')
const category = require('../../middlewares/client/category.middlewares')


const routersignup = express.Router()

routersignup.post("/signup",
  upload.single('avatar'),
  uploadClound,
  validateRegister,
  signup
)
routersignup.get("/checkToken", category, checkUserToken)
routersignup.post("/signin",
  validateLogin,
  signin
)
routersignup.get("/logout", logout)
routersignup.post("/forgot-password",forgotPassword)
routersignup.post("/opt-password",otpPassword)
routersignup.post("/reset-password",resetPassword)
module.exports = routersignup