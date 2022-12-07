const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config.databasepg');


const site = sequelize.define('sites', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
})

module.exports = site;