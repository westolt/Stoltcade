const bcrypt = require('bcrypt')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const cloudinary = require('../util/cloudinary')
const { tokenExtractor, upload } = require('../util/middleware')
const User = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: {
            exclude: ['passwordHash']
        }
    })
    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {
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

        const userForToken = {
            username: user.username,
            id: user.id
        }

        const token = jwt.sign(userForToken, SECRET)

        res.status(200).json({
            token,
            username: user.username,
            image: user.image
        })
    } catch (error) {
        next(error)
    }
})

router.put('/image', tokenExtractor, upload, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const folderName = process.env.NODE_ENV === 'test'
        ? 'test'
        : process.env.NODE_ENV === 'development'
            ? 'dev'
            : 'profile_pictures'

    if (!user) {
        return res.status(400).json({ error: 'User not found'})
    }

    console.log('This is publicId: ', user.imagePublicId)

    if(user.imagePublicId) {
        await cloudinary.uploader.destroy(user.imagePublicId)
    }

    const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
        folder: folderName
    })

    user.imagePublicId = result.public_id
    user.image = result.secure_url

    await user.save()
    res.json({ image: user.image, imagePublicId: user.imagePublicId })
})

module.exports = router