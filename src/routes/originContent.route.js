const express = require('express')
const originService = require('../services/originContent.service')
const router = express.Router()

router
  .route('/')
  .get(originService.getOriginContent)
  .post(originService.addOriginContent)
  .put(originService.modifyOriginContent)
  .delete(originService.deleteOriginContent)

module.exports = router
