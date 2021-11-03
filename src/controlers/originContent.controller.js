const { originContentService, translateService } = require('../services')
const validator = require('../utils/validation')

const createOriginContent = async (req, res, next) => {
  // findDuplicateOriginContentByContent
  try {
    const originContent = req.body.originContent
    const content = await originContentService.createOriginContent({ originContent })
    res.json({ ok: true, origin: content })
  } catch (err) {
    next(err)
  }
}

const getOriginContent = async (req, res, next) => {
  try {
    let originContentId
    if (Object.keys(req.params).length === 0) {
      originContentId = parseInt(req.body.originId)
    } else {
      originContentId = parseInt(req.params.originId)
    }
    validator.originIdValidation({ originContentId })
    const content = await originContentService.getOriginContentById({ originContentId })
    res.json({ ok: true, origin: content })
  } catch (err) {
    next(err)
  }
}

const getOriginContentIdByContent = async (req, res, next) => {
  try {
    const originContent = req.body.originContent
    validator.originContentValidation({ originContent })
    const content = await originContentService.getOriginContentIdByContent({ originContent })
    res.json({ ok: true, origin: content })
  } catch (err) {
    next(err)
  }
}

const getTranslateContentsByOriginId = async (req, res, next) => {
  try {
    const originContentId = parseInt(req.params.originId)
    validator.originIdValidation({ originContentId })
    const content = await translateService.getTranslateContentByOriginId({ originContentId })
    const originContent = content[0].origin_content
    // const translations = content.forEach(element => [{"transContent": element.trans_content, "langid": element.lang_Id}]
    const translationContents = []
    console.log(originContent)
    content.forEach((translate) => {
      delete translate.origin_id
      delete translate.origin_content
      const jsonObj = JSON.parse(JSON.stringify(translate))
      translationContents.push(jsonObj)
    })
    console.log(translationContents)
    res.json({ ok: true, originId: originContentId, origin_content: originContent, translate: translationContents })
  } catch (err) {
    next(err)
  }
}
const updateOriginContent = async (req, res, next) => {
  try {
    let originContentId
    if (Object.keys(req.params).length === 0) {
      originContentId = parseInt(req.body.originId)
    } else {
      originContentId = parseInt(req.params.originId)
    }
    const originContent = req.body.originContent
    await validator.originIdValidation({ originContentId })
    await validator.originContentValidation({ originContent })
    const content = await originContentService.updateOriginContent({ originContentId, originContent })
    res.json({ ok: true, origin: content })
  } catch (err) {
    next(err)
  }
}

const deleteOriginContent = async (req, res, next) => {
  try {
    let originContentId
    if (Object.keys(req.params).length === 0) {
      originContentId = parseInt(req.body.originId)
    } else {
      originContentId = parseInt(req.params.originId)
    }
    await validator.originIdValidation({ originContentId })
    await originContentService.deleteOriginContent({ originContentId })
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
