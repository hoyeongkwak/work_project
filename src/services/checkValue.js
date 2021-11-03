const db = require('../models/database')
const validator = require('../utils/validation')

async function checkUserId (options) {
  const { userId } = options
  await validator.userIdValidation({ userId })
  const user = await db.findUserById({ userId })
  if (user.rowsCount === 0) {
    throw new Error('404:0001')
  }
}
async function checkUserName (options) {
  const { userName } = options
  await validator.userNameValidation({ userName })
  const user = await db.findUserByName({ userName })
  if (user.rowsCount === 0) {
    throw new Error('404:0002')
  }
}
async function checkOriginId (options) {
  const { originContentId } = options
  await validator.originIdValidation({ originContentId })
  const orgContent = await db.findOriginContentById({ originContentId })
  if (orgContent.rowCount === 0) {
    throw new Error('404:0003')
  }
}
async function checkOriginContent (options) {
  const { originContent } = options
  await validator.originContentValidation({ originContent })
  const orgContent = await db.findOriginContentIdByContent({ originContent })
  if (orgContent.rowCount === 0) {
    throw new Error('404:0003')
  }
}

async function checkDuplicateOriginContent (options) {
  const { originContent } = options
  await validator.originContentValidation({ originContent })
  const orgContent = await db.findOriginContentIdByContent({ originContent })
  if (orgContent.rowCount >= 1) {
    throw new Error('404:0004')
  }
}

async function checkTransId (options) {
  const { translateId } = options
  await validator.translateIdValidation({ translateId })
  const trsContent = await db.findTranslateById({ translateId })
  if (trsContent.rowCount === 0) {
    throw new Error('404:0005')
  }
}
async function checkTransContent (options) {
  const { translateContent } = options
  await validator.translateContentValidation({ translateContent })
  const trsContent = await db.findTranslateByConent({ translateContent })
  if (trsContent.rowCount === 0) {
    throw new Error('404:0006')
  }
}
async function checkLangId (options) {
  const { langId } = options
  await validator.languageIdValidation({ langId })
  const isLangId = await db.isLangId({ langId })
  if (isLangId === false) {
    throw new Error('404:0007')
  }
}

module.exports = {
  checkUserId,
  checkUserName,
  checkOriginId,
  checkDuplicateOriginContent,
  checkTransId,
  checkTransContent,
  checkLangId,
  checkOriginContent
}
