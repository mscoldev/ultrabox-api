const Audit = require('../models/audit.model');
const boom = require('@hapi/boom');
const { ACTIONS } = require('../../src/constants/operations')

const auditMiddleware = (nameModule) => {

    return async (req, res, next) => {
        try {

            const userId = req.user && req.user.uid;

            const audit = new Audit({
                operation: ACTIONS[req.method],
                module: nameModule,
                _idUser: userId,
            });

            const auditSaved = await audit.save();

            if (auditSaved != null) {
                next();
            } else {
                throw boom.badRequest('Audit: Algo salió mal');
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    auditMiddleware,
};