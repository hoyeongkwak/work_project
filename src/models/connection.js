const { Pool } = require('pg')
const config = require('../configs/config')
const postgresql = new Pool(config.postgresql)

async function connect () {
  try {
    await postgresql.connect()
  } catch (err) {
    throw new Error('500:0001')
  }
}

async function disconnect () {
  try {
    await postgresql.end()
  } catch (err) {
    throw new Error('500:0001')
  }
}
module.exports = {
  connect,
  disconnect,
  postgresql
}
