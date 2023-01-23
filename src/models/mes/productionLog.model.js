const { Schema, model, default: mongoose } = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment');

const productionLogSchema = Schema({
    uuid: {
        type: String,
        unique: true,
        index: true,
        required: [true, 'Debe definir un UUID para el registro']
    },
    codigo: {
        type: Number,
        required: [true, 'El codigo es requerido']
    },
    unidad: {
        type: String,
        required: [true, 'La unidad de medida es requerida']
    },
    cantidad: {
        type: Number,
        required: [true, 'Las cantidades son requeridas para el registro']
    },
    estado: {
        type: Boolean,
        default: false
    },
    molino: {
        type: Number,
        required: [true, 'Debe indicar el punto de produccion molino']
    },
    receta: {
        type: Number,
        required: [true, 'Debe definir una receta para el registro de produccion']
    },
    silo: {
        type: Number,
        required: [true, 'Debe seleccionar un lugar de destino para la produccion']
    },
    kwhpd004: {
        type: Number,
        required: [false],
        default: 0
    },
    kwhpd005: {
        type: Number,
        required: [false],
        default: 0
    },
    kwhpd006: {
        type: Number,
        required: [false],
        default: 0
    },
    m3gas: {
        type: Number,
        required: [false],
        default: 0
    },
    m3ton: {
        type: Number,
        required: [false],
        default: 0
    },

}, {
    timestamps: true,
    versionKey: false
})

productionLogSchema.plugin(AutoIncrement, { inc_field: 'serial' });
productionLogSchema.plugin(AutoIncrement, { inc_field: 'serial2' })

productionLogSchema.methods.toJSON = function () {
    const productionLog = this.toObject();
    productionLog.createdAt = moment(productionLog.createdAt).format('DD-MM-YYYY HH:mm');
    productionLog.updatedAt = moment(productionLog.updatedAt).format('DD-MM-YYYY HH:mm');
    return productionLog
}

module.exports = model('productionLog', productionLogSchema);