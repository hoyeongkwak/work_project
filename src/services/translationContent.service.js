const db = require('../models/database')

const createTranslate = async (options) => {
  return await db.createTranslateContent(options)
}

const getTranslateContentByOriginId = async (options) => {
  return await db.findTranslateContentByOriginId({ originContentId: options.originContentId })
}
const getTranslateById = async (options) => {
  return await db.findTranslateById(options)
}

const getTranslatedByContent = async (options) => {
  return await db.findTranslateByConent(options)
}

const getDuplicateTranslateByContent = async (options) => {
  return await db.findDuplicateTranslateContentByContent(options)
}

const getOriginContentByTranslateId = async (options) => {
  return await db.findOriginContentByTranslateId(options)
}

const updateTranslateContent = async (options) => {
  return await db.updateTranslateContent(options)
}
const deleteTranslateContent = async (options) => {
  await db.deleteTranslateContent(options)
}

module.exports = {
  createTranslate,
  getTranslateById,
  updateTranslateContent,
  deleteTranslateContent,
  getTranslateContentByOriginId,
  getTranslatedByContent,
  getDuplicateTranslateByContent,
  getOriginContentByTranslateId
}
