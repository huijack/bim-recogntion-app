const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'must provide a session name'],
      trim: true,
      maxlength: [20, 'cannot be more than 20 characters'],
    },
    textOutputs: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Session', SessionSchema)
