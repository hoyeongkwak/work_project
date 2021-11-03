const express = require('express')
const echoService = require('../services/echo.service')
const router = express.Router()

router
  .route('/')
  .all(echoService.echo)

module.exports = router
