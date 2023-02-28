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
        allowNull: false,
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
        type: DataTypes.STRING,
        unique: false,
        required: true,
        allowNull: false
    },
    serialLog: {
        type: DataTypes.INTEGER,
        unique: true,
        required: true,
        allowNull: false,
    },
    qty: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: true,
        validate: {
            isDecimal: { msg: 'No es un numero decimal' }
        },
        defaultValue: 0,
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
    operation: {
        type: DataTypes.STRING,
        required: true
    },
    dateTara: {
        type: DataTypes.DATE,
        required: false,
        validate: {
            isDate: {
                args: true,
                msg: 'El campo dateTara debe ser una fecha válida'
            }
        },
        get() {
            const hdate = moment(this.dataValues.dateTara).format('DD-MM-YYYY HH:mm');
            return hdate
        },
    },
    dateNet: {
        type: DataTypes.DATE,
        validate: {
            isDate: {
                args: true,
                msg: 'El campo dateNet debe ser una fecha válida'
            }
        },
        get() {
            const hdate = moment(this.dataValues.dateNet).format('DD-MM-YYYY HH:mm');
            return hdate
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
        required: false,

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
        required: true,
        defaultValue: 'Sin error'
    },
    userRecorder: {
        type: DataTypes.STRING,
        required: true,
    },
    _idProduct: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        validate: {
            isInt: { msg: 'El _idProduct debe ser Int' },
            notEmpty: {
                msg: 'El producto no puede estar vacio'
            }
        }
    },
    _idDriver: {
        type: DataTypes.UUID,
        required: true,
        allowNull: false,
        validate: {
            isUUID: {
                args: 4,
                msg: 'El _idDriver debe ser UUID'
            },
            notEmpty: {
                msg: 'El conductor no puede estar vacio'
            }
        }
    },
    _idTruck: {
        type: DataTypes.UUID,
        required: true,
        allowNull: false,
        validate: {
            isUUID: {
                args: 4,
                msg: 'El _idTruck debe ser UUID'
            },
            notEmpty: {
                msg: 'El vehiculo no puede estar vacio'
            }
        }
    },
    _idClient: {
        type: DataTypes.UUID,
        required: true,
        allowNull: false,
        validate: {
            isUUID: {
                args: 4,
                msg: 'El _idClient debe ser UUID'
            },
            notEmpty: {
                msg: 'El cliente no puede estar vacio'
            }
        }
    },
    _idOrigin: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        validate: {
            isInt: { msg: 'El _idOrigin debe ser Int' },
            notEmpty: {
                msg: 'El origen no puede estar vacio'
            }
        }
    },
    _idSite: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
        validate: {
            isInt: { msg: 'El _idSite debe ser Int' },
            notEmpty: {
                msg: 'El destino no puede estar vacio'
            }
        }
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