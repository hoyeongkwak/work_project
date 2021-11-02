const db = require('../models/database')

async function checkUserId (options) {
  const { userId } = options
  if (isNaN(userId) === true) {
    throw new Error('400:0001')
  }
  const isUserId = await db.isUserId({ userId })
  if (isUserId === false) {
    throw new Error('404:0001')
  }
}
async function checkUserName (options) {
  const { userName } = options
  if (!userName) {
    throw new Error('400:0000')
  }
  if (userName.length > 30) {
    throw new Error('400:0003')
  }
  const isUserName = await db.isUserName({ userName })
  if (isUserName === true) {
    throw new Error('404:0002')
  }
}
async function checkOriginId (options) {
  const { originId } = options
  if (isNaN(originId) === true) {
    throw new Error('400:0004')
  }
  const isUserId = await db.isOriginId({ originId })
  if (isUserId === false) {
    throw new Error('404:0003')
  }
}
async function checkOriginContent (options) {
  const { originContent } = options
  if (!originContent) {
    throw new Error('400:0000')
  }
  if (originContent.length > 150) {
    throw new Error('400:0006')
  }
  console.log(originContent)
  const isContent = await db.isOriginContent({ originContent })
  if (isContent === false) {
    throw new Error('404:0004')
  }
}
async function checkTransId (options) {
  const { transId } = options
  if (isNaN(transId) === true) {
    throw new Error('400:0007')
  }
  const isUserId = await db.isTransId({ transId })
  if (isUserId === false) {
    throw new Error('404:0005')
  }
}
async function checkTransContent (options) {
  const { transContent } = options
  if (transContent.length > 150) {
    throw new Error('400:0009')
  }
  const isContent = await db.isTransContent({ transContent })
  if (isContent === true) {
    throw new Error('404:0006')
  }
}
async function checkLangId (options) {
  const { langId } = options
  if (isNaN(langId) === true) {
    throw new Error('400:0010')
  }
  const isLangId = await db.isLangId({ langId })
  if (isLangId === false) {
    throw new Error('404:0007')
  }
}

module.exports = {
  checkUserId,
  checkUserName,
  checkOriginId,
  checkOriginContent,
  checkTransId,
  checkTransContent,
  checkLangId
}
