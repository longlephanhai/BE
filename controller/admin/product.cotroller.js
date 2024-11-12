const paginationHelper = require("../../helpers/pagination")
const Product = require("../../models/product.model")

const getProduct = async (req, res) => {
  try {
    let find = {
      deleted: false
    }
    // filter
    if (req.query.status) {
      find.status = req.query.status
    }
    // pagination
    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
      {
        currenttPage: 1,
        limitItems: 5,
      },
      req.query,
      countProduct
    )
    // search
    const search = req.query.search
    if (search) {
      find.title = { $regex: search, $options: "i" }
    }
    // sort
    let sort = {}
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue
    } else {
      sort.position = "desc"
    }
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort(sort)
      .populate('createdBy.account_id', "fullName").populate('updatedBy.account_id', 'fullName')
    res.json({
      products: products,
      countProduct: countProduct,
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
const detailProduct = async (req, res) => {
  try {
    const params = req.params.id
    const product = await Product.findOne({
      slug: params,
    }).select("-createdBy -deletedBy -updatedBy")
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
const deleteProduct = async (req, res) => {
  try {
    const { id, user } = req.body
    await Product.updateOne({ _id: id },
      {
        deleted: true,
        deletedBy: {
          account_id: user._id,
          deletedAt: new Date()
        }
      }
    ).populate('deletedBy.account_id', 'fullName')
    res.json({
      message: "Xóa sản phẩm thành công",
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
const editProduct = async (req, res) => {
  try {
    const slug = req.params.id
    await Product.updateOne({
      slug: slug
    }, {
      ...req.body,
      $push: {
        updatedBy: {
          account_id: req.user._id,
          updatedAt: new Date()
        }
      }
    }).populate('updatedBy.account_id', 'fullName')
    res.json({
      message: "Cập nhật sản phẩm thành công",
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
const createProduct = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if (req.body.position == "") {
      const countProducts = await Product.countDocuments()
      req.body.position = countProducts + 1;
    } else {
      req.body.position = parseInt(req.body.position)
    }
    req.body.createdBy = {
      account_id: req.user._id,
    }
    const product = new Product(req.body);
    await product.save();
    res.json({
      message: "Thêm sản phẩm thành công",
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
const changeMultiStatus = async (req, res) => {
  try {
    const ids = req.body.checkItem
    const type = req.body.type
    const updatedBy = {
      account_id: req.user.id,
      updatedAt: new Date()
    }
    switch (type) {
      case "active":
        await Product.updateMany({ _id: { $in: ids } }, {
          status: "active",
          $push: {
            updatedBy: updatedBy
          }
        })
        break;
      case "inactive":
        await Product.updateMany({ _id: { $in: ids } }, {
          status: "inactive",
          $push: {
            updatedBy: updatedBy
          }
        })
        break;
      case "delete-all":
        await Product.updateMany({ _id: { $in: ids } }, {
          deleted: true,
          deletedBy: {
            account_id: req.user.id,
            deletedAt: new Date()
          }
        })
        break;
      default:
        break;
    }
    res.json({
      message: "Thay đổi trạng thái thành công",
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
module.exports = { getProduct, detailProduct, deleteProduct, editProduct, createProduct, changeMultiStatus }