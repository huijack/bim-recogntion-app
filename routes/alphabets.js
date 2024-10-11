const express = require('express')
const router = express.Router()
const { getAllAlphabets, getAlphabet } = require('../controllers/alphabets')

router.route('/').get(getAllAlphabets)
router.route('/:id').get(getAlphabet)

module.exports = router
