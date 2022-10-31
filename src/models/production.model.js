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
        type: Schema.Types.ObjectId
    },
    units: {
        type: String,
        default: 'kg'
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Material', productionSchema);