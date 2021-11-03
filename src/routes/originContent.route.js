const express = require('express')
const { originController } = require('../controlers')
const router = express.Router()

router
  .route('/')
  .post(originController.createOriginContent)

router
  .route('/:originId')
  .get(originController.getOriginContent)
  .put(originController.updateOriginContent)
  .delete(originController.deleteOriginContent)

router
  .route('/:originId/trs')
  .get(originController.getTranslateContentsByOriginId)

module.exports = router
