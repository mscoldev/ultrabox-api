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
    required: true
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