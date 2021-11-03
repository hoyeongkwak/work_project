const checkValue = require('./checkValue')
const db = require('../models/database')

const createUser = async (userBody) => {
  // BodyType
  const userName = userBody.userName
  await checkValue.checkUserName({ userName })
  const user = await db.createUser({ userName })
  return user.rows[0].user_id
}
/*
const getUserIdByName = async (userBody) => {
  const userName = parseInt(userBody.userName)
  await checkValue.checkUserName({ userName })
  const user = await db.findUserByName({ userName })
  return user.rows[0]
}
*/
const getUserById = async (options) => {
  const user = await db.findUserById({ userId: options.userId })
  return user
}
const getUserTranslateById = async (options) => {
  const user = await db.findUserTranslateContentById(options)
  return user
}
const updateUser = async (options) => {
  const user = await db.updateUser(options)
  return user
}
const deleteUser = async (options) => {
  await db.deleteUser({ options })
}

/*
const getUser = async (req, res, next) => {
  const userId = parseInt(req.params.userId)
  await checkValue.checkUserId({ userId })
  const result = await db.getUserId({ userId })
  console.log(result)
  res.json({ ok: true, user: result.rows })
}

const getUsers = async (req, res) => {
  const result = await db.getUsers()
  res.json({ ok: true, users: result.rows })
}
// Get Params Version
const getUser = async (req, res, next) => {
  const userId = parseInt(req.params.userId)
  await checkValue.checkUserId({ userId })
  const result = await db.getUserId({ userId })
  console.log(result)
  res.json({ ok: true, user: result.rows })
}
const getUserContent = async (req, res, next) => {
  const userId = parseInt(req.params.userId)
  await checkValue.checkUserId({ userId })
  const result = await db.getUserContent({ userId })
  res.json({ ok: true, user: result.rows })
}

// Post Params Version
const addUserName = async (req, res, next) => {
  const userName = req.params.userName
  await db.isUserName({ userName })
  const result = await db.addUser(userName)
  res.json({ ok: true, userId: result.rows })
}
// Put Body Version
const updateUserName = async (req, res, next) => {
  const userId = req.body.userId
  const newName = req.body.newName
  await checkValue.checkUserId({ userId })
  await checkValue.checkUserName({ newName })

  const result = await db.modifyUser({ userId, newName })
  res.json({ ok: true, modifyUserId: result.rows[0].user_id, modifyUserName: result.rows[0].user_name })
}
// Delete Query Version
const deleteUser = async (req, res, next) => {
  const userId = req.body.userId
  await checkValue.checkUserId({ userId })
  const result = await db.deleteUser({ userId })
  res.json({ ok: true, deleteUserId: result.rows[0].user_Id, deleteUser: result.rows[0].user_name })
}
*/
module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserTranslateById
}
