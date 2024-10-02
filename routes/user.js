const express = require('express')
const router = express.Router()
const {
  getCurrentUser,
  updateUser,
  updatePassword,
} = require('../controllers/user')
const { checkForTestUser } = require('../middleware/authentication')

router
  .route('/current-user')
  .get(getCurrentUser)
  .patch(checkForTestUser, updateUser)

router
  .route('/current-user/update-password')
  .patch(checkForTestUser, updatePassword)

module.exports = router
