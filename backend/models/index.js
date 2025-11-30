const Game = require('./game')
const User = require('./user')

Game.sync()
User.sync()

module.exports = {
    Game, User
}