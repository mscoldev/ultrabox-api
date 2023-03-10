const { Schema, model } = require("mongoose")

const materialSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del material es obligatorio']
    },
    erp_code: {
        type: Number,
        required: [true, 'El codigo ERP es requerido'],
        unique: [true, 'El codigo ERP debe ser unico']
    },
    id_controller: {
        type: Number,
        required: false,
        unique: false
    },
    description: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: [true, 'El tipo de material es requerido debe ser A=Aditivo, M=Material u O=Otro'],
        emun: ['A', 'M', 'O'],
        default: 'M'
    },
    ppm: {
        type: Number,
        required: [false, 'PPM is required']
    },
    density: {
        type: Number,
        required: [false, 'Density is required']
    },
    deleted: {
        type: Boolean,
        required: [true, 'Default Activated'],
        default: false
    },
    productionLineUse: [{
        ref: 'ProductionLine',
        type: Schema.Types.ObjectId
    }],
    unit: {
        ref: 'Unit',
        type: Schema.Types.ObjectId
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Material', materialSchema);