const User = require("../../models/user.model")

const user = async (req, res) => {
  try {
    const user = await User.findOne({
      token: req.cookies.tokenUser,
      deleted: false
    }).select("-password -tokenUser")
    if (!user) {
      return res.json({
        message: "User not found",
        success: false,
        error: true
      })
    }
    category = res.locals.layoutProductsCategory;
    res.json({
      user: user,
      category: category,
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
module.exports = { user }