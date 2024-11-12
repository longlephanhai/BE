const Role = require("../../models/roles.model")

const permissions = async (req, res) => {
  try {
    let find = {
      deleted: false
    }
    const roles = await Role.find(find)
    res.json({
      roles: roles,
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
const editPermissions = async (req, res) => {
  try {
    const data = req.body;
    for (const item in data) {
      const permissions = [];
      const title = item
      for (const key in data[item]) {
        const permission = key
        const checked = data[item][key]
        if (checked) {
          permissions.push(permission)
        }
      }
      await Role.updateOne({ title: title }, { permissions: permissions })
    }
    res.json({
      message: "Cập nhật quyền thành công",
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
module.exports = { permissions, editPermissions }