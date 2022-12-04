"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var roleSchema = Schema({
  name: {
    type: String,
    unique: [false, 'Ya existe un rol con este nombre.'],
    required: [true, 'El nombre es requerido, debe definir uno']
  },
  menu: {
    type: [Map],
    required: [true, 'Debe definir un nombre para el Esquema'],
    "default": ""
  },
  deleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('Role', roleSchema);