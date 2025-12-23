require('dotenv').config()

const PORT = process.env.PORT
const SECRET = process.env.NODE_ENV === 'test'
    ? process.env.TEST_SECRET
    : process.env.NODE_ENV === 'development'
      ? process.env.DEV_SECRET
      : process.env.SECRET

const DATABASE_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.NODE_ENV === 'development'
      ? process.env.DEV_DATABASE_URL
      : process.env.DATABASE_URL

module.exports = {
    DATABASE_URL,
    PORT,
    SECRET,
}