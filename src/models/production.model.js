const { Schema, model } = require("mongoose")

const productionSchema = Schema({
    op_number: {
        type: Number,
        required: [true, 'op_number is required'],
        unique: [true, 'the op_number is unique']
    },
    erp_code: {
        type: Number,
        required: false,
        unique: [true, 'the erp_code is unique']
    },
    qty_produced: {
        type: Number,
        required: true,
    },
    _idRecipe: {
        ref: 'Recipe',
        type: Schema.Types.ObjectId,
        required: [true, 'the _idRecipe is required'],
    },
    _idProductionLine: {
        ref: 'ProductionLine',
        type: Schema.Types.ObjectId,
        required: [true, 'the _idProductionLine is required']
    },
    units: {
        type: String,
        default: 'kg'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Production', productionSchema);