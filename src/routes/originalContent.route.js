const express = require('express')
const { originalController } = require('../controlers')
const router = express.Router()

router
  .route('/')
  .post(originalController.createOriginContent)

router
  .route('/:originId')
  .get(originalController.getOriginContent)
  .put(originalController.updateOriginContent)
  .delete(originalController.deleteOriginContent)

router
  .route('/:originId/trs')
  .get(originalController.getTranslateContentsByOriginId)

module.exports = router
