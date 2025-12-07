const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: {
            exclude: ['passwordHash']
        }
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    const { username, password } = req.body

    if (!password || password.length < 3) {
    return res.status(400).json({ error: 'Password too short' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
        username,
        passwordHash,
    })

    res.json(user)
})

module.exports = router