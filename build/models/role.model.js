"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var roleSchema = Schema({
  name: {
    type: String,
    unique: [false, 'Debe definir un nombre para el Esquema']
  },
  menu: {
    type: [Map],
    unique: [false, 'Debe definir un nombre para el Esquema'],
    "default": ""
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('Role', roleSchema);