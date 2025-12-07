const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Game extends Model {}

Game.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT
  },
  thumbnail: {
    type: DataTypes.TEXT
  }, 
  howToPlay: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'game'
})

module.exports = Game