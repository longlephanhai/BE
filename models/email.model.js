const mongoose = require("mongoose")
const emailSchema = new mongoose.Schema(
  {
    email: String,
    title: String,
    description: String,
  },
  {
    timestamps: true
  }
);
const Email = mongoose.model("Email", emailSchema);

module.exports = Email