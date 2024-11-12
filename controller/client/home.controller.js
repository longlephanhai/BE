const getSubCategoryHelper = require("../../helpers/products-category");
const { sendEmailResponse } = require("../../helpers/sendMail");
const Email = require("../../models/email.model");
const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const SettingGeneral = require("../../models/settings-general.model");

// hiển thị sản phẩm ra trang chủ
const home = async (req, res) => {
  try {
    const productSlider = await Product.find({
      status: "active",
      featured: "1",
      deleted: false,
    }).limit(10)
    productSlider.map((item) => {
      item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    })
    const productNew = await Product.find({
      deleted: false,
      status: "active"
    }).limit(50).sort({ position: "desc" })
    productNew.map((item) => {
      item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    })
    res.json({
      productSlider: productSlider,
      productNew: productNew,
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
const categorySlug = async (req, res) => {
  try {
    const slug = req.params.slugCategory
    const category = await ProductCategory.findOne({
      slug: slug,
      deleted: false,
      status: "active"
    })
    const listSubCategory = await getSubCategoryHelper(category._id)
    const listSub = listSubCategory.map(item => item.id)

    const products = await Product.find({
      product_category_id: {
        $in: [category.id, ...listSub]
      },
      deleted: false
    }).sort({ position: "desc" })
    products.map((item) => {
      item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    })
    res.json({
      products: products,
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
const email = async (req, res) => {
  try {
    const newEmail = new Email(req.body)
    await newEmail.save()
    sendEmailResponse(newEmail.title, newEmail.description, newEmail.email)
    res.json({
      message: "Gửi email thành công",
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
const setting = async (req, res) => {
  try {
    const setting = await SettingGeneral.findOne()
    res.json({
      setting: setting,
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
module.exports = { home, categorySlug, email, setting }