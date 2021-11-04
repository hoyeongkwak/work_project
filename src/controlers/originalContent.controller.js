const { originalContentService, translationService } = require('../services')
const validator = require('../utils/validation')

const createOriginContent = async (req, res, next) => {
  try {
    const originContent = req.body.originContent
    const content = await originalContentService.createOriginContent({ originContent })
    res.json({ ok: true, origin: content })
  } catch (err) {
    next(err)
  }
}

const getOriginContent = async (req, res, next) => {
  try {
    const originContentId = parseInt(req.params.originId)
    validator.originIdValidation({ originContentId })
    const content = await originalContentService.getOriginContentById({ originContentId })
    res.json({ ok: true, origin: content })
  } catch (err) {
    next(err)
  }
}

const getOriginContentIdByContent = async (req, res, next) => {
  try {
    const originContent = req.body.originContent
    validator.originContentValidation({ originContent })
    const content = await originalContentService.getOriginContentIdByContent({ originContent })
    res.json({ ok: true, origin: content })
  } catch (err) {
    next(err)
  }
}

const getTranslateContentsByOriginId = async (req, res, next) => {
  try {
    const originContentId = parseInt(req.params.originId)
    validator.originIdValidation({ originContentId })
    const content = await translationService.getTranslateContentByOriginId({ originContentId })
    const originContent = content[0].origin_content
    const translationContents = []
    content.forEach((translate) => {
      delete translate.origin_id
      delete translate.origin_content
      const jsonObj = JSON.parse(JSON.stringify(translate))
      translationContents.push(jsonObj)
    })
    res.json({ ok: true, originId: originContentId, origin_content: originContent, translate: translationContents })
  } catch (err) {
    next(err)
  }
}
const updateOriginContent = async (req, res, next) => {
  try {
    const originContentId = parseInt(req.params.originId)
    const originContent = req.body.originContent
    await validator.originIdValidation({ originContentId })
    await validator.originContentValidation({ originContent })
    const content = await originalContentService.updateOriginContent({ originContentId, originContent })
    res.json({ ok: true, origin: content })
  } catch (err) {
    next(err)
  }
}

const deleteOriginContent = async (req, res, next) => {
  try {
    const originContentId = parseInt(req.params.originId)
    await validator.originIdValidation({ originContentId })
    await originalContentService.deleteOriginContent({ originContentId })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createOriginContent,
  getOriginContent,
  updateOriginContent,
  deleteOriginContent,
  getOriginContentIdByContent,
  getTranslateContentsByOriginId
}
