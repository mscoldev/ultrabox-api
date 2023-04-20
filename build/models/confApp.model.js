"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var configAppSchema = Schema({
  company: {
    type: String,
    required: [true, 'Introduzca un nombre para la empresa']
  },
  nit: {
    type: String,
    required: [true, 'Introduzca un nombre para la empresa']
  },
  initSerial: {
    type: Number,
    required: [true, 'Debe definir un numero de inicio para el campo de talonario consecutivo'],
    "default": 1
  },
  deleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('ConfigApp', configAppSchema);
//# sourceMappingURL=confApp.model.js.map