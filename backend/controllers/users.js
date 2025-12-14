const bcrypt = require('bcrypt')
const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const fs = require('fs')
const { tokenExtractor } = require('../util/middleware')
const User = require('../models/user')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profile_pictures')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files format to upload')
    }
}).single('image')

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
})

router.put('/image', tokenExtractor, upload, async (req, res) => {
    console.log('This is the image file: ', req.file)
    const user = await User.findByPk(req.decodedToken.id)

    if (!user) {
        return res.status(400).json({ error: 'User not found'})
    }

    if (user.image) {
        const filename = path.basename(user.image)
        console.log('TÄMÄ ON FILENAME: ', filename)
        const old_path = path.join(__dirname, '..', 'profile_pictures', filename)
        console.log('Deleting: ', old_path)
        try {
            fs.unlinkSync(old_path)
        } catch (err) {
            console.log('Could not delete old file:', err.message)
        }
    }

    user.image = `/profile_pictures/${req.file.filename}`
    await user.save()
    res.json({ image: user.image })
})

module.exports = router