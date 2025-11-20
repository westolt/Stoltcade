const express = require('express')
const cors = require('cors')
const path = require('path')

const gamesRouter = require('./controllers/games')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/games', gamesRouter)

app.use(express.static('dist'))

app.use('/static-games', express.static(path.join(__dirname, 'games')))

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app