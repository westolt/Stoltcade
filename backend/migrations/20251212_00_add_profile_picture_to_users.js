const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('users', 'profile_picture', {
            type: DataTypes.TEXT,
            allowNull: true,
        })
    },
    down: async ({ context: queryInterface}) => {
        await queryInterface.removeColumn('users', 'profile_picture')
    }
}