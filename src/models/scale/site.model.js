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
        required: { args: true, msg: 'El nombre del sitio es requerido.' },
        unique: { args: true, msg: 'El nombre del sitio ya se encuentra registrado. El nombre de sitio debe ser unico' }
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
})

module.exports = site;