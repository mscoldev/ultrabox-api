"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model,
    mongoose = _require.mongoose;

var AutoIncrement = require('mongoose-sequence')(mongoose);

var recipeSchema = Schema({
  name: {
    type: String,
    unique: [true, 'El nombre de la receta debe ser único'],
    required: [true, 'El nombre de la receta es obligatorio']
  },
  erp_code: {
    type: Number,
    required: [true, 'El codigo ERP es requerido'],
    unique: [true, 'El erp_code debe ser único para la receta']
  },
  _idControllerRecipe: {
    "default": 0,
    type: Number,
    required: true,
    unique: [true, 'Este id ya se encuentra registrado en otra receta']
  },
  deleted: {
    type: Boolean,
    required: [true, 'El estado deleted es requerido no puede dejarlo en blanco T/F'],
    "default": false
  },
  temp: {
    type: Boolean,
    required: false,
    "default": false
  },
  ingredients: [new Schema({
    _idMaterial: {
      type: Schema.Types.ObjectId,
      ref: 'Material',
      required: [true, 'Defina un id de material como ingrediente']
    },
    qty: {
      type: Number,
      required: [true, 'Defina la cantidad a utilizar del material']
    },
    _idLocation: {
      ref: 'Location',
      type: Schema.Types.ObjectId
    }
  })],
  productionLineUse: [{
    ref: 'ProductionLine',
    type: Schema.Types.ObjectId,
    required: [true, 'Defina la productionLineUse a utilizar del material']
  }]
}, {
  timestamps: true,
  versionKey: false
});
recipeSchema.plugin(AutoIncrement, {
  inc_field: '_idControllerRecipe',
  start_seq: 0
});
var Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;
//# sourceMappingURL=recipe.model.js.map