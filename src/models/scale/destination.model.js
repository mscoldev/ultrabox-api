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
        required: { args: true, msg: 'El nombre del destino es requerido.' },
        unique: { args: true, msg: 'El nombre de destino ya se encuentra registrado. El nombre de destino debe se unico' }
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
})

module.exports = destination;