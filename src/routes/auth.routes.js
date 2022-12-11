
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role.model');

const { validateFields } = require('../middlewares/validateFields');


// Funciones desde el controlador
const { signIn, signUp, getUsers, updateUser, login } = require('../controllers/auth.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->


router.get('/users', getUsers);
router.post('/signup', signUp);
router.post('/login', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login);
router.post('/signin', signIn);
router.put('/user/:id', updateUser);

// [
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