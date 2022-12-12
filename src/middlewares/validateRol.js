const { request, response } = require('express');
const jsonata = require('jsonata');

const Role = require('../models/role.model');


const getUserRol = async (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const { roles } = req.user;

    console.log(`El id del rol de usuario es: ${roles}`);
    next();
}

const validateAccessModule = async (req = request, res = response, next) => {

    const { roles } = req.user;

    try {
        const { permissions } = await Role.findById(roles);
        if (!permissions) {
            return res.status(404).json({ msg: 'No se encontraron permisos asignados al rol' })
        }

        console.log(permissions);

        const expression = jsonata('module');
        const result = expression.evaluate(permissions);

        console.log(result);

        next();
    } catch (error) {
        return res.status(500).json({ msg: 'Error interno', error: error.message });
    }

}

const addNameModule = (nameModule) => {
    return (req = request, res = response, next) => {
        req.module = nameModule
        console.log(`El nombre de este modulo es: ${nameModule}`);
        next();
    }
}

const JSONataExpression = async (dataPromise) => {
    const queryJSONata = 'module';
    const expression = jsonata(queryJSONata);
    const result = expression.evaluate(dataPromise);
    return result;
}

module.exports = {
    getUserRol,
    validateAccessModule,
    addNameModule
}