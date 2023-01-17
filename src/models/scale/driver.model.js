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
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Por favor ingresa un nombre'
            }
        }
    },
    nit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { arg: true, msg: 'El nit de conductor debe ser unico' },
        validate: {
            notNull: {
                msg: 'Por favor ingresa un numero de identificacion'
            }
        }
    },
    typeDocument: {
        type: DataTypes.ENUM,
        allowNull: false,
        required: true,
        values: ['CC', 'TI', 'CE', 'DNI', 'LIC', 'NIC', 'NII']
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        allowNull: false,
        defaultValue: true
    }
})

module.exports = driver;