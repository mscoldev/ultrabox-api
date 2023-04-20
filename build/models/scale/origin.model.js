"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../../database/config.databasepg'),
    sequelize = _require2.sequelize;

var origin = sequelize.define('origins', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  originName: {
    type: DataTypes.STRING,
    required: true,
    unique: {
      args: true,
      msg: 'El nombre del origen ya se encuentra registrado. El nombre de origen debe ser unico'
    }
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: true
  }
});
module.exports = origin;
//# sourceMappingURL=origin.model.js.map