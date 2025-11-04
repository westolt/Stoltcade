require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

app.use(express.json())
class Game extends Model {}

Game.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT
  },
  thumbnail: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
    modelName: 'game'
})

app.get('/api/games', async (req, res) => {
  const games = await Game.findAll()
  res.json(games)
})

app.get('/api/games/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id)
  if (game) {
    res.json(game)
  } else {
    res.status(404).end()
  }
})

app.post('/api/games', async (req, res) => {
  console.log(req.body)
  const game = await Game.create(req.body)
  res.json(game)
})

app.delete('/api/games/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id)
  if (game) {
    console.log(`Deleting game ${game}...`)
    await game.destroy()
    res.status(204).end()
  } else {
    console.log('Game not found')
    res.status(404).end()
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})