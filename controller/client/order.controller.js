const Order = require("../../models/order.models")

const getOrder = async (req, res) => {
  try {
    const cart_id = req.cookies.cartId
    const orders = await Order.find({ cart_id })
    res.json({
      orders: orders,
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
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id
    const order = await Order.findOne({
      _id: orderId
    }).select("products")
    res.json({
      order: order,
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
module.exports = { getOrder, getOrderById }
