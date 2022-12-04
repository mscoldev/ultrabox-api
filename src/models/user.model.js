const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
    username: {
        type: String,
        unique: [true, 'Este id ya se encuentra registrado en otra receta']
    },
    name: {
        type: String,
        required: [true, 'Debe definir un nombre para el usuario']
    },
    middleName: {
        type: String,
    },
    firstSurname: {
        type: String,
        required: [true, 'El primer apellido es obligatorio']
    },
    secondSurname: {
        type: String,
    },
    nit: {
        type: Number,
        required: [true, 'El número de identificacion es requerido'],
        unique: [true, 'El numero de identificacion está definido como unico']
    },
    email: {
        type: String,
        unique: [true, 'Este email ya se encuentra registrado, registre un nuevo correo.'],
        required: [true, 'El correo es requerido, debe definir uno.'],
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }],
    typesDocument: {
        ref: 'typesDocument',
        type: Schema.Types.ObjectId
    },
}, {
    timestamps: true,
    versionKey: false
})


userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
    // Return: False or True
}

module.exports = model('User', userSchema);