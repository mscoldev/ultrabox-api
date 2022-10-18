const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
    username: {
        type: String,
        unique: [true, 'Este id ya se encuentra registrado en otra receta']
    },
    email: {
        type: String,
        unique: [true, 'Este id ya se encuentra registrado en otra receta'],
        required: [true, 'El codifo ERP es requerido'],
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