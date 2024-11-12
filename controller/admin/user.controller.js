const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")

const getUser = async (req, res) => {
  try {
    const user = await Account.findOne({
      token: req.cookies.token,
      deleted: false
    }).select("-password -token")
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
        error: true
      })
    }
    res.json({
      user: user,
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
const getRole = async (req, res) => {
  try {
    const id = req.body.id
    const role = await Role.findById(id).populate("permissions")
    res.json({
      role: role,
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
module.exports = { getUser, getRole }