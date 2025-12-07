const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Score extends Model {}

Score.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'score'
})

module.exports = Score