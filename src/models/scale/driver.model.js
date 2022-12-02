const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config.databasepg');


const driver = sequelize.define('drivers', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    nit: {
        type: DataTypes.STRING,
        required: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: true
    }
})

module.exports = driver;