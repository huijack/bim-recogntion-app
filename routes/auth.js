const express = require('express')
const router = express.Router()
const { login, register, logout } = require('../controllers/auth')

const rateLimiter = require('express-rate-limit')

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
})

router.post('/login', apiLimiter, login)
router.post('/register', apiLimiter, register)
router.get('/logout', logout)

module.exports = router
