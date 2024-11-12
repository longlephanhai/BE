const Cart = require("../../models/cart.model");
const ForgotPassword = require("../../models/forgot-password.model");
const User = require("../../models/user.model");
const md5 = require("md5")
const generate = require("../../helpers/generate");
const { sendMail } = require("../../helpers/sendMail");
const signup = async (req, res) => {
  try {
    const existEmail = await User.findOne({
      email: req.body.email,
      deleted: false
    })
    if (existEmail) {
      return res.json({
        message: "Email đã tồn tại",
        success: false,
        error: true
      })
    } else {
      req.body.password = md5(req.body.password)
      const user = new User(req.body)
      await user.save()
      const cart = new Cart();
      await cart.save();
      cart.user_id = user._id;
      await cart.save();
      res.json({
        message: "Đăng ký thành công",
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
const checkUserToken = async (req, res) => {
  const categories = res.locals.layoutProductsCategory;
  if (req.cookies.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
    })
    res.json({
      message: "Token is valid",
      user: user,
      category: categories,
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
const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
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
    if (user.password !== md5(password)) {
      return res.json({
        message: "Mật khẩu không đúng",
        success: false,
        error: true
      })
    }
    if (user.status === "inactive") {
      return res.json({
        message: "Tài khoản chưa được kích hoạt",
        success: false,
        error: true
      })
    }
    await Cart.updateOne({
      _id: req.cookies.cartId
    }, {
      user_id: user.id
    })
    const cart = await Cart.findOne({
      user_id: user.id
    })
    const tokenOption = {
      httpOnly: true,
      sameSite: 'Lax',
    };
    if (process.env.NODE_ENV === 'production') {
      tokenOption.sameSite = 'None';
      tokenOption.secure = true;
    }
    res.cookie('cartId', cart._id, {
      httpOnly: true
    });

    res.cookie("tokenUser", user.tokenUser, tokenOption).status(200).json({
      message: "Đăng nhập thành công",
      data: user,
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
    res.clearCookie("cartId")
    res.clearCookie("tokenUser").json({
      message: "Đăng xuất thành công",
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
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({
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

    // tạo mã otp
    const otp = generate.generateRandomNumber(8)
    const objectForgotPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now()
    }
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()
    // gửi mã otp qua email
    const subject = "Mã otp lấy lại mật khẩu"
    sendMail(email, subject, otp) // hàm gửi mail
    res.json({
      message: "Đã gửi mã otp đến email",
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
// kiểm tra mã otp 
const otpPassword = async (req, res) => {
  try {
    const email = req.body.email
    const otp = req.body.otp
    const result = await ForgotPassword.findOne({
      email: email,
      otp: otp
    })
    if (!result) {
      return res.json({
        message: "Mã otp không đúng",
        success: false,
        error: true
      })
    } else {
      const user = await User.findOne({
        email: email
      })

      res.status(200).json({
        message: "Xác thực thành công",
        data: user,
        success: true,
        error: false
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
// reset mật khẩu
const resetPassword = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    await User.updateOne({
      email: email
    }, {
      password: md5(password)
    })
    res.json({
      message: "Đổi mật khẩu thành công",
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
module.exports = { signup, signin, checkUserToken, logout, forgotPassword, otpPassword, resetPassword }