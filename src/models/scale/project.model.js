const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config.databasepg');


const project = sequelize.define('projects', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectName: {
        type: DataTypes.STRING,
        required: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: true
    }
})

module.exports = project;