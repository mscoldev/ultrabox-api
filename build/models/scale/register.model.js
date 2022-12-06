"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../../database/config.databasepg'),
    sequelize = _require2.sequelize;

var register = sequelize.define('registers', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  date: _defineProperty({
    type: DataTypes.DATE,
    required: true,
    set: function set() {
      var dateNow = new Date().toISOString();
      var grossNow = this.groosWeigth;

      if (grossNow != 0) {
        this.setDataValue('date', dateNow);
      }
    }
  }, "required", false),
  serialScale: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true
  },
  serialLog: {
    type: DataTypes.INTEGER,
    required: true
  },
  qty: {
    type: DataTypes.DECIMAL(10, 3),
    allowNull: true,
    validate: {
      isDecimal: {
        msg: 'No es un numero decimal'
      }
    }
  },
  groosWeigth: {
    type: DataTypes.DECIMAL(10, 3),
    defaultValue: 0,
    required: true,
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'No es un numero decimal'
      }
    }
  },
  netWeigth: {
    type: DataTypes.DECIMAL(10, 3),
    defaultValue: 0,
    allowNull: false,
    set: function set() {
      var tareNow = this.tare;
      var groosWeigth = this.groosWeigth;

      if (tareNow != 0 & groosWeigth != 0) {
        var newNetWeigth = groosWeigth - tareNow;
        this.setDataValue('netWeigth', newNetWeigth);
      }
    },
    required: false
  },
  tare: {
    type: DataTypes.DECIMAL(10, 3),
    required: true,
    defaultValue: 0,
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'No es un numero decimal'
      }
    }
  },
  status: {
    type: DataTypes.STRING,
    required: true
  },
  dateTara: {
    type: DataTypes.DATE,
    set: function set() {
      var dateNow = new Date().toISOString();
      var tareNow = this.tare;

      if (tareNow != 0) {
        this.setDataValue('dateTara', dateNow);
      }
    },
    required: false
  },
  dateNet: {
    type: DataTypes.DATE,
    set: function set() {
      var dateNow = new Date().toISOString();
      var netWeigthNow = this.netWeigth;

      if (netWeigthNow != 0) {
        this.setDataValue('dateNet', dateNow);
      }
    }
  },
  error: {
    type: DataTypes.STRING,
    required: true
  },
  userRecorder: {
    type: DataTypes.STRING,
    required: true
  },
  _idProduct: {
    type: DataTypes.INTEGER,
    required: true
  },
  _idDriver: {
    type: DataTypes.UUID,
    required: true
  },
  _idTruck: {
    type: DataTypes.UUID,
    required: true
  },
  _idClient: {
    type: DataTypes.UUID,
    required: true
  },
  _idOrigin: {
    type: DataTypes.INTEGER,
    required: true
  },
  _idProject: {
    type: DataTypes.INTEGER,
    required: true
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    required: true,
    defaultValue: true
  }
});
module.exports = register;