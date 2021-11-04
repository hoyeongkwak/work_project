const echo = (req, res) => {
  const options = { ...req.body, ...req.query }
  res.send(options)
}

module.exports = { echo }
