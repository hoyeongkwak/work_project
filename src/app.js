const express = require('express')
const multer = require('multer')
const routes = require('./routes')
const errorHandler = require('./errors/errorhandler')

const app = express()
const formData = multer()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(formData.none())
// app.use((err, req, res, next) => {
//   errorHandler.errorHandler(err, req, res, next)
// }
// )
app.use('/', routes)

app.use(errorHandler.errorHandler) // 모든 요청이 오기떄문에 Error만 받을 수 있도록 하는것이 아닐까 싶긴함.
module.exports = app
