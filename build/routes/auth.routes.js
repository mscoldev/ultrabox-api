"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var Role = require('../models/role.model');

var _require3 = require('../middlewares/validateFields'),
    validateFields = _require3.validateFields; // Funciones desde el controlador


var _require4 = require('../controllers/auth.controller'),
    signIn = _require4.signIn,
    signUp = _require4.signUp,
    getUsers = _require4.getUsers,
    updateUser = _require4.updateUser; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->

router.get('/users', getUsers);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/user/:id', updateUser); // [
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