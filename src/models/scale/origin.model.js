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
        required: true,
        unique: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
})

module.exports = origin;