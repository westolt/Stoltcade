const router = require('express').Router()

const { Game } = require('../models/index')

router.get('/', async (req, res) => {
  const games = await Game.findAll()
  res.json(games)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const game = await Game.create(req.body)
  res.json(game)
})

const gameFinder = async (req, res, next) => {
    req.game = await Game.findByPk(req.params.id)
    next()
}

router.get('/:id', gameFinder, async (req, res) => {
  if (req.game) {
    res.json(req.game)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', gameFinder, async (req, res) => {
  if (req.game) {
    console.log(`Deleting game ${req.game}...`)
    await req.game.destroy()
    res.status(204).end()
  } else {
    console.log('Game not found')
    res.status(404).end()
  }
})

module.exports = router