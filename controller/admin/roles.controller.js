const Role = require("../../models/roles.model")

// tạo role bên trang admin phần nhóm quyền
const createRole = async (req, res) => {
  try {
    const data = req.body
    const role = new Role(data);
    await role.save()
    res.json({
      message: "Tạo nhóm quyền thành công",
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
// lấy tất cả role bên trang admin phần nhóm quyền
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({
      deleted: false
    })
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
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id)
    res.json({
      role: role,
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
const editRole = async (req, res) => {
  try {
    const id = req.params.id
    await Role.updateOne({
      _id: id,
    }, req.body)
    res.json({
      message: "Chỉnh sửa nhóm quyền thành công",
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
const deleteRole = async (req, res) => {
  try {
    const id = req.body.id
    await Role.updateOne({
      _id: id,
    }, {
      deleted: true
    })
    res.json({
      message: "Xóa nhóm quyền thành công",
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
module.exports = { createRole, getRoles, getRoleById, editRole, deleteRole }