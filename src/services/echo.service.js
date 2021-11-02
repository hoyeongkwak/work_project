const url = require('url')

const echo = (req, res) => {
  const parseURL = url.parse(req.url, true)
  let echoMessage = ''
  if (Object.keys(parseURL.query).length === 0) {
    echoMessage = JSON.stringify(req.body)
  } else {
    echoMessage = JSON.stringify(parseURL.query)
  }
  res.send(echoMessage)
}

module.exports = { echo }
