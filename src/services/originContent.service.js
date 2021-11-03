const checkValue = require('./checkValue')
const db = require('../models/database')

const createOriginContent = async (options) => {
  // await checkValue.checkDuplicateOriginContent({ originContent })
  const content = await db.createOriginContent(options)
  return content
}
const getOriginContentById = async (options) => {
  const content = await db.findOriginContentById(options)
  return content
}
const getOriginContentIdByContent = async (options) => {
  const content = await db.findOriginContentIdByContent(options)
  return content
}
const updateOriginContent = async (options) => {
  const content = await db.updateOriginContent(options)
  return content
}
const deleteOriginContent = async (options) => {
  await db.deleteOriginContent(options)
}
module.exports = {
  createOriginContent,
  getOriginContentById,
  getOriginContentIdByContent,
  updateOriginContent,
  deleteOriginContent
}
