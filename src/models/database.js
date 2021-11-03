const connect = require('./connection')
const pool = connect.postgresql

async function query (text, params) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (err) {
    console.log(err.detail)
    throw new Error('500:0002')
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

// User Query
async function findUserById (options) {
  const { userId } = options
  console.log(userId)
  const sql = 'SELECT user_id, user_name FROM users WHERE users.user_id = $1'
  const result = await query(sql, [userId])
  if (result.rowCount === 0) {
    throw new Error('404:0001')
  } else {
    return result.rows[0]
  }
}
async function findUserByName (options) {
  const { userName } = options
  const sql = 'SELECT user_id, user_name FROM users WHERE users.user_name = $1'
  const result = await query(sql, [userName])
  if (result.rowCount === 0) {
    throw new Error('404:0001')
  } else {
    return result.rows[0]
  }
}
async function findUserTranslateContentById (options) {
  const { userId } = options
  const sql = 'SELECT origin_content, trans_content from translation INNER JOIN users ON users.user_id = translation.user_id INNER JOIN origin ON origin.origin_id = translation.origin_id WHERE users.user_id = $1 AND deleted_at IS NULL'
  const result = await query(sql, [userId])
  if (result.rowCount === 0) {
    throw new Error('404:0001')
  } else {
    return result.rows
  }
}
async function createUser (options) {
  const { userName } = options
  const sql = 'INSERT INTO users (user_name) VALUES ($1) RETURNING user_Id'
  const result = await query(sql, [userName])
  return result
}
async function updateUser (options) {
  const { userId, userName } = options
  const sql = 'UPDATE users SET user_name = $1 WHERE user_id = $2 RETURNING *'
  const result = await query(sql, [userName, userId])
  if (result.rowCount === 0) {
    throw new Error('404:0001')
  } else {
    return result.rows[0]
  }
}
async function deleteUser (options) {
  const { userId } = options
  const sql = 'DELETE FROM users WHERE user_id = $1'
  const result = await query(sql, [userId])
  console.log(result)
  return result
}

async function getAllInformation () {
  const sql = 'SELECT origin_content, lang_code, trans_content, user_name AS trans_user FROM translation t INNER JOIN users ON users.user_id = t.user_id INNER JOIN origin ON origin.origin_id = t.origin_id INNER JOIN language ON language.lang_id = t.lang_id'
  const result = await query(sql)
  return result
}
// origin
async function createOriginContent (options) {
  const { originContent } = options
  const sql = 'INSERT INTO origin (origin_content) VALUES ($1) RETURNING *'
  const result = await query(sql, [originContent])
  if (result.rowCount === 0) {
    throw new Error('404:0004')
  } else {
    return result.rows[0]
  }
}
async function findOriginContentById (options) {
  const { originContentId } = options
  // const sql = 'SELECT origin_content, trans_content, lang_id FROM translation INNER JOIN origin ON origin.origin_id = translation.origin_id WHERE origin.origin_id = $1 AND deleted_at IS NULL'
  const sql = 'SELECT origin_id, origin_content FROM origin WHERE origin.origin_id = $1'
  const result = await query(sql, [originContentId])
  if (result.rowCount === 0) {
    throw new Error('404:0004')
  } else {
    return result.rows[0]
  }
}
async function findOriginContentIdByContent (options) {
  const { originContent } = options
  // const sql = 'SELECT origin_content, trans_content, lang_id FROM translation INNER JOIN origin ON origin.origin_id = translation.origin_id WHERE origin.origin_content = $1 AND deleted_at IS NULL'
  const sql = 'SELECT origin_id, origin_content FROM origin WHERE origin.origin_content = $1'
  const result = await query(sql, [originContent])
  if (result.rowCount === 0) {
    throw new Error('404:0004')
  } else {
    return result.rows[0]
  }
}

async function findDuplicateOriginContentByContent (options) {
  const { originContent } = options
  // const sql = 'SELECT origin_content, trans_content, lang_id FROM translation INNER JOIN origin ON origin.origin_id = translation.origin_id WHERE origin.origin_content = $1 AND deleted_at IS NULL'
  const sql = 'SELECT origin_id, origin_content FROM origin WHERE origin.origin_content = $1'
  const result = await query(sql, [originContent])
  if (result.rowCount >= 0) {
    throw new Error('404:0004')
  } else {
    return result.rows[0]
  }
}
async function updateOriginContent (options) {
  const { originContentId, originContent } = options
  const sql = 'UPDATE origin SET origin_content = $1 WHERE origin_id = $2 RETURNING *'
  const result = await query(sql, [originContent, originContentId])
  if (result.rowCount === 0) {
    throw new Error('404:0003')
  } else {
    return result.rows[0]
  }
}

async function deleteOriginContent (options) {
  const { originContentId } = options
  const sql = 'DELETE FROM origin WHERE origin_id = $1'
  const result = await query(sql, [originContentId])
  if (result.rowCount === 0) {
    throw new Error('404:0003')
  }
}
// translate
async function createTranslateContent (options) {
  const { userId, originContentId, translateContent, langId } = options
  const sql = 'INSERT INTO translation (origin_id, user_id, trans_content, lang_id) VALUES ($1, $2, $3, $4) RETURNING origin_id, user_id, trans_content, lang_id'
  const result = await query(sql, [userId, originContentId, translateContent, langId])
  return result.rows[0]
}
async function findTranslateContentByOriginContent (options) {
  const { originContent } = options
  const sql = 'SELECT origin_content, trans_content, lang_id FROM translation INNER JOIN origin ON origin.origin_id = translation.origin_id WHERE origin.origin_content = $1 AND deleted_at IS NULL'
  const result = await query(sql, [originContent])
  return result
}
async function findTranslateContentByOriginId (options) {
  const { originContentId } = options
  console.log(originContentId)
  const sql = 'SELECT origin.origin_id, origin_content, trans_content, lang_id FROM translation INNER JOIN origin ON origin.origin_id = translation.origin_id WHERE origin.origin_id = $1 AND deleted_at IS NULL'
  const result = await query(sql, [originContentId])
  if (result.rowCount === 0) {
    throw new Error('404:0004')
  } else {
    return result.rows
  }
}
async function findTranslateById (options) {
  const { translateId } = options
  const sql = 'SELECT trans_content, lang_id FROM translation WHERE translation.trans_id = $1 AND deleted_at IS NULL'
  const result = await query(sql, [translateId])
  if (result.rowCount === 0) {
    throw new Error('404:0003')
  } else {
    return result.rows[0]
  }
}
async function findTranslateByConent (options) {
  const { translateContent } = options
  const sql = 'SELECT trans_content, lang_id FROM translation WHERE translation.trans_content = $1 AND deleted_at IS NULL'
  const result = await query(sql, [translateContent])
  if (result.rowCount === 0) {
    throw new Error('404:0003')
  } else {
    return result.rows[0]
  }
}
async function findDuplicateTranslateContentByContent (options) {
  const { translateContent } = options
  const sql = 'SELECT trans_content, lang_id FROM translation WHERE translation.trans_content = $1 AND deleted_at IS NULL'
  const result = await query(sql, [translateContent])
  if (result.rowCount >= 1) {
    throw new Error('404:0003')
  } else {
    return result.rows[0]
  }
}

async function updateTranslateContent (options) {
  const { translateId, translateContent } = options
  const sql = 'UPDATE translation SET trans_content = $1 WHERE trans_id = $2 RETURNING trans_id, trans_content'
  const result = await query(sql, [translateContent, translateId])
  if (result.rowCount === 0) {
    throw new Error('404:0003')
  } else {
    return result.rows[0]
  }
}
async function deleteTranslateContent (options) {
  const { translateId } = options
  const sql = 'UPDATE translation SET deleted_at = now() WHERE trans_id = $1 RETURNING *'
  const result = await query(sql, [translateId])
  if (result.rowCount === 0) {
    throw new Error('404:0003')
  } else {
    return result.rows[0]
  }
}

// Temp(Not Use!!)
async function restoreContent (options) {
  const { transId } = options
  const sql = 'UPDATE translation SET deleted_at = NULL WHERE trans_id = $1 RETURNING *'
  const result = await query(sql, [transId])
  return result
}

module.exports = {
  getUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllInformation,
  findUserTranslateContentById,
  findOriginContentIdByContent,
  isLangId,
  createTranslateContent,
  updateTranslateContent,
  deleteTranslateContent,
  restoreContent,
  createOriginContent,
  updateOriginContent,
  deleteOriginContent,
  findTranslateById,
  findOriginContentById,
  findUserByName,
  findTranslateContentByOriginContent,
  findTranslateContentByOriginId,
  findTranslateByConent,
  findDuplicateTranslateContentByContent,
  findDuplicateOriginContentByContent
}
