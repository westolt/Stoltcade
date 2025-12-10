const Game = require('./game')
const User = require('./user')
const Score = require('./score')

User.hasMany(Score, { foreignKey: 'user_id' })
Score.belongsTo(User, { foreignKey: 'user_id' })

Game.hasMany(Score, { foreignKey: 'game_id' })
Score.belongsTo(Game, { foreignKey: 'game_id' })

module.exports = {
    Game, User, Score
}