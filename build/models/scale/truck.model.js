"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../../database/config.databasepg'),
    sequelize = _require2.sequelize;

var truck = sequelize.define('trucks', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  numberPlate: {
    type: DataTypes.STRING,
    required: {
      args: true,
      msg: 'El numero de placa es requerido.'
    },
    unique: {
      args: true,
      msg: 'El numero de placa debe ser unico, el numero de placa ya se encuentra registrado.'
    }
  },
  model: {
    type: DataTypes.STRING,
    required: true
  },
  color: {
    type: DataTypes.STRING,
    required: false
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: true
  }
});
module.exports = truck;