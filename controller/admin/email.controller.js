const { emailToClinet } = require("../../helpers/sendMail")
const Email = require("../../models/email.model")

const getEmail = async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 })
    res.json({
      emails: emails,
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
const responseEmail = async (req, res) => {
  try {
    const id = req.body.id
    const email = await Email.findOne({
      _id: id
    })
    const emailUser = req.body.email
    const contentUser = email.description
    const contentAdmin = req.body.description
    const title = req.body.title
    emailToClinet(emailUser, contentUser, contentAdmin, title)
    await Email.deleteOne({
      _id: id
    })
    res.json({
      message: "Phản hồi email thành công",
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
module.exports = { getEmail, responseEmail }