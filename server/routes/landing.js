const express = require('express')
const router = express.Router()
const { whySignMana, newsTrends } = require('../controllers/landing')

router.route('/whySignMana').get(whySignMana)
router.route('/newsAndTrends').get(newsTrends)

module.exports = router
