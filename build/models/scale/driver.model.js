"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../../database/config.databasepg'),
    sequelize = _require2.sequelize;

var driver = sequelize.define('drivers', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    required: {
      args: true,
      msg: 'El nombre del conductor es requerido.'
    }
  },
  nit: {
    type: DataTypes.STRING,
    required: true,
    unique: {
      args: true,
      msg: 'El numero de identificacion debe ser unico. El numero ingresado ya se encuentra registrado.'
    }
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: true
  }
});
module.exports = driver;