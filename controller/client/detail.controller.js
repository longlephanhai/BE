const Product = require("../../models/product.model");

const detailProduct = async (req, res) => {
  try {
    let find = {
      deleted: false,
      slug: req.params.slug,
      status: "active"
    }
    const product = await Product.findOne(find).populate("product_category_id", "title")
    product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
    res.json({
      product: product,
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
module.exports = { detailProduct }  