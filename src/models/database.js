const connect = require('./connection')
const pool = connect.postgresql

async function query (text, params) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (err) {
    throw new Error('500:0002')
  }
}

async function isUserId (options, next) {
  const { userId } = options
  const sql = 'SELECT count(*) FROM users WHERE users.user_id = $1'
  const result = await query(sql, [userId])
  if (result.rows[0].count >= 1) {
    return true
  } else {
    return false
  }
}
async function isUserName (options) {
  const { userName } = options
  const sql = 'SELECT count(*) FROM users WHERE users.user_name = $1'
  const result = await query(sql, [userName])
  if (result.rows[0].count >= 1) {
    return true
  } else {
    return false
  }
}
async function isOriginId (options) {
  const { originId } = options
  const sql = 'SELECT count(*) FROM origin WHERE origin.origin_id = $1'
  const result = await query(sql, [originId])
  if (result.rows[0].count >= 1) {
    return true
  } else {
    return false
  }
}
async function isOriginContent (options) {
  const { originContent } = options
  const sql = 'SELECT count(*) FROM origin WHERE origin.origin_content = $1'
  const result = await query(sql, [originContent])
  if (result.rows[0].count >= 1) {
    return true
  } else {
    return false
  }
}
async function isTransId (options) {
  const { transId } = options
  const sql = 'SELECT count(*) FROM translation WHERE translation.trans_id = $1'
  try {
    const result = await query(sql, [transId])
    if (result.rows[0].count >= 1) {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw new Error('500:0002')
  }
}
async function isTransContent (options) {
  const { transContent } = options
  const sql = 'SELECT count(*) FROM translation WHERE translation.trans_content = $1 AND deleted_at IS NULL'
  const result = await query(sql, [transContent])
  if (result.rows[0].count >= 1) {
    return true
  } else {
    return false
  }
}
async function isLangId (options) {
  const { langId } = options
  const sql = 'SELECT count(*) FROM language WHERE language.lang_id = $1'
  const result = await query(sql, [langId])
  if (result.rows[0].count >= 1) {
    return true
  } else {
    return false
  }
}
async function getUsers () {
  const sql = 'SELECT * FROM users'
  const result = await query(sql)
  return result
}

async function getUserId (options) {
  const { userId } = options
  const sql = 'SELECT user_id, user_name FROM users WHERE users.user_id = $1'
  const result = await query(sql, [userId])
  return result
}

async function getUserName (options) {
  const { userName } = options
  const sql = 'SELECT user_name, origin_content, trans_content FROM translation LEFT JOIN users ON user_id = translation.trans_user LEFT JOIN origin ON origin_id = trans_origin_id WHERE users.user_name = $1 AND deleted_at IS NULL'
  const result = await query(sql, [userName])
  return result
}
async function getUserContent (options) {
  const { userId } = options
  const sql = 'SELECT origin_content, trans_content from translation INNER JOIN users ON users.user_id = translation.user_id INNER JOIN origin ON origin.origin_id = translation.origin_id WHERE users.user_id = $1 AND deleted_at IS NULL'
  const result = await query(sql, [userId])
  return result
}
async function addUser (options) {
  const { userName } = options
  const sql = 'INSERT INTO users (user_name) VALUES ($1) RETURNING *'
  const result = await query(sql, [userName])
  return result
}

async function modifyUser (options) {
  const { userId, newName } = options
  const sql = 'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING *'
  const result = await query(sql, [newName, userId])
  return result
}

async function deleteUser (options) {
  const { userId } = options
  const sql = 'DELETE FROM users WHERE user_id = $1 RETURNING *'
  const result = await query(sql, [userId])
  return result
}

async function getAllInformation () {
  const sql = 'SELECT origin_content, lang_code, trans_content, user_name AS trans_user FROM translation t INNER JOIN users ON users.user_id = t.user_id INNER JOIN origin ON origin.origin_id = t.origin_id INNER JOIN language ON language.lang_id = t.lang_id'
  const result = await query(sql)
  return result
}

async function getContent (options) {
  const { originContent } = options
  const sql = 'SELECT origin_content, trans_content FROM translation INNER JOIN origin ON origin.origin_id = translation.origin_id WHERE origin.origin_content = $1 AND deleted_at IS NULL'
  const result = await query(sql, [originContent])
  return result
}
async function addContent (options) {
  const { userId, originId, newContent, langId } = options
  const sql = 'INSERT INTO translation (origin_id, user_id, trans_content, lang_id) VALUES ($1, $2, $3, $4) RETURNING *'
  const result = await query(sql, [userId, originId, newContent, langId])
  return result
}

async function modifyContent (options) {
  const { transId, transContent } = options
  const sql = 'UPDATE translation SET trans_content = $1 WHERE trans_id = $2 RETURNING *'
  const result = await query(sql, [transContent, transId])
  return result
}

async function deleteContent (options) {
  const { transId } = options
  const sql = 'UPDATE translation SET deleted_at = now() WHERE trans_id = $1 RETURNING *'
  const result = await query(sql, [transId])
  return result
}

async function restoreContent (options) {
  const { transId } = options
  const sql = 'UPDATE translation SET deleted_at = NULL WHERE trans_id = $1 RETURNING *'
  const result = await query(sql, [transId])
  return result
}

async function addOriginContent (options) {
  const { originContent } = options
  const sql = 'INSERT INTO origin (origin_content) VALUES ($1) RETURNING *'
  const result = await query(sql, [originContent])
  return result
}

async function modifyOriginContent (options) {
  const { originId, originContent } = options
  const sql = 'UPDATE origin SET origin_content = $1 WHERE origin_id = $2 RETURNING *'
  const result = await query(sql, [originContent, originId])
  return result
}

async function deleteOriginContent (options) {
  const { originId } = options
  const sql = 'DELETE FROM origin WHERE origin_id = $1 RETURNGING *'
  const result = await query(sql, [originId])
  return result
}

module.exports = {
  getUsers,
  getUserId,
  getUserName,
  addUser,
  modifyUser,
  deleteUser,
  getAllInformation,
  getUserContent,
  getContent,
  isUserId,
  isUserName,
  isOriginContent,
  isOriginId,
  isTransContent,
  isTransId,
  isLangId,
  addContent,
  modifyContent,
  deleteContent,
  restoreContent,
  addOriginContent,
  modifyOriginContent,
  deleteOriginContent
}
