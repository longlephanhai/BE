const { sendMailProduct } = require("../../helpers/sendMail");
const Cart = require("../../models/cart.model");
const Order = require("../../models/order.models");
const Stripe = require('stripe')
// nói lấy trên overflow
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
  try {
    const frontend_url = process.env.FRONTEND_URL
    const { userInfo, products } = req.body
    const order = new Order({
      userInfo,
      products,
      cart_id: req.cookies.cartId,
      total: products.reduce((total, product) => total + product.product_id.price * product.quantity, 0)
    })
    await order.save()
    await Cart.updateOne({
      _id: req.cookies.cartId
    }, {
      products: []
    })
    const subject = "Chúc mừng bạn đã đặt hàng thành công"
    sendMailProduct(userInfo.email, subject, products, userInfo)
    // stripe
    const line_items = products.map(product => {
      return {
        price_data: {
          currency: 'vnd',
          product_data: {
            name: product.product_id.title,
            images: [product.product_id.thumbnail]
          },
          unit_amount: product.product_id.price * 1000
        },
        quantity: product.quantity
      }
    })
    line_items.push({
      price_data: {
        currency: 'vnd',
        product_data: {
          name: 'Shipping',
          images: ['https://www.pngfind.com/pngs/m/5-52097_shipping-icon-png-shipping-icon-png-transparent-png.png']
        },
        unit_amount: 2000
      },
      quantity: 1
    })
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}`,
    })
    res.json({
      error: false,
      success: true,
      session_url: session.url
    })
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
const verifyOrder = async (req, res) => {
  try {
    const { success, orderId } = req.body
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, {
        payment: true,
      })
      res.json({
        message: 'Thanh toán thành công',
        success: true,
        error: false
      })
    }
    else {
      await Order.findByIdAndDelete(orderId)
      res.json({
        message: 'Thanh toán thất bại',
        success: false,
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
module.exports = { placeOrder, verifyOrder }
