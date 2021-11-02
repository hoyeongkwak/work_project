const express = require('express')
const contentService = require('../services/content.service')
const router = express.Router()

router
  .route('/')
  .get(contentService.getContent)
  .post(contentService.addContent)
  .put(contentService.modifyContent)
  .delete(contentService.deleteContent)

router
  .route('/:originId/restore')
  .put(contentService.restoreContent)

module.exports = router
