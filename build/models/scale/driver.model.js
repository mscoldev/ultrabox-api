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
    required: true
  },
  nit: {
    type: DataTypes.STRING,
    required: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    required: true,
    "default": true
  }
});
module.exports = driver;