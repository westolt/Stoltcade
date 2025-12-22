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
        cb('Give proper files format to upload')
    }
}).single('image')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.errors[0].message })
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: 'Username must be unique' })
  } else if (error instanceof multer.MulterError || typeof error === 'string') {
    return response.status(400).json({ error })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  upload,
  errorHandler
}