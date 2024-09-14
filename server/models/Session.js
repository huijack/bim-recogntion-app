const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a session name'],
      trim: true,
      maxlength: 20,
    },
    score: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Session', SessionSchema)
