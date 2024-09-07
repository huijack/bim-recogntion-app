const express = require('express')
const router = express.Router()

const {
  getAllSessions,
  createSession,
  getSession,
  updateSession,
  deleteSession,
} = require('../controllers/sessions')

router.route('/').get(getAllSessions).post(createSession)
router.route('/:id').get(getSession).patch(updateSession).delete(deleteSession)

module.exports = router
