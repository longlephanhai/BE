const SettingGeneral = require("../../models/settings-general.model")

const general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne()
  res.json({
    settingGeneral: settingGeneral,
    success: true,
    error: false
  })
}
const updateSetting = async (req, res) => {
  try {
    const setting = await SettingGeneral.findOne()
    if (setting) {
      delete req.body.image
      await SettingGeneral.updateOne({
        _id: setting._id
      }, req.body)
    } else {
      const record = new SettingGeneral(req.body)
      await record.save()
    }
    res.json({
      message: "Cập nhật thành công",
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message: error.message,
      loi: "loi",
      success: false,
      error: true
    })
  }
}
module.exports = { updateSetting, general }