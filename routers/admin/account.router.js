const express = require('express')
const multer = require('multer')
const uploadClound = require('../../middlewares/admin/uploadCloud')
const upload = multer()
const { getAccounts, createAccount, deleteAccount, getAccountById, editAccount } = require('../../controller/admin/accounts.controller')
const { dashboard } = require('../../controller/admin/dashboard.controller')
const routerAccounts = express.Router()
routerAccounts.get('/accounts', getAccounts)
routerAccounts.post('/accounts/create',
  upload.single('avatar'),
  uploadClound,
  createAccount
)
routerAccounts.post('/accounts/delete', deleteAccount)
routerAccounts.get('/accounts/detail/:id', getAccountById)
routerAccounts.post("/accounts/edit/:id",
  upload.single('avatar'),
  uploadClound,
  editAccount
)
routerAccounts.get('/dashboard',dashboard)
module.exports = routerAccounts