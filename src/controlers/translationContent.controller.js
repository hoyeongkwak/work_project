const { translationService, userService, originalContentService } = require('../services')
const validator = require('../utils/validation')
const createTranslateContent = async (req, res, next) => {
  try {
    const userId = parseInt(req.body.userId)
    const originContentId = parseInt(req.body.originContentId)
    const translateContent = req.body.translateContent
    const langId = parseInt(req.body.langId)
    await validator.userIdValidation({ userId })
    await validator.originIdValidation({ originContentId })
    await validator.translateContentValidation({ translateContent })
    await validator.languageIdValidation({ langId })
    await userService.getUserById({ userId })
    await originalContentService.getOriginContentIdByContent({ originContentId })
    const content = await translationService.createTranslate({ userId, originContentId, translateContent, langId })
    res.json({ ok: true, translate: content })
  } catch (err) {
    next(err)
  }
}

const getTranslateContent = async (req, res, next) => {
  try {
    const translateId = parseInt(req.params.transId)
    validator.translateIdValidation({ translateId })
    const content = await translationService.getTranslateById({ translateId })
    res.json({ ok: true, translate: content })
  } catch (err) {
    next(err)
  }
}

const getOriginContentByTranslateId = async (req, res, next) => {
  try {
    const translateId = parseInt(req.params.transId)
    validator.translateIdValidation({ translateId })
    const content = await translationService.getOriginContentByTranslateId({ translateId })
    res.json({ ok: true, translate: content })
  } catch (err) {
    next(err)
  }
}

const updateTranslateContent = async (req, res, next) => {
  try {
    const translateId = parseInt(req.params.transId)
    const translateContent = req.body.transContent
    await validator.translateIdValidation({ translateId })
    await validator.translateContentValidation({ translateContent })
    await translationService.getTranslateById({ translateId })
    await translationService.getDuplicateTranslateByContent({ translateContent })

    const content = await translationService.updateTranslateContent({ translateId, translateContent })
    res.json({ ok: true, translate: content })
  } catch (err) {
    next(err)
  }
}

const deleteTranslateContent = async (req, res, next) => {
  try {
    const translateId = parseInt(req.params.transId)
    await validator.translateIdValidation({ translateId })
    await translationService.getTranslateById({ translateId })
    await translationService.deleteTranslateContent({ translateId })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createTranslateContent,
  getTranslateContent,
  updateTranslateContent,
  deleteTranslateContent,
  getOriginContentByTranslateId
}
