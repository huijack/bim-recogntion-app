require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const app = express()
const landing = require('./routes/landing')
const sessions = require('./routes/sessions')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')

// cors
app.use(cors())

// middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`<h1>SignMana API</h1><a href="/api/v1/sessions">sessions route</a>`)
})

app.use('/api/v1/landing', landing)
app.use('/api/v1/sessions', sessions)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

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
