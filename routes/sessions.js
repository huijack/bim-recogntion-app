const express = require('express')
const router = express.Router()

const {
  getAllSessions,
  createSession,
  getSession,
  updateSession,
  deleteSession,
} = require('../controllers/sessions')
const { checkForTestUser } = require('../middleware/authentication')

router.route('/').get(getAllSessions).post(createSession)
router
  .route('/:id')
  .get(getSession)
  .patch(updateSession)
  .delete(checkForTestUser, deleteSession)

module.exports = router
