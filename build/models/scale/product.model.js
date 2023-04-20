"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../../database/config.databasepg'),
    sequelize = _require2.sequelize;

var product = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productName: {
    type: DataTypes.STRING,
    required: true,
    unique: {
      args: true,
      msg: 'En nombre del producto ya se encuentra registrado, debe ser unico'
    }
  },
  density: {
    type: DataTypes.DECIMAL(10, 3),
    defaultValue: 1,
    required: true,
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'La densidad no es un numero decimal'
      }
    }
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: true
  }
});
module.exports = product;
//# sourceMappingURL=product.model.js.map