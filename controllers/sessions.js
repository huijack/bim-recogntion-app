const Session = require('../models/Session')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllSessions = async (req, res) => {
  const { search, date, score, order } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  if (search) {
    queryObject.$or = [{ name: { $regex: search, $options: 'i' } }]
  }

  if (date) {
    const startDate = new Date(date)
    const endDate = new Date(
      new Date(date).setDate(new Date(date).getDate() + 1)
    )

    queryObject.createdAt = {
      $gte: startDate,
      $lt: endDate,
    }
  }

  const scoreSort = {
    highest: -1,
    lowest: 1,
  }

  const scoreSortValue = scoreSort[score] || scoreSort.highest

  const orderSort = {
    'a-z': 1,
    'z-a': -1,
  }

  const orderSortValue = orderSort[order] || orderSort['a-z']

  // Combine sorting logic into a single object
  const sortOptions = { score: scoreSortValue, name: orderSortValue }

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = 5
  const skip = (page - 1) * limit

  const totalSessions = await Session.countDocuments(queryObject)
  const pageCount = Math.ceil(totalSessions / limit)

  const sessions = await Session.find(queryObject)
    .sort(sortOptions) // Use combined sort options
    .skip(skip)
    .limit(limit)

  res
    .status(StatusCodes.OK)
    .json({ sessions, currentPage: page, pageCount, totalSessions })
}

const getSession = async (req, res) => {
  const {
    user: { userId },
    params: { id: sessionID },
  } = req

  const session = await Session.findOne({ _id: sessionID, createdBy: userId })

  if (!session) {
    throw new NotFoundError(`No session with id : ${sessionID}`)
  }
  res.status(StatusCodes.OK).json({ session })
}

const createSession = async (req, res) => {
  req.body.createdBy = req.user.userId
  const session = await Session.create(req.body)
  res.status(StatusCodes.CREATED).json({ session })
}

const updateSession = async (req, res) => {
  const {
    body: { score },
    user: { userId },
    params: { id: sessionID },
  } = req

  const session = await Session.findByIdAndUpdate(
    { _id: sessionID, createdBy: userId },
    { score, status: 'completed' },
    { new: true, runValidators: true }
  )

  if (!session) {
    throw new NotFoundError(`No session with id : ${sessionID}`)
  }

  res.status(StatusCodes.OK).json({ session })
}

const deleteSession = async (req, res) => {
  const {
    user: { userId },
    params: { id: sessionID },
  } = req

  const session = await Session.findByIdAndDelete({
    _id: sessionID,
    createdBy: userId,
  })

  if (!session) {
    throw new NotFoundError(`No session with id : ${sessionID}`)
  }

  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllSessions,
  createSession,
  getSession,
  deleteSession,
  updateSession,
}
