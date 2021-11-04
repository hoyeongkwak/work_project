const { userService } = require('../services')
const validator = require('../utils/validation')

const createUser = async (req, res, next) => {
  try {
    const userName = req.body.userName
    await validator.userNameValidation({ userName })
    const user = await userService.createUser({ userName })
    res.json({ ok: true, userId: user })
  } catch (err) {
    next(err)
  }
}
const getUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId)
    validator.userIdValidation({ userId })
    const user = await userService.getUserById({ userId })
    res.json({ ok: true, user })
  } catch (err) {
    next(err)
  }
}
const getUserTranslateContent = async (req, res, next) => {
  try {
    const userId = req.params.userId
    validator.userIdValidation({ userId })
    const user = await userService.getUserTranslateById({ userId })
    res.json({ ok: true, user })
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId)
    const userName = req.body.userName
    validator.userIdValidation({ userId })
    validator.userNameValidation({ userName })
    const user = await userService.updateUser({ userId, userName })
    res.json({ ok: true, user })
  } catch (err) {
    next(err)
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId)
    validator.userIdValidation({ userId })
    await userService.deleteUser({ userId })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}
module.exports = { createUser, getUser, updateUser, deleteUser, getUserTranslateContent }
