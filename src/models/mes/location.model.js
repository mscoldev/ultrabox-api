const { Schema, model } = require("mongoose")

const locationSchema = Schema({
    name: {
        type: String,
        required: [true, 'Defina un nombre para la ubicación']
    },
    id_controller: {
        type: Number,
        required: false,
        unique: true
    },
    description: {
        type: String,
        required: false,
    },
    deleted: {
        type: Boolean,
        required: [true, 'Default Disable'],
        default: false
    },
    productionLineUse: [{
        ref: 'ProductionLine',
        type: Schema.Types.ObjectId
    }],
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Location', locationSchema);