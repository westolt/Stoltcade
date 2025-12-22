const express = require('express')
const middleware = require('./util/middleware')
const path = require('path')

const gamesRouter = require('./controllers/games')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const scoreRouter = require('./controllers/scores')

const app = express()

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/games', gamesRouter)
app.use('/api/scores', scoreRouter)

app.use('/static-games', express.static('games'))
app.use(express.static('dist'))

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use(middleware.errorHandler)

module.exports = app