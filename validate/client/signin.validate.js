const validateRegister = (req, res, next) => {
  if (!req.body.fullName) {
    return res.json({
      message: "Họ và tên không được để trống!",
      success: false,
      error: true
    })
  }
  if (!req.body.email) {
    return res.json({
      message: "Email không được để trống!",
      success: false,
      error: true
    })
  }
  if (!req.body.password) {
    return res.json({
      message: "Password không được để trống!",
      success: false,
      error: true
    })
  }
  next()
}
const validateLogin = (req, res, next) => {
  if (!req.body.email) {
    return res.json({
      message: "Email không được để trống!",
      success: false,
      error: true
    })
  }
  if (!req.body.password) {
    return res.json({
      message: "Password không được để trống!",
      success: false,
      error: true
    })
  }
  next()
}
const validateForgotPassword = (req, res, next) => {
  if (!req.body.email) {
    return res.json({
      message: "Email không được để trống!",
      success: false,
      error: true
    })
  }
  next()
}
const validateResetPassword = (req, res, next) => {
  if (!req.body.password) {
    return res.json({
      message: "Password không được để trống!",
      success: false,
      error: true
    })
  }
  if (!req.body.passwordConfirm) {
    return res.json({
      message: "Password Confirm không được để trống!",
      success: false,
      error: true
    })
  }
  if (req.body.password !== req.body.passwordConfirm) {
    return res.json({
      message: "Password Confirm không khớp!",
      success: false,
      error: true
    })
  }
  next()
}
module.exports = { validateRegister, validateLogin, validateForgotPassword, validateResetPassword }