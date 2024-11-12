const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")

const authMiddlewares = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      error: true
    })
  } else {
    const user = await Account.findOne({ token: req.cookies.token }).select("-password")
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
        error: true
      })
    } else {
      const role = await Role.findOne({
        _id: user.role_id
      }).select("title permissions")
      req.user = user
      req.role = role
      next();
    }
  }
}
module.exports = authMiddlewares