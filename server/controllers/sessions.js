const Session = require('../models/Session')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllSessions = async (req, res) => {
  const sessions = await Session.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )
  res.status(StatusCodes.OK).json({ sessions, count: sessions.length })
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
