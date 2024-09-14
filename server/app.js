require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const app = express()

// connectDB
const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')
// routers
const authRouter = require('./routes/auth')
const landingRouter = require('./routes/landing')
const sessionsRouter = require('./routes/sessions')
const profileRouter = require('./routes/profile')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// cors
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`<h1>SignMana API</h1>`)
})

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/landing', landingRouter)
app.use('/api/v1/sessions', authenticateUser, sessionsRouter)
app.use('/api/v1/profile', authenticateUser, profileRouter)

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
