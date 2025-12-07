const express = require('express')
const cors = require('cors')
const middleware = require('./util/middleware')
const path = require('path')

const gamesRouter = require('./controllers/games')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/games', gamesRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

app.use(express.static('dist'))

app.use('/static-games', express.static(path.join(__dirname, 'games')))

module.exports = app