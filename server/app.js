const express = require('express')
const app = express()
const { landing, news } = require('./data')

app.get('/api/landing', (req, res) => {
  res.json(landing)
})

app.get('/api/news', (req, res) => {
  res.json(news)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000...')
})
