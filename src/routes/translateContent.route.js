const express = require('express')
const { translateController } = require('../controlers')
const router = express.Router()

router
  .route('/')
  .post(translateController.createTranslateContent)

router
  .route('/:transId')
  .get(translateController.getTranslateContent)
  .put(translateController.updateTranslateContent)
  .delete(translateController.deleteTranslateContent)

module.exports = router
