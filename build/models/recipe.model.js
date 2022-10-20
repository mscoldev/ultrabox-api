"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var recipeSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la receta es obligatorio']
  },
  erp_code: {
    type: Number,
    required: [true, 'El codifo ERP es requerido']
  },
  id_controller: {
    type: Number,
    required: false,
    unique: [true, 'Este id ya se encuentra registrado en otra receta']
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('Recipe', recipeSchema);