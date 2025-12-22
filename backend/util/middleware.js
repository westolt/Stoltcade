const logger = require('./logger')
const jwt = require('jsonwebtoken')
const path = require('path')
const multer = require('multer')
const { SECRET } = require('../util/config')
const { User } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  }
  next()
}

const userExtractor = async (req, res, next) => {
  try {
    if (!req.decodedToken) {
      return res.status(401).json({ error: 'token missing' })
    }

    const user = await User.findByPk(req.decodedToken.id)

    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb(new Error('Give proper files format to upload'))
    }
}).single('image')

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.message === 'Give proper files format to upload') {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.errors[0].message })
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Username must be unique' })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  upload,
  errorHandler
}