const Cart = require("../../models/cart.model")

const addCart = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
      _id: cartId
    })

    const existProductInCart = cart.products.find(product => product.product_id === req.body.id)
    if (existProductInCart) {
      return res.json({
        message: "Sản phẩm đã có trong giỏ hàng",
        success: false,
        error: true
      })
    }
    else {
      const objectCart = {
        product_id: req.body.id,
        quantity: 1
      }
      await Cart.findByIdAndUpdate({ _id: cartId }, { $push: { products: objectCart } });
      res.json({
        message: "Thêm vào giỏ hàng thành công",
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
const getCart = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
      _id: cartId
    }).populate("products.product_id", "title price thumbnail discountPercentage slug")
    if (cart.products.length > 0) {
      for (const item of cart.products) {
        const productId = item.product_id;
        productId.price = (productId.price * (100 - productId.discountPercentage) / 100).toFixed(0)
      }
    }
    res.json({
      cart: cart,
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
const deleteCart = async (req, res) => {
  try {
    const cartId = req.cookies.cartId
    const productId = req.body.id
    await Cart.updateOne({
      _id: cartId
    }, {
      $pull: {
        products: {
          product_id: productId
        }
      }
    })
    res.json({
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
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
const updateQuantity = async (req, res) => {
  try {
    const cartId = req.cookies.cartId
    const productId = req.body.id
    const quantity = req.body.quantity
    const cart = await Cart.findOne({
      _id: cartId
    })
    const product = cart.products.find(product => product._id == productId)
    product.quantity = quantity
    await cart.save()
    res.json({
      message: "Cập nhật số lượng sản phẩm thành công",
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
module.exports = { addCart, getCart, deleteCart, updateQuantity }