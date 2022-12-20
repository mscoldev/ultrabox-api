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
        unique: { args: true, msg: 'En nombre del producto ya se encuentra registrado, debe ser unico' }
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
})

module.exports = product;