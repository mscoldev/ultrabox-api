const { Schema, model } = require("mongoose")

const moduleSchema = Schema({
    name: {
        type: String,
        unique: [false, 'Ya existe un modulo con este nombre.'],
        required: [true, 'El nombre es requerido, debe definir uno']
    },
    routeName: {
        type: String,
    },
    child: {
        ref: 'Module',
        type: Schema.Types.ObjectId
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Module', moduleSchema);