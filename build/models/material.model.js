"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var materialSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la receta es obligatorio']
  },
  erp_code: {
    type: Number,
    required: [true, 'El codigo ERP es requerido'],
    unique: [true, 'El codigo ERP debe ser unico']
  },
  id_controller: {
    type: Number,
    required: false,
    unique: false
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: [true, 'El tipo de material es requerido debe es A=Aditivo o M=Material'],
    emun: ['A', 'M', 'O'],
    "default": 'M'
  },
  enable: {
    type: Boolean,
    required: [true, 'El tipo de material es requerido debe es A=Aditivo o M=Material'],
    "default": true
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('Material', materialSchema);