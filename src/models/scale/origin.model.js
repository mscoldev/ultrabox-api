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
        unique: { args: true, msg: 'El nombre del origen ya se encuentra registrado. El nombre de origen debe ser unico' }
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
})

module.exports = origin;