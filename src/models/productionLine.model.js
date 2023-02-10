const { Schema, model } = require("mongoose")

const productionLineSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    erp_code: {
        type: Number,
        required: false,
        unique: [true, 'the erp_code is unique']
    },
    id_controller: {
        type: Number,
        required: false,
        unique: [true, 'Este id ya se encuentra registrado en otra linea de produccion']
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('ProductionLine', productionLineSchema);