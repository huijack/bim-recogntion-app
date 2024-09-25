const express = require('express')
const router = express.Router()
const { getCurrentUser, updateUser } = require('../controllers/user')
const { checkForTestUser } = require('../middleware/authentication')

router
  .route('/current-user')
  .get(getCurrentUser)
  .patch(checkForTestUser, updateUser)

module.exports = router
