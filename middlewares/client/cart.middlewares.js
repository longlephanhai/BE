const Cart = require("../../models/cart.model");
const cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    const expiresTime = 1000 * 60 * 60 * 24 * 365;
    const tokenOption = {
      httpOnly: true,
      sameSite: 'Lax',
    };
    if (process.env.NODE_ENV === 'production') {
      tokenOption.sameSite = 'None';
      tokenOption.secure = true;
    }
    res.cookie('cartId', cart._id, tokenOption, {
      expires: new Date(Date.now() + expiresTime),
      httpOnly: true
    });
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId
    })
    if (cart) {
      cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0)
      res.locals.miniCart = cart
    }
  }
  next()
}
module.exports = { cartId }