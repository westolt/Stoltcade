const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('users', 'image_public_id', {
            type: DataTypes.STRING,
            allowNull: true,
        })
    },
    down: async ({ context: queryInterface}) => {
        await queryInterface.removeColumn('users', 'image_public_id')
    }
}