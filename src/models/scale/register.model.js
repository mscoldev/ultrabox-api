const { DataTypes } = require('sequelize');
const moment = require('moment');

const { sequelize } = require('../../database/config.databasepg');

const Truck = require('../../models/scale/truck.model');
const Product = require('../../models/scale/product.model');
const Driver = require('../../models/scale/driver.model');
const Client = require('../../models/scale/client.model');
const Origin = require('../../models/scale/origin.model');
const Site = require('../../models/scale/site.model');


const register = sequelize.define('registers', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    date: {
        type: DataTypes.DATE,
        get() {
            const hdate = moment(this.dataValues.date).format('DD-MM-YYYY HH:mm');
            return hdate
        },
        required: true,
        defaultValue: DataTypes.NOW
    },
    serialScale: {
        type: DataTypes.INTEGER,
        unique: true
    },
    serialLog: {
        type: DataTypes.INTEGER,
        required: true,
    },
    qty: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
        validate: {
            isDecimal: { msg: 'No es un numero decimal' }
        }
    },
    groosWeight: {
        type: DataTypes.DECIMAL(10, 3),
        defaultValue: 0,
        required: true,
        allowNull: false,
        validate: {
            isDecimal: { msg: 'No es un numero decimal' }
        }
    },
    netWeight: {
        type: DataTypes.DECIMAL(10, 3),
        defaultValue: 0,
        allowNull: false,
        set() {
            const tareNow = this.tare;
            const groosWeight = this.groosWeight;

            if (tareNow != 0 & groosWeight != 0) {
                const newNetWeight = groosWeight - tareNow;
                this.setDataValue('netWeight', newNetWeight);
            }
        },
        required: false

    },
    tare: {
        type: DataTypes.DECIMAL(10, 3),
        required: true,
        defaultValue: 0,
        allowNull: false,
        validate: {
            isDecimal: { msg: 'No es un numero decimal' }
        }
    },
    status: {
        type: DataTypes.STRING,
        required: true
    },
    dateTara: {
        type: DataTypes.DATE,
        set() {
            const dateNow = new Date().toISOString();
            const tareNow = this.tare
            if (tareNow != 0) {
                this.setDataValue('dateTara', dateNow)
            }
        },
        required: false
    },
    dateNet: {
        type: DataTypes.DATE,
        set() {
            const dateNow = new Date().toISOString();
            const netWeightNow = this.netWeight
            if (netWeightNow != 0) {
                this.setDataValue('dateNet', dateNow)
            }
        },
    },
    weight: {
        type: DataTypes.DECIMAL(10, 3),
        defaultValue: 0,
        required: true,
        allowNull: false,
        validate: {
            isDecimal: { msg: 'No es un numero decimal' }
        }
    },
    dateWeight: {
        type: DataTypes.DATE,
        set() {
            const dateNow = new Date().toISOString();
            const weightNow = this.weight
            if (weightNow != 0) {
                this.setDataValue('dateWeight', dateNow)
            }
        },
        required: false
    },
    secondWeight: {
        type: DataTypes.DECIMAL(10, 3),
        defaultValue: 0,
        required: true,
        allowNull: false,
        validate: {
            isDecimal: { msg: 'No es un numero decimal' }
        }
    },
    secondDateWeight: {
        type: DataTypes.DATE,
        set() {
            const dateNow = new Date().toISOString();
            const secondDateWeightNow = this.secondDateWeight
            if (secondDateWeightNow != 0) {
                this.setDataValue('secondDateWeight', dateNow)
            }
        },
        required: false
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
        type: DataTypes.UUID,
        required: true
    },
    _idTruck: {
        type: DataTypes.UUID,
        required: true
    },
    _idClient: {
        type: DataTypes.UUID,
        required: true
    },
    _idOrigin: {
        type: DataTypes.INTEGER,
        required: true
    },
    _idSite: {
        type: DataTypes.INTEGER,
        required: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        required: true,
        defaultValue: true
    }
})




//*Trucks - registers
Truck.hasMany(register, {
    foreignKey: '_idTruck',
    sourceKey: 'id'
});
register.belongsTo(Truck, {
    foreignKey: '_idTruck',
    targetId: 'id'
})

//*Products - registers
Product.hasMany(register, {
    foreignKey: '_idProduct',
    sourceKey: 'id'
});
register.belongsTo(Product, {
    foreignKey: '_idProduct',
    targetId: 'id'
})

//*Driverss - registers
Driver.hasMany(register, {
    foreignKey: '_idDriver',
    sourceKey: 'id'
});
register.belongsTo(Driver, {
    foreignKey: '_idDriver',
    targetId: 'id'
});

//*Client- registers
Client.hasMany(register, {
    foreignKey: '_idClient',
    sourceKey: 'id'
});
register.belongsTo(Client, {
    foreignKey: '_idClient',
    targetId: 'id'
});

//*Origin- registers
Origin.hasMany(register, {
    foreignKey: '_idOrigin',
    sourceKey: 'id'
});
register.belongsTo(Origin, {
    foreignKey: '_idOrigin',
    targetId: 'id'
});

//*Origin- registers
Site.hasMany(register, {
    foreignKey: '_idSite',
    sourceKey: 'id'
});
register.belongsTo(Site, {
    foreignKey: '_idSite',
    targetId: 'id'
});

module.exports = register;