const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config.databasepg');


const product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: DataTypes.STRING,
        required: true,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: true
    }
})

module.exports = product;