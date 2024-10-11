const { alphabets } = require('../data')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllAlphabets = (req, res) => {
  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = 10
  const skip = (page - 1) * limit

  const totalAlphabets = alphabets.length
  const pageCount = Math.ceil(totalAlphabets / limit)

  const results = alphabets.slice(skip, skip + limit)

  res
    .status(StatusCodes.OK)
    .json({ alphabets: results, totalAlphabets, pageCount, currentPage: page })
}

const getAlphabet = (req, res) => {
  const { id } = req.params
  const alphabet = alphabets.find(
    (alphabet) => alphabet.id === id.toLowerCase()
  )

  if (!alphabet) {
    throw new NotFoundError(`No alphabet with id : ${id}`)
  }

  res.status(StatusCodes.OK).json({ alphabet })
}

module.exports = { getAllAlphabets, getAlphabet }
