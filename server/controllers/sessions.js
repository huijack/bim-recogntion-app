const Session = require('../models/Session')

const getAllSessions = async (req, res) => {
  const sessions = await Session.find({})
  res.status(200).json({ sessions })
}

const createSession = async (req, res) => {
  const session = await Session.create(req.body)
  res.status(201).json({ session })
}

const getSession = async (req, res, next) => {
  const { id: sessionID } = req.params
  const session = await Session.findOne({ _id: sessionID })

  if (!session) {
    return next({ status: 404, message: 'Session not found' })
  }
  res.status(200).json({ session })
}

const updateSession = async (req, res, next) => {
  const { id: sessionID } = req.params
  const session = await Session.findOneAndUpdate({ _id: sessionID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!session) {
    return next({ status: 404, message: 'Session not found' })
  }
  res.status(200).json({ session })
}

const deleteSession = async (req, res) => {
  const { id: sessionID } = req.params
  const session = await Session.findOneAndDelete({ _id: sessionID })

  if (!session) {
    return next({ status: 404, message: 'Session not found' })
  }
  res.status(200).json({ session })
}

module.exports = {
  getAllSessions,
  createSession,
  getSession,
  deleteSession,
  updateSession,
}
