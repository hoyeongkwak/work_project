const checkValue = require('./checkValue')
const postgresql = require('../models/database')

const getOriginContent = async (req, res, next) => {
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
const addOriginContent = async (req, res, next) => {
  const originContent = req.body.content
  // undefined check추가 필요
  const result = await postgresql.addOriginContent({ originContent })
  res.json({ ok: true, Content: result.rows })
}
const modifyOriginContent = async (req, res, next) => {
  const originId = parseInt(req.body.originId)
  const originContent = req.body.content
  try {
    await checkValue.checkOriginId({ originId })
    // await checkValue.checkOriginContent({ originContent })
    const result = await postgresql.modifyOriginContent({ originId, originContent })
    console.log(result)
    res.json({ ok: true, origin_id: result.rows[0].origin_id, content: result.rows[0].origin_content })
  } catch (err) {
    next(err)
  }
}
const deleteOriginContent = async (req, res, next) => {
  const originId = parseInt(req.body.originId)
  await checkValue.checkOriginId({ originId })
  const result = await postgresql.deleteOriginContent({ originId })
  res.json({ ok: true, trans_Id: result.rows[0].origin_id })
}

module.exports = {
  getOriginContent,
  addOriginContent,
  modifyOriginContent,
  deleteOriginContent
}
