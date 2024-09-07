const express = require('express')
const cors = require('cors')
const app = express()
const landing = require('./routes/landing')
const sessions = require('./routes/sessions')
const connectDB = require('./db/connect')
require('dotenv').config()

// cors
app.use(cors())

// middleware
app.use(express.json())

app.use('/api/v1/landing', landing)
app.use('/api/v1/sessions', sessions)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
