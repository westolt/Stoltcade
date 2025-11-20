const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const { sequelize } = require('../util/db')
const supertest = require('supertest')
const app = require('../app')
const Game = require('../models/game')

const api = supertest(app)

const initialGames = [
  {
    name: 'PeriodicPairs',
    description: 'A quiz game about the periodic table.',
    url: '/static-games/PeriodicPairs/index.html',
    thumbnail: '/static-games/PeriodicPairs/game1.png',
    how_to_play: 'Type the full name of the chemical element that matches the symbol shown on the screen and click Submit.'
  },
  {
    name: 'Test',
    description: 'This is a test',
    url: 'static-games/Test/index.html',
    thumbnail: 'static-games/Test/photo.png',
    how_to_play: 'This is only a test'
  },
  {
    name: 'Typing game',
    description: 'Type fast',
    url: 'static-games/Typing_game/index.html',
    thumbnail: 'static-games/Typing_game/photo.png',
    how_to_play: 'Type the text on the screen'
  },
]

beforeEach(async () => {
  await Game.destroy({ where: {} })
  await Game.create(initialGames[0])
  await Game.create(initialGames[1])
  await Game.create(initialGames[2])
})

test('games are returned as json', async () => {
  await api
    .get('/api/games')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all games are returned', async () => {
    const response = await api.get('/api/games')

    assert.strictEqual(response.body.length, initialGames.length)
})

test('a specific games is within the returned games', async () => {
  const response = await api.get('/api/games')

  const contents = response.body.map(e => e.name)
  assert(contents.includes('Typing game'))
})

after(async () => {
  await sequelize.close()
})