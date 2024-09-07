const Session = require('../models/Session')

const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find({})
    res.status(200).json({ sessions })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body)
    res.status(201).json({ session })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getSession = async (req, res) => {
  try {
    const { id: sessionID } = req.params
    const session = await Session.findOne({ _id: sessionID })
    if (!session) {
      return res.status(404).json({ msg: `No session with ID: ${sessionID}` })
    }
    res.status(200).json({ session })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateSession = async (req, res) => {
  try {
    const { id: sessionID } = req.params
    const session = await Session.findOneAndUpdate(
      { _id: sessionID },
      req.body,
      { new: true, runValidators: true }
    )
    if (!session) {
      return res.status(404).json({ msg: `No session with ID: ${sessionID}` })
    }
    res.status(200).json({ session })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteSession = async (req, res) => {
  try {
    const { id: sessionID } = req.params
    const session = await Session.findOneAndDelete({ _id: sessionID })
    if (!session) {
      return res.status(404).json({ msg: `No session with ID: ${sessionID}` })
    }
    res.status(200).json({ session })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllSessions,
  createSession,
  getSession,
  deleteSession,
  updateSession,
}
