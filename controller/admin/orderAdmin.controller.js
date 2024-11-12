const Order = require("../../models/order.models")

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    res.json({
      orders,
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      sucess: false,
      error: true
    })
  }
}
const changeStatusOrder = async (req, res) => {
  try {
    const { status, id } = req.body
    await Order.updateOne({
      _id: id
    }, {
      status: status
    })
    res.json({
      message: "Cập nhật trạng thái đơn hàng thành công",
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      sucess: false,
      error: true
    })
  }
}
module.exports = { getOrders, changeStatusOrder }