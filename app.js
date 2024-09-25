require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')

// connectDB
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/auth')
const landingRouter = require('./routes/landing')
const sessionsRouter = require('./routes/sessions')
const userRouter = require('./routes/user')

// public
const path = require('path')

// error handler & middleware
const { authenticateUser } = require('./middleware/authentication')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// cors
app.use(cors())
app.use(express.static(path.resolve(__dirname, './public')))
app.use(cookieParser())
app.use(express.json())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(mongoSanitize())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/landing', landingRouter)
app.use('/api/v1/sessions', authenticateUser, sessionsRouter)
app.use('/api/v1/users', authenticateUser, userRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

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
    process.exit(1)
  }
}

start()
