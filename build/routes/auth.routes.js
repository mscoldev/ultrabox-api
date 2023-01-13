"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var Role = require('../models/role.model');

var _require3 = require('../middlewares/validateFields'),
    validateFields = _require3.validateFields;

var _require4 = require('../middlewares/validateRol'),
    getUserRol = _require4.getUserRol,
    validateAccessModule = _require4.validateAccessModule,
    addNameModule = _require4.addNameModule; // Funciones desde el controlador


var _require5 = require('../controllers/auth.controller'),
    signUp = _require5.signUp,
    getUsers = _require5.getUsers,
    getUserByUid = _require5.getUserByUid,
    updateUser = _require5.updateUser,
    login = _require5.login,
    verifyToken = _require5.verifyToken;

var NAME_MODULE = 'auth'; //Importacion de Router express

var router = Router(); //Aqui las rutas necesarias --->

router.get('/users', getUsers);
router.get('/user/:id', getUserByUid);
router.post('/token', verifyToken);
router.post('/signup', signUp);
router.post('/login', [check('username', 'El nombre de usuario es obligatorio').not().isEmpty(), check('password', 'El password es obligatorio').not().isEmpty(), validateFields], login);
router.put('/user/:id', // addNameModule(NAME_MODULE),
// getUserRol,
// validateAccessModule,
//TODO Validar acceso al modulo de usuarios.
//TODO Validar acceso a edicion - Posibles (Lectura, edicion, eliminacion, root)
updateUser); // [
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