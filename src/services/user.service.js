const checkValue = require('./checkValue')
const postgresql = require('../models/database')

const getUsers = async (req, res) => {
  const result = await postgresql.getUsers()
  res.json({ ok: true, users: result.rows })
}
// Get Params Version
const getUser = async (req, res, next) => {
  const userId = parseInt(req.params.userId)
  await checkValue.checkUserId({ userId })
  const result = await postgresql.getUserId({ userId })
  res.json({ ok: true, user: result.rows })
}
const getUserContent = async (req, res, next) => {
  const userId = parseInt(req.params.userId)
  await checkValue.checkUserId({ userId })
  const result = await postgresql.getUserContent({ userId })
  res.json({ ok: true, user: result.rows })
}
const addUser = async (req, res, next) => {
  // BodyType
  const userName = req.body.userName
  await checkValue.checkUserName({ userName })
  const result = await postgresql.addUser({ userName })
  res.json({ ok: true, userId: result.rows })
}
// Post Params Version
const addUserName = async (req, res, next) => {
  const userName = req.params.userName
  await postgresql.isUserName({ userName })
  const result = await postgresql.addUser(userName)
  res.json({ ok: true, userId: result.rows })
}
// Put Body Version
const updateUserName = async (req, res, next) => {
  const userId = req.body.userId
  const newName = req.body.newName
  await checkValue.checkUserId({ userId })
  await checkValue.checkUserName({ newName })

  const result = await postgresql.modifyUser({ userId, newName })
  res.json({ ok: true, modifyUserId: result.rows[0].user_id, modifyUserName: result.rows[0].user_name })
}
// Delete Query Version
const deleteUser = async (req, res, next) => {
  const userId = req.body.userId
  await checkValue.checkUserId({ userId })
  const result = await postgresql.deleteUser({ userId })
  res.json({ ok: true, deleteUserId: result.rows[0].user_Id, deleteUser: result.rows[0].user_name })
}

module.exports = {
  getUsers,
  getUser,
  getUserContent,
  addUser,
  updateUserName,
  deleteUser
}
