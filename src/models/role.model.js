const { Schema, model } = require("mongoose")

const roleSchema = Schema({
    name: {
        type: String,
        unique: [false, 'Debe definir un nombre para el Esquema']
    },
    main: {
        type: String,
        unique: [false, 'Debe definir un nombre para el Esquema'],
        default: ""
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Role', roleSchema);