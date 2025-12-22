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

const initialUsers = [
    {
        username: 'teemu',
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

test('user can login successfully', async () => {
    const user = { username: 'teemu', password: '123' }

    const res = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const decoded = jwt.verify(res.body.token, SECRET)
    console.log('This is decoded: ', decoded)
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
