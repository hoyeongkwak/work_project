const express = require('express')
const echo = require('../services/echo.service')
const router = express.Router()

router
  .route('/')
  .get(echo.echo)
  .post(echo.echo)
  .put(echo.echo)
  .delete(echo.echo)

module.exports = router
