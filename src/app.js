const express = require('express')
const multer = require('multer')
const routes = require('./routes/index')
const errorHandler = require('./errors/errorhandler')

const app = express()
const formData = multer()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(formData.array())

app.use('/', routes)

app.use((err, req, res, next) => {
  errorHandler.errorHandler(err, req, res, next)
})

module.exports = app
