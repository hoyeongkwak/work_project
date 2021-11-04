const db = require('../models/database')

const createOriginContent = async (options) => {
  // await checkValue.checkDuplicateOriginContent({ originContent })
  return await db.createOriginContent(options)
}
const getOriginContentById = async (options) => {
  return await db.findOriginContentById(options)
}
const getOriginContentIdByContent = async (options) => {
  return await db.findOriginContentIdByContent(options)
}
const updateOriginContent = async (options) => {
  return await db.updateOriginContent(options)
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
