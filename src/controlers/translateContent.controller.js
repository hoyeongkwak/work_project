const { translateService, userService, originContentService } = require('../services')
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
    await originContentService.getOriginContentIdByContent({ originContentId })
    const content = await translateService.createTranslate({ userId, originContentId, translateContent, langId })
    res.json({ ok: true, translate: content })
  } catch (err) {
    next(err)
  }
}

const getTranslateContent = async (req, res, next) => {
  try {
    let translateId
    if (Object.keys(req.params).length === 0) {
      translateId = parseInt(req.body.transId)
    } else {
      translateId = parseInt(req.params.transId)
    }
    validator.translateIdValidation({ translateId })
    const content = await translateService.getTranslateById({ translateId })
    res.json({ ok: true, translate: content })
  } catch (err) {
    next(err)
  }
}

const updateTranslateContent = async (req, res, next) => {
  try {
    let translateId
    if (Object.keys(req.params).length === 0) {
      translateId = parseInt(req.body.transId)
    } else {
      translateId = parseInt(req.params.transId)
    }
    const translateContent = req.body.transContent
    await validator.translateIdValidation({ translateId })
    await validator.translateContentValidation({ translateContent })
    await translateService.getTranslateById({ translateId })
    await translateService.getDuplicateTranslateByContent({ translateContent })

    const content = await translateService.updateTranslateContent({ translateId, translateContent })
    res.json({ ok: true, translate: content })
  } catch (err) {
    next(err)
  }
}

const deleteTranslateContent = async (req, res, next) => {
  try {
    let translateId
    if (Object.keys(req.params).length === 0) {
      translateId = parseInt(req.body.transId)
    } else {
      translateId = parseInt(req.params.transId)
    }
    await validator.translateIdValidation({ translateId })
    await translateService.getTranslateById({ translateId })
    await translateService.deleteTranslateContent({ translateId })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createTranslateContent,
  getTranslateContent,
  updateTranslateContent,
  deleteTranslateContent
}
