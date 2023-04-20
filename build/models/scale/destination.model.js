"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../../database/config.databasepg'),
    sequelize = _require2.sequelize;

var destination = sequelize.define('destinations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    required: {
      args: true,
      msg: 'El nombre del destino es requerido.'
    },
    unique: {
      args: true,
      msg: 'El nombre de destino ya se encuentra registrado. El nombre de destino debe se unico'
    }
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: true
  }
});
module.exports = destination;
//# sourceMappingURL=destination.model.js.map