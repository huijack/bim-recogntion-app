const notFound = (err, req, res, next) => {
  if (err.status === 404) {
    return res.status(404).json({ msg: err.message })
  }
}

module.exports = notFound
