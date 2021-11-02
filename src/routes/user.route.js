const express = require('express')
const userService = require('../services/user.service')
const router = express.Router()

router
  .route('/')
  .get(userService.getUsers)
  .post(userService.addUser)
  .put(userService.updateUserName)
  .delete(userService.deleteUser)

router
  .route('/:userId')
  .get(userService.getUser)

router
  .route('/:userId/trs')
  .get(userService.getUserContent)

module.exports = router
