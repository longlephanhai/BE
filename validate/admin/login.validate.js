const validateLogin = (req, res, next) => {
  if (!req.body.email) {
    return res.json({
      message: "Vui lòng nhập email!",
      success: false,
      error: true
    })
  }
  if (!req.body.password) {
    return res.json({
      message: "Vui lòng nhập mật khẩu!",
      success: false,
      error: true
    })

  }
  next()
}

module.exports = { validateLogin }