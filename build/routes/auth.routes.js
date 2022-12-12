"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var Role = require('../models/role.model');

var _require3 = require('../middlewares/validateFields'),
    validateFields = _require3.validateFields;

var _require4 = require('../middlewares/validateJWT'),
    validateJWT = _require4.validateJWT;

var _require5 = require('../middlewares/validateRol'),
    getUserRol = _require5.getUserRol,
    validateAccessModule = _require5.validateAccessModule,
    addNameModule = _require5.addNameModule; // Funciones desde el controlador


var _require6 = require('../controllers/auth.controller'),
    signIn = _require6.signIn,
    signUp = _require6.signUp,
    getUsers = _require6.getUsers,
    updateUser = _require6.updateUser,
    login = _require6.login;

var NAME_MODULE = 'auth'; //Importacion de Router express

var router = Router(); //Aqui las rutas necesarias --->

router.get('/users', getUsers);
router.post('/signup', signUp);
router.post('/login', [check('username', 'El nombre de usuario es obligatorio').not().isEmpty(), check('password', 'El password es obligatorio').not().isEmpty(), validateFields], login);
router.post('/signin', signIn);
router.put('/user/:id', [validateJWT, addNameModule(NAME_MODULE), getUserRol, validateAccessModule //TODO Validar acceso al modulo de usuarios.
//TODO Validar acceso a edicion - Posibles (Lectura, edicion, eliminacion, root)
], updateUser); // [
//     check('email', 'el correo no es valido').isEmail(),
//     check('name', 'El numbre de usuario es requerido').not().isEmpty(),
//     check('roles').custom(async (roles = '') => {
//         const existRole = await Role.findOne({ roles });
//         if (!existRole) {
//             throw new Error(`El rol ${roles} no esta registrado en la base de datos`)
//         }
//     }),
//     validateFields
// ]

module.exports = router;