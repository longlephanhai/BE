const Account = require("../../models/account.model");
var md5 = require('md5');
const checkToken = async (req, res) => {
  if (req.cookies.token) {
    res.json({
      message: "Token is valid",
      success: true,
      error: false
    })
  } else {
    res.json({
      message: "Token is notvalid",
      success: false,
      error: true
    })
  }
}
const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Account.findOne({
      email: email,
      deleted: false
    })
    if (!user) {
      return res.json({
        message: "Email không tồn tại",
        success: false,
        error: true
      })
    }
    if (md5(password) !== user.password) {
      return res.json({
        message: "Mật khẩu sai",
        success: false,
        error: true
      })
    }
    if (user.status !== "active") {
      return res.json({
        message: "Người dùng đã bị khóa",
        success: false,
        error: true
      })
    }
    const tokenOption = {
      httpOnly: true,
      sameSite: 'Lax', // Mặc định là 'Lax', có thể điều chỉnh cho phù hợp
      // secure:true
    };
    if (process.env.NODE_ENV === 'production') {
      tokenOption.sameSite = 'None';
      tokenOption.secure = true;
    }
    res.cookie("token", user.token, tokenOption).status(200).json({
      message: "Login successfully",
      data: user.token,
      success: true,
      error: false
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      message: "Logout successfully",
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
module.exports = { loginPost, checkToken, logout }