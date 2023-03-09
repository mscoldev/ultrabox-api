const { Schema, model } = require("mongoose")

const productionLineSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    erp_code: {
        type: Number,
        required: false,
        unique: true
    },
    id_controller: {
        type: Number,
        required: false,
        unique: true
    },
    backgroundColor: {
        type: String,
        required: [true, 'Define un color de fondo a utilizar en el calendario, esta característica es necesaria para el componente calendario.'],
        default: '#EBEEFD',
    },
    textColor: {
        type: String,
        required: [true, 'Define un color de texto a utilizar en el calendario, esta característica es necesaria para el componente calendario.'],
        default: '#3A57E8',
    },
    borderColor: {
        type: String,
        required: [true, 'Define un color de borde a utilizar en el calendario, esta característica es necesaria para el componente calendario.'],
        default: '#3A57E8',
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