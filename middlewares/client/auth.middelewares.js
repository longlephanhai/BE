const User = require("../../models/user.model")

const middlewareClient = async (req, res, next) => {

  if (!req.cookies.tokenUser) {
    return res.json({
      message: "Bạn chưa đăng nhập",
      success: false,
      error: true
    })
  }
  const user = await User.findOne({
    tokenUser: req.cookies.tokenUser
  })

  if (!user) {
    return res.json({
      message: "Tài khoản không tồn tại",
      success: false,
      error: true
    })
  }
  next()
}
module.exports = { middlewareClient };