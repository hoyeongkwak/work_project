const express = require('express')
const router = express.Router()
const echoRoute = require('./echo.route')
const userRoute = require('./user.route')
const translateRoute = require('./translateContent.route')
const originContentRoute = require('./originContent.route')

router.use('/echo', echoRoute)
router.use('/users', userRoute)
router.use('/translations', translateRoute)
router.use('/origin-contents', originContentRoute)

router.get('*', (req, res, next) => {
  next(new Error('404:0000'))
})
/*
router.get('/', async (req, res, next) => {
  const result = await db.getAllInformation()
  try {
    res.json({ ok: true, users: result.rows })
  } catch (err) {
    console.log(err)
    res.json({ ok: false, err: err })
  }
})

 */
module.exports = router
