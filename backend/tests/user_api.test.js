const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const { sequelize } = require('../util/db')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const fakeUploader = {
  destroy: async () => {},
  upload: async () => ({ public_id: 'mockId', secure_url: 'mockUrl' })
}

const cloudinary = require('../util/cloudinary')
cloudinary.uploader = fakeUploader

const initialUsers = [
    {
        id: 1,
        username: 'will',
        passwordHash: 'asdf',
        image: null,
        imagePublicId: null
    },
    {
        id: 2,
        username: 'venla',
        passwordHash: 'zxcv',
        image: null,
        imagePublicId: null
    }
]

beforeEach(async () => {
    await User.destroy({ where: {} })
    await User.create(initialUsers[0])
    await User.create(initialUsers[1])
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

    users.forEach(user => {
        assert.ok(user.id)
        assert.ok(user.username)
    })
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

after(async () => {
  await sequelize.close()
})
