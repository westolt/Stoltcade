require('dotenv').config()
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { sequelize } = require('../util/db')
const { SECRET } = require('../util/config')
const User = require('../models/user')
const Game = require('../models/game')

const api = supertest(app)

const cloudinary = require('../util/cloudinary')
cloudinary.uploader = {
  destroy: async () => {},
  upload: async () => ({ public_id: 'mockId', secure_url: 'mockUrl' })
}

const initialUsers = [
    {
        username: 'will',
        password: '123'
    },
    {
        username: 'venla',
        password: '123'
    }
]

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
    await User.destroy({ where: {} })
    await Game.destroy({ where: {} })

    for (const user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    await User.create({
      username: user.username,
      passwordHash,
      image: null,
      imagePublicId: null
    })
    }

    for (const game of initialGames) {
    await Game.create(game)
    }
})

// User tests

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all users are returned', async () => {
    const response = await api.get('/api/users')

    const users = response.body
    assert.strictEqual(users.length, initialUsers.length)
})

test('creating a new user returns token and username', async () => {
  const newUser = { username: 'testguy', password: 'testpassword' }
  
  const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
  assert.ok(response.body.token, 'Token is missing')
  assert.strictEqual(response.body.username, newUser.username)
})

test('creating user with short password fails', async () => {
  const newUser = { username: 'testguy', password: '12' }
  
  await api.post('/api/users').send(newUser).expect(400)
})

test('creating user without password fails', async () => {
  const newUser = { username: 'testguy' }
  
  await api.post('/api/users').send(newUser).expect(400)
})

test('uploading profile image updates user', async () => {
  const user = await User.findOne({ where: { username: 'will' } })
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET)
  
  const res = await api.put('/api/users/image')
    .set('Authorization', `Bearer ${token}`)
    .attach('image', Buffer.from('fakeimagecontent'), { filename: 'test.png', contentType: 'image/png' })
    .expect(200)

  assert.strictEqual(res.body.image, 'mockUrl')
  assert.strictEqual(res.body.imagePublicId, 'mockId')
})

test('uploading wrong file type gives proper error message', async () => {
  const user = await User.findOne({ where: { username: 'will' } })
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET)
  
  const res = await api.put('/api/users/image')
    .set('Authorization', `Bearer ${token}`)
    .attach('image', Buffer.from('fakeimagecontent'), { filename: 'test.txt', contentType: 'text/plain' })
    .expect(400)

  assert.strictEqual(res.body.error, 'Give proper files format to upload')
})

// Login tests

test('user can login successfully', async () => {
    const user = { username: 'will', password: '123' }

    const res = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const decoded = jwt.verify(res.body.token, SECRET)

    assert.strictEqual(decoded.username, user.username)
    assert.strictEqual(res.body.username, user.username)
})

test('wrong password gives proper error message', async () => {
    const user = { username: 'will', password: 'wrongpassword' }

    const res = await api
        .post('/api/login')
        .send(user)
        .expect(401)

    assert.strictEqual(res.body.error, 'Invalid username or password')
})

// Game tests

test('games are returned as json', async () => {
  await api
    .get('/api/games')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all games are returned', async () => {
    const response = await api.get('/api/games')

    const games = response.body
    assert.strictEqual(games.length, initialGames.length)

    games.forEach(game => {
      assert.ok(game.name)
      assert.ok(game.description)
      assert.ok(game.url)
      assert.ok(game.how_to_play)
    })
})

test('a specific games is within the returned games', async () => {
  const response = await api.get('/api/games')

  const contents = response.body.map(e => e.name)
  assert(contents.includes('Typing game'))
})

test('specific game can be retrieved by id', async () => {
  const game = await Game.findOne({ where: { name: 'PeriodicPairs' } })
  const response = await api.get(`/api/games/${game.id}`).expect(200)
  assert.strictEqual(response.body.name, 'PeriodicPairs')
})

test('getting non-existing game returns 404', async () => {
  await api.get('/api/games/9999').expect(404)
})

after(async () => {
  await sequelize.close()
})
