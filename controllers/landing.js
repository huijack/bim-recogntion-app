const { landing, news } = require('../data')
const { StatusCodes } = require('http-status-codes')

const getLanding = (req, res) => {
  res.status(StatusCodes.OK).json({ reasons: landing, news })
}

module.exports = { getLanding }
