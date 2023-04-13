const { Schema, model, mongoose } = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const materialSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre del material es obligatorio'],
    unique: [true, 'El nombre del material debe ser único']
  },
  erp_code: {
    type: Number,
    required: [true, 'El codigo ERP es requerido'],
    unique: [true, 'El codigo ERP debe ser único']
  },
  _idControllerMaterial: {
    default: 0,
    type: Number,
    required: [true, 'El id controlador es requerido, proporcione un numero'],
    unique: {
      values: true,
      message: 'El id controlador debe ser único'
    }
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: [true, 'El tipo de material es requerido debe ser A=Aditivo, M=Material u O=Otro'],
    emun: ['A', 'M', 'O'],
    default: 'M'
  },
  ppm: {
    type: Number,
    default: 0,
    required: [false, 'PPM is required']
  },
  density: {
    type: Number,
    default: 1,
    required: [false, 'Density is required']
  },
  deleted: {
    type: Boolean,
    required: [true, 'Default Activated'],
    default: false
  },
  productionLineUse: [{
    ref: 'ProductionLine',
    type: Schema.Types.ObjectId
  }],
  unit: {
    ref: 'Unit',
    type: Schema.Types.ObjectId,
    // required: [true, 'Defina una unidad para la densidad']
  },
}, {
  timestamps: true,
  versionKey: false
})

materialSchema.plugin(AutoIncrement, { inc_field: '_idControllerMaterial', start_seq: 0 });

module.exports = model('Material', materialSchema);
