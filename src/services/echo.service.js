const url = require('url')

const echo = (req, res) => {
  const parseURL = url.parse(req.url, true)
  const echoMessage = ''
  // if (Object.keys(parseURL.query).length === 0) {
  //   echoMessage = JSON.stringify(req.body)
  // } else {
  //   echoMessage = JSON.stringify(req.body) + JSON.stringify(parseURL.query)
  // }
  const options = { ...req.body, ...req.query }
  console.log(req.query)
  console.log(req.body)
  res.send({ ...req.body, ...req.query })
}

module.exports = { echo }
