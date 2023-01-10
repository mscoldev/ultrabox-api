
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role.model');

const { validateFields } = require('../middlewares/validateFields');

const { getUserRol, validateAccessModule, addNameModule } = require('../middlewares/validateRol');



// Funciones desde el controlador
const { signIn, signUp, getUsers, getUserByUid, updateUser, login } = require('../controllers/auth.controller');

const NAME_MODULE = 'auth';

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->


router.get('/users', getUsers);
router.get('/user/:id', getUserByUid);

router.post('/signup', signUp);

router.post('/login', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login);

router.put('/user/:id',

    // addNameModule(NAME_MODULE),
    // getUserRol,
    // validateAccessModule,
    //TODO Validar acceso al modulo de usuarios.
    //TODO Validar acceso a edicion - Posibles (Lectura, edicion, eliminacion, root)
    updateUser);



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