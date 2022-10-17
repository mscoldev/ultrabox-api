const { Schema, model } = require("mongoose")

const roleSchema = Schema({
    name:{
        type: String,
        unique: [true,'Debe definir un nombre para el Esquema']
    },
    main:{
        type: String,
        unique: [true,'Debe definir un nombre para el Esquema']
    },
    }, {
        timestamps: true,
        versionKey: false
    })

module.exports = model('Role',roleSchema);