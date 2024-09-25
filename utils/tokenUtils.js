const jwt = require('jsonwebtoken')

const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_LIFETIME)
  return decoded
}

module.exports = verifyJWT
