const app = require('./app')
const config = require('./configs/config')
const postgresql = require('./models/connection')
postgresql.connect().catch(console.err)

app.listen(config.port, () => {
  console.log(`server is lalala localhost:${config.port}`)
})
