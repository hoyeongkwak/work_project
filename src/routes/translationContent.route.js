const express = require('express')
const { translationController } = require('../controlers')
const router = express.Router()

router
  .route('/')
  .post(translationController.createTranslateContent)

router
  .route('/:transId')
  .get(translationController.getTranslateContent)
  .put(translationController.updateTranslateContent)
  .delete(translationController.deleteTranslateContent)

router
  .route('/:transId/origin')
  .get(translationController.getOriginContentByTranslateId)

module.exports = router
