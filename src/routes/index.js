const express = require('express')
const router = express.Router()
const echoRoute = require('./echo.route')
const userRoute = require('./user.route')
const translationRoute = require('./translationContent.route')
const originalContentRoute = require('./originalContent.route')

router.use('/echo', echoRoute)
router.use('/users', userRoute)
router.use('/translations', translationRoute)
router.use('/originals', originalContentRoute)

router.get('*', (req, res, next) => {
  next(new Error('404:0000'))
})
module.exports = router
