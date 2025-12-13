const bcrypt = require('bcrypt')
const router = require('express').Router()
const multer = require('multer')
const path = require('path')
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

    res.json(user)
})

router.put('/:id/image', tokenExtractor, upload, async (req, res) => {
    console.log('This is the image file: ', req.file)
    const user = await User.findByPk(req.decodedToken.id)

    if (!user) {
        return res.status(400).json({ error: 'User not found'})
    }

    if (user.image) {
        const old_path = path.join(__dirname, '..', user.image)
        fs.unlink(old_path, function(err){
            if(err) {
                console.log(err.message)
            } else {
                console.log('File deleted')
            }
        })
    }

    user.image = `/profile_pictures/${req.file.filename}`
    await user.save()
    res.json({ image: user.image })
})

module.exports = router