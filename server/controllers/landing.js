const { landing, news } = require('../data')
const { StatusCodes } = require('http-status-codes')

const whySignMana = (req, res) => {
  res.status(StatusCodes.OK).json(landing)
}

const newsTrends = (req, res) => {
  res.status(StatusCodes.OK).json(news)
}

module.exports = { whySignMana, newsTrends }
