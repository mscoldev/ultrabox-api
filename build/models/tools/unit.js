"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var unitSchema = Schema({
  name: {
    type: String,
    required: [true, 'Defina un nombre para la unidad de medida']
  },
  symbol: {
    type: String,
    required: [true, 'Defina un nombre para la unidad de medida']
  }
}, {
  timestamps: false,
  versionKey: false
});
module.exports = model('Unit', unitSchema);