const User = require('../models/user.model');
const boom = require('@hapi/boom');
const { ACTIONS } = require('../../src/constants/operations')

// Middleware de autorización
const authorize = (nameModule) => {

  return async (req, res, next) => {
    const uuid = req.user['uid'];
    const user = await User.findById(uuid)
      .populate([{
        path: 'role',
        options: { lean: true }
      }]).exec();
    

    const menu = user.role.menu;
    const result = searchModule(menu, nameModule);
    const permissions = result && result.actions;
    const validatePermissions = permissions && permissions.includes(ACTIONS[req.method]);

    try {
      if (validatePermissions) {
        console.log("USUARIO: ",validatePermissions);
        next();
      } else {
        throw boom.unauthorized('Acceso denegado');
      }
    } catch (err) {
      next(err);
    }

  }
}

const searchModule = (opt, text) => {
  for (const obj of opt) {
    if (obj.text === text) {
      return obj;
    }
    if (obj.submain && obj.submain.length) {
      const submainResult = obj.submain.find(subobj => subobj.text === text);
      if (submainResult) {
        return submainResult;
      }
    }
  }
  return null;
};


module.exports = {
  authorize,
};
