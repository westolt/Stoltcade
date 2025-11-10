const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const gamesRouter = require('./controllers/games')

app.use(cors())

app.use(express.json())

app.use('/api/games', gamesRouter)

app.use(express.static('dist'))

app.use('/games', express.static(path.join(__dirname, 'games')))

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()