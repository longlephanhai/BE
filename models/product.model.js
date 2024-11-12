const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: String, //Sản phẩm 1
  product_category_id: {
    type: String,
    default: "",
    ref: "ProductCategory"
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  priceNew: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  featured: String,
  position: Number,
  slug: {
    type: String,
    slug: "title",// Sản phẩm 1
    unique: true //là duy nhất 
  },
  createdBy: {
    account_id: {
      type: String,
      ref: "Account"
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  deleted: {
    type: Boolean,
    default: false
  },
  // deletedAt: Date,
  deletedBy: {
    account_id: {
      type: String,
      ref: "Account"
    },
    deletedAt: Date,
  },
  updatedBy: [
    {
      account_id: {
        type: String,
        ref: "Account"
      },
      updatedAt: Date,
    }
  ],
}, {
  timestamps: true
});
const Product = mongoose.model("Product", productSchema, "products")

module.exports = Product