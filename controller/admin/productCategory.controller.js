const ProductCategory = require("../../models/product-category.model")
const createTree = require("../../helpers/createTree")
const createProductCategory = async (req, res) => {
  try {
    if (req.body.position === "") {
      const count = await ProductCategory.countDocuments()
      req.body.position = count + 1
    } else {
      req.body.position = parseInt(req.body.position)
    }
    const data = new ProductCategory(req.body)
    await data.save()
    res.json({
      message: "Thêm danh mục sản phẩm thành công",
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
const getProductCategory = async (req, res) => {
  try {
    let find = {
      deleted: false
    };
    const records = await ProductCategory.find(find)
    const newRecords = createTree(records);
    res.json({
      records: newRecords,
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
const getProductCategoryById = async (req, res) => {
  try {
    const slug = req.params.slug
    const categoryProduct = await ProductCategory.findOne({
      slug: slug
    }).populate('parent_id', 'title')
    if (!categoryProduct) {
      throw new Error("Không tìm thấy danh mục sản phẩm")
    }

    res.json({
      records: categoryProduct,
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
const editProductCategory = async (req, res) => {
  try {
    const slug = req.params.slug
    const data = req.body
    await ProductCategory.updateOne({
      slug: slug
    }, data)
    res.json({
      message: "Cập nhật danh mục sản phẩm thành công",
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
const deleProductCategory = async (req, res) => {
  try {
    const id = req.body.id
    await ProductCategory.updateOne({
      _id: id
    }, {
      deleted: true
    })
    res.json({
      message: "Xóa danh mục sản phẩm thành công",
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
module.exports = { createProductCategory, getProductCategory, getProductCategoryById, editProductCategory, deleProductCategory }