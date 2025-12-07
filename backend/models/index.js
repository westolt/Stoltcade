const Game = require('./game')
const User = require('./user')
const Score = require('./score')

User.hasMany(Score)
Score.belongsTo(User)

Game.hasMany(Score)
Score.belongsTo(Game)

module.exports = {
    Game, User, Score
}