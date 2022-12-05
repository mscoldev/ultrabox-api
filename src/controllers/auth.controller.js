const { response, request } = require('express');
const User = require("../models/user.model");
const Role = require("../models/role.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            msg: 'Lista de usuarios',
            users
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

//*DAR DE ALTA UN NUEVO USUARIO - NO DEVUELVE TOKEN
const signUp = async (req = request, res = response) => {
    try {
        const { username,
            name,
            middleName,
            firstSurname,
            secondSurname,
            nit,
            typesDocument,
            email,
            password,
            status,
            deleted,
            roles } = req.body;

        const newUser = new User({
            username,
            name,
            middleName,
            firstSurname,
            secondSurname,
            nit,
            typesDocument,
            email,
            status,
            deleted,
            roles,
            password: await User.encryptPassword(password)
        });
        //* assign roles - if roles == null default roles is user.

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: { $in: "user" } });
            newUser.roles = [role._id];
        }

        // //*Return TOKEN to FRONTEND
        // const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, {
        //     expiresIn: 86400, //*24 Hours
        // });

        const savedUser = await newUser.save();
        res.status(200).json({
            msg: 'Alta de usuario',
            savedUser
        })

    } catch (err) { // Set custom error for unique keys
        let errMsg;
        if (err.code == 11000) {
            errMsg = `Uno o mas datos del usuario existen se encuentran registrados: ${err.message} Objeto: ` + Object.keys(err.keyValue)[0];
        } else {
            errMsg = err.message;
        }
        res.status(400).json({ statusText: "Bad Request", message: errMsg })
    }
};

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

const updateUser = async (req = request, res = response) => {

    try {
        const paramsId = req.params.id;
        const body = req.body;

        //TODO: Validar contra la base de datos.

        const userUpdated = await User.findByIdAndUpdate(paramsId, body, { new: true })
        if (userUpdated != null) {
            res.status(200).json({
                msg: '_id de usuario no encontrado',
                userUpdated
            });
        } else {
            res.status(404).json({
                msg: 'Usuario no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

};

module.exports = {
    signUp,
    signIn,
    getUsers,
    updateUser
};
