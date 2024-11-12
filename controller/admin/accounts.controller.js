const md5 = require("md5")
const Account = require("../../models/account.model")

const getAccounts = async (req, res) => {
  try {
    let find = {
      deleted: false
    }
    const accounts = await Account.find(find).select("-password -token").populate("role_id", "title")
    res.json({
      accounts: accounts,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
const createAccount = async (req, res) => {
  try {
    const isExit = await Account.findOne({
      email: req.body.email,
      deleted: false
    })
    if (isExit) {
      res.json({
        message: "Email đã tồn tại",
        success: false,
        error: true
      })
      return
    }
    else {
      req.body.password = md5(req.body.password)
      const account = new Account(req.body);
      await account.save()
      res.json({
        message: "Tạo tài khoản thành công",
        success: true,
        error: false
      })
    }
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.body
    await Account.updateOne({ _id: id }, { deleted: true })
    res.json({
      message: "Xóa tài khoản thành công",
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
const getAccountById = async (req, res) => {
  try {
    const { id } = req.params
    const account = await Account.findOne({
      _id: id,
      deleted: false
    }).select("-token").populate("role_id", "title")
    res.json({
      account: account,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
const editAccount = async (req, res) => {
  try {
    const id = req.params.id
    const emailExst = await Account.findOne({
      _id: { $ne: id },
      email: req.body.email,
      deleted: false
    })
    if (emailExst) {
      res.json({
        message: "Email đã tồn tại",
        success: false,
        error: true
      })
      return
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password)
      } else {
        delete req.body.password
      }
      await Account.updateOne({ _id: id }, req.body)
      res.json({
        message: "Cập nhật tài khoản thành công",
        success: true,
        error: false
      })
    }
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
module.exports = { getAccounts, createAccount, deleteAccount, getAccountById, editAccount }