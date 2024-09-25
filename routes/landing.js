const express = require('express')
const router = express.Router()
const { getLanding } = require('../controllers/landing')

router.route('/').get(getLanding)

module.exports = router
