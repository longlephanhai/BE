const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      ref: "User"
    },
    products: [
      {
        product_id: {
          type: String,
          ref: "Product"
        },
        quantity: Number,
      }
    ],
  },
  {
    timestamps: true
  }
);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart