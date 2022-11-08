const { response, request } = require("express");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//TODO: Implementar la verificacion de parametros de entrada.

const signUp = async (req = request, res = response) => {
    const { username, email, password, status, roles } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        status,
    });
    //* assign roles - if roles == null default roles is user.

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
    } else {
        const role = await Role.findOne({ name: { $in: "user" } });
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser);

    //*Return TOKEN to FRONTEND
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, {
        expiresIn: 86400, //*24 Hours
    });

    res.status(200).json({ token });
};

//----------------------------
const signIn = async (req = request, res = response) => {
    const usernameFound = await User.findOne({ username: req.body.username }).populate('roles');
    if (!usernameFound) {
        return res.status(400).json({
            msg: "Usuario o password incorrectos - Username",
        });
    } else {
        console.log("Usuario encontrado");
        console.log(usernameFound);
        console.log("ROLES: " + usernameFound.roles);
        const roles = usernameFound.roles

        const token = jwt.sign({ id: usernameFound._id }, process.env.SECRET_KEY, {
            expiresIn: 86400, //*24 Hours
        });

        res.status(200).json({ token, roles });

    }

    //TODO: Verificar si el usuario esta activo
    // if (!User.status) {
    //     return res.status(400).json({
    //         msg: 'Usuario o password incorrectos - Inactivo'
    //     });
    // }

    //TODO: Verificar la contrasena
};

module.exports = {
    signUp,
    signIn,
};
