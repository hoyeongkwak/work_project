const express = require('express')
const router = express.Router()
const echoRoute = require('./echo.route')
const userRoute = require('./user.route')
const contentRoute = require('./content.route')
const originContentRoute = require('./originContent.route')

router.use('/echo', echoRoute)
router.use('/users', userRoute)
router.use('/content', contentRoute)
router.use('/origin', originContentRoute)

router.get('*', (req, res) => {
  throw new Error('404:0000')
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
