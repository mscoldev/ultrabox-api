const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config.databasepg');


const truck = sequelize.define('trucks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numberPlate: {
        type: DataTypes.STRING,
        required: true,
    },
    model: {
        type: DataTypes.STRING,
        required: true
    },
    color: {
        type: DataTypes.STRING,
        required: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: true
    }
})

module.exports = truck;