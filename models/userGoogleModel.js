const mongoose = require("mongoose")
const generate = require("../helpers/generate")
const userGoogleSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  tokenUser: {
    type: String,
    default: generate.generateRandomString(30)
  },
  phone: String,
  avatar: String,
  status: {
    type: String,
    default: "active"
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});
const UserGoogle = mongoose.model("usergoogle", userGoogleSchema);

module.exports = UserGoogle