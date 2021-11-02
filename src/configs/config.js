module.exports = {
  port: 10107,
  postgresql: {
    user: process.env.USER,
    host: '127.0.0.1',
    database: 'expressapi',
    password: 'password',
    port: 5432
  }
}
