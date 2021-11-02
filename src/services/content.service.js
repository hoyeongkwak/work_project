const checkValue = require('./checkValue')
const postgresql = require('../models/database')

const getContent = async (req, res, next) => {
  const originContent = req.body.content
  try {
    await checkValue.checkOriginContent({ originContent })
    const result = await postgresql.getContent({ originContent })
    if (result.rowCount === 0) {
      throw new Error('404:0004')
    } else {
      res.json({ ok: true, Content: result.rows })
    }
  } catch (err) {
    next(err)
  }
}
const addContent = async (req, res, next) => {
  const userId = parseInt(req.body.userId)
  const originId = parseInt(req.body.originId)
  const newContent = req.body.transContent
  const langId = parseInt(req.body.langId)
  await checkValue.checkUserId({ userId })
  await checkValue.checkOriginId({ originId })
  await checkValue.checkTransContent({ newContent })
  await checkValue.checkLangId({ langId })
  const result = await postgresql.addContent({ userId, originId, newContent, langId })
  res.json({ ok: true, Content: result.rows })
}
const modifyContent = async (req, res, next) => {
  const transId = parseInt(req.body.transId)
  const transContent = req.body.newContent
  try {
    await checkValue.checkTransId({ transId })
    await checkValue.checkTransContent({ transContent })
    const result = await postgresql.modifyContent({ transId, transContent })
    res.json({ ok: true, trans_Id: result.rows[0].trans_id })
  } catch (err) {
    next(err)
  }
}
const deleteContent = async (req, res, next) => {
  const transId = parseInt(req.body.transId)
  await checkValue.checkTransId({ transId })
  const result = await postgresql.deleteContent({ transId })
  res.json({ ok: true, trans_Id: result.rows[0].trans_id })
}

const restoreContent = async (req, res, next) => {
  const transId = parseInt(req.body.transId)
  await checkValue.checkTransId({ transId })
  const result = await postgresql.restoreContent({ transId })
  res.json({ ok: true, trans_Id: result.rows[0].trans_id })
}

module.exports = {
  getContent,
  addContent,
  modifyContent,
  deleteContent,
  restoreContent
}
