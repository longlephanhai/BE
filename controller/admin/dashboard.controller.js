const Account = require("../../models/account.model")
const ProductCategory = require("../../models/product-category.model")
const Product = require("../../models/product.model")
const User = require("../../models/user.model")

const dashboard = async (req, res) => {
  try {
    const static = {
      categoryProduct: {
        total: 0,
        active: 0,
        inactive: 0
      },
      products: {
        total: 0,
        active: 0,
        inactive: 0
      },
      account: {
        total: 0,
        active: 0,
        inactive: 0
      },
      user: {
        total: 0,
        active: 0,
        inactive: 0
      },
    }
    static.categoryProduct.total = await ProductCategory.countDocuments({
      deleted: false
    })
    static.categoryProduct.active = await ProductCategory.countDocuments({
      status: "active",
      deleted: false
    })
    static.categoryProduct.inactive = await ProductCategory.countDocuments({
      deleted: false,
      status: "inactive",
    })
    static.products.total = await Product.countDocuments({
      deleted: false
    })
    static.products.active = await Product.countDocuments({
      status: "active",
      deleted: false
    })
    static.products.inactive = await Product.countDocuments({
      deleted: false,
      status: "inactive",
    })
    static.account.total = await Account.countDocuments({
      deleted: false
    })
    static.account.active = await Account.countDocuments({
      status: "active",
      deleted: false
    })
    static.account.inactive = await Account.countDocuments({
      deleted: false,
      status: "inactive",
    })
    static.user.total = await User.countDocuments({
      deleted: false
    })
    static.user.active = await User.countDocuments({
      status: "active",
      deleted: false
    })
    static.user.inactive = await User.countDocuments({
      deleted: false,
      status: "inactive",
    })
    res.json({
      static: static,
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
module.exports = { dashboard }