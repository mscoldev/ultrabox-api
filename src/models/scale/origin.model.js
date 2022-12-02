const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config.databasepg');


const origin = sequelize.define('origins', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    originName: {
        type: DataTypes.STRING,
        required: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: true
    }
})

module.exports = origin;