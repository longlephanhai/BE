const ProductCategory = require("../../models/product-category.model");
const createTree = require('../../helpers/createTree')
const category = async (req, res, next) => {
  let find = {
    deleted: false,
  }
  const records = await ProductCategory.find(find);
  const newProductsCategory = createTree(records)
  res.locals.layoutProductsCategory = newProductsCategory
  next()
}
module.exports = category;