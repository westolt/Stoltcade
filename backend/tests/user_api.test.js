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

beforeEach(async () => {
    await User.destroy({ where: {} })

    for (const user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    await User.create({
      username: user.username,
      passwordHash,
      image: null,
      imagePublicId: null
    })
  }
})


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

after(async () => {
  await sequelize.close()
})
