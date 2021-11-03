const checkValue = require('./checkValue')
const validator = require('../utils/validation')
const db = require('../models/database')

const createTranslate = async (options) => {
  const result = await db.createTranslateContent(options)
  return result
}

const getTranslateContentByOriginContent = async (translateBody) => {
  const originContent = translateBody.originContent
  await checkValue.checkOriginContent({ originContent })
  const result = await db.findTranslateContentByOriginContent({ originContent })
  if (result.rowCount === 0) {
    throw new Error('404:0004')
  } else {
    return result.rows[0]
  }
}

const getTranslateContentByOriginId = async (options) => {
  const result = await db.findTranslateContentByOriginId({ originContentId: options.originContentId })
  return result
}
const getTranslateById = async (options) => {
  const result = await db.findTranslateById(options)
  return result
}

const getTranslatedByContent = async (options) => {
  const result = await db.findTranslateByConent(options)
  return result
}

const getDuplicateTranslateByContent = async (options) => {
  const result = await db.findDuplicateTranslateContentByContent(options)
  return result
}

const updateTranslateContent = async (options) => {
  const result = await db.updateTranslateContent(options)
  return result
}
const deleteTranslateContent = async (options) => {
  await db.deleteTranslateContent(options)
}

module.exports = {
  createTranslate,
  getTranslateContentByOriginContent,
  getTranslateById,
  updateTranslateContent,
  deleteTranslateContent,
  getTranslateContentByOriginId,
  getTranslatedByContent,
  getDuplicateTranslateByContent
}
