const express = require('express')
const { userController } = require('../controlers')
const router = express.Router()

router
  .route('/')
  .post(userController.createUser)

router
  .route('/:userId')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

router
  .route('/:userId/trs')
  .get(userController.getUserTranslateContent)

module.exports = router
