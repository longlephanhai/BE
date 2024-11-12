const mongoose = require("mongoose")
const corderSchema = new mongoose.Schema(
  {
    cart_id: String,
    userInfo: {
      fullName: String,
      email: String,
      phone: String,
      address: String
    },
    products: [
      {
        product_id: {
          title: String,
          price: Number,
          discountPercentage: Number,
          thumbnail: String,
          slug: String
        },
        quantity: Number,
      },
    ],
    payment: { type: Boolean, default: false },
    status: { type: String, default: "wait" },
    total: Number,
  },
  {
    timestamps: true
  }
);
const Order = mongoose.model("Order", corderSchema);

module.exports = Order