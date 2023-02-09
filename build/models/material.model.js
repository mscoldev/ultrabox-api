"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var materialSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre del material es obligatorio']
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
    required: [true, 'El tipo de material es requerido debe ser A=Aditivo, M=Material u O=Otro'],
    emun: ['A', 'M', 'O'],
    "default": 'M'
  },
  ppm: {
    type: Number,
    required: [false, 'PPM is required']
  },
  density: {
    type: Number,
    required: [false, 'Density is required']
  },
  productionLineUse: [{
    type: Schema.Types.ObjectId,
    ref: 'ProductionLine',
    required: [true, 'Debe definir una la linea de produccion que utiliza este material']
  }],
  deleted: {
    type: Boolean,
    required: [true, 'Default Activated'],
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('Material', materialSchema);