const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getProfile = async (req, res) => {
  const {
    user: { userId },
  } = req

  const user = await User.findById(userId)

  if (!user) {
    throw new NotFoundError(`No user with id : ${userId}`)
  }
  res.status(StatusCodes.OK).json({ user })
}

const updateProfile = async (req, res) => {
  const {
    body: { username, email, dateOfBirth, additionalNotes },
    user: { userId },
  } = req

  if (username === '' || email === '') {
    throw new BadRequestError('Name and email fields cannot be empty')
  }

  let user = await User.findById(userId)

  // update name, email and additional notes
  user.username = username
  user.email = email
  user.additionalNotes = additionalNotes || ''

  if (dateOfBirth !== undefined) {
    user.dateOfBirth = dateOfBirth || null
  }

  // save newly updated user
  await user.save()

  res.status(StatusCodes.OK).json({
    user: {
      username: user.username,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      additionalNotes: user.additionalNotes,
    },
  })
}

module.exports = { getProfile, updateProfile }
