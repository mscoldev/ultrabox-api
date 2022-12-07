const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config.databasepg');


const destination = sequelize.define('destinations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
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

module.exports = destination;