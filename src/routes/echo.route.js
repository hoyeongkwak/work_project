const express = require('express')
const { echoController } = require('../controlers')
const router = express.Router()

router
  .route('/')
  .all(echoController.echo)

module.exports = router
