const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT')


const User = require('../models/user.model');



require("dotenv").config();

const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.find({ "deleted": false })
            .populate([{
                path: 'role',
                model: 'Role',
                options: { lean: true },
                select: { name: 1, menu: 1 }
            }]).exec();

        res.status(200).json({
            msg: 'Lista de usuarios',
            users
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getUserByUid = async (req = request, res = response) => {

    try {
        const paramsId = req.params.id;
        const findUser = await User.findById(paramsId)
            .populate([{
                path: 'role',
                model: 'Role',
                options: { lean: true },
                select: { name: 1, menu: 1 }
            }]).exec();

        if (findUser != null) {
            res.status(200).json({
                msg: 'Datos de usuario',
                findUser
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
            typeDocument,
            email,
            mobile,
            password,
            status,
            deleted,
            role } = req.body;

        const newUser = new User({
            username,
            name,
            middleName,
            firstSurname,
            secondSurname,
            nit,
            typeDocument,
            email,
            mobile,
            status,
            deleted,
            role,
            password: await User.encryptPassword(password)
        });
        //* assign role - if role == null default role is user.

        // if (role) {
        //     const foundrole = await Role.find({ name: { $in: role } });
        //     newUser.role = foundrole.map((role) => role._id);
        // } else {
        //     const role = await Role.findOne({ name: { $in: "user" } });
        //     newUser.role = [role._id];
        // }

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
    const usernameFound = await User.findOne({ username: req.body.username }).populate('role');
    if (!usernameFound) {
        return res.status(400).json({
            msg: "Usuario o password incorrectos - Username",
        });
    } else {
        console.log("Usuario encontrado");
        console.log(usernameFound);
        console.log("role: " + usernameFound.role);
        const role = usernameFound.role

        const token = jwt.sign({ id: usernameFound._id }, process.env.SECRET_KEY, {
            expiresIn: 86400, //*24 Hours
        });

        res.status(200).json({ token, role });

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
        const { password, ...body } = req.body;
        //* Update password - If receive password, encrypt and add in body 

        if (password) {
            body.password = await User.encryptPassword(password)
        }

        const findUser = await User.findByIdAndUpdate(paramsId, body, { new: true })
        if (findUser != null) {
            res.status(200).json({
                msg: 'Datos de usuario actualizados',
                findUser
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

const login = async (req = request, res = response) => {
    const { username, password } = req.body;
    try {

        //*verify if exist user

        const user = await User.findOne({ username })
            .populate([{
                path: 'role',
                model: 'Role',
                options: { lean: true },
                select: { name: 1, menu: 1 }
            }]).exec();

        if (!user) {
            return res.status(400).json({
                msg: 'El username no existe'
            })
        }

        //*Verify user active
        if (!user.status) {
            return res.status(400).json({
                msg: 'El username no se encuentra activo'
            })
        }

        //*Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'El password es incorrecto'
            })

        }
        //Generar JWT
        const token = await generateJWT(user.id);
        res.json({
            msg: 'Login OK',
            user,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Error interno, Hable con el administrador'
        });
    }

}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUserByUid,
    updateUser,
    login
};
