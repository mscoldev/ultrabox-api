const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config.databasepg');


const register = sequelize.define('registers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        required: true,
    },
    serialScale: {
        type: DataTypes.INTEGER,
        required: true
    },
    serialLog: {
        type: DataTypes.INTEGER,
        required: true
    },
    qty: {
        type: DataTypes.DECIMAL(10, 3),
        required: true
    },
    groosWeigth: {
        type: DataTypes.DECIMAL(10, 3),
        required: true
    },
    netWeigth: {
        type: DataTypes.DECIMAL(10, 3),
        required: true
    },
    tare: {
        type: DataTypes.DECIMAL(10, 3),
        required: true
    },
    status: {
        type: DataTypes.STRING,
        required: true
    },
    dateTara: {
        type: DataTypes.DATE,
        required: true,
    },
    dateNeto: {
        type: DataTypes.DATE,
        required: true,
    },
    error: {
        type: DataTypes.STRING,
        required: true
    },
    userRecorder: {
        type: DataTypes.STRING,
        required: true
    },
    _idProduct: {
        type: DataTypes.INTEGER,
        required: true
    },
    _idDriver: {
        type: DataTypes.INTEGER,
        required: true
    },
    _idTruck: {
        type: DataTypes.INTEGER,
        required: true
    },
    _idClient: {
        type: DataTypes.INTEGER,
        required: true
    },
    _idOrigin: {
        type: DataTypes.INTEGER,
        required: true
    },
    _idProject: {
        type: DataTypes.INTEGER,
        required: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: true
    }
})

module.exports = register;