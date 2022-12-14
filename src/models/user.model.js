const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
    username: {
        type: String,
        unique: [true, 'Este username ya se encuentra registrado'],
        required: [true, 'El nombre de usuario es requerido']
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
        type: String,
        required: [true, 'El número de identificacion es requerido'],
        unique: [true, 'El numero de identificacion está definido como unico']
    },
    typeDocument: {
        type: String,
        required: true,
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
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    role: {
        ref: 'Role',
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

userSchema.methods.toJSON = function () {
    const { password, deleted, _id, ...user } = this.toObject();
    user.uid = _id;
    return user
}

module.exports = model('User', userSchema);