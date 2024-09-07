const { landing, news } = require('../data')

const whySignMana = (req, res) => {
  res.status(200).json(landing)
}

const newsTrends = (req, res) => {
  res.status(200).json(news)
}

module.exports = { whySignMana, newsTrends }
