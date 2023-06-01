const { Schema, model } = require("mongoose")

const auditSchema = Schema({
  operation: {
    type: String,
    required: [true, 'El tipo de operación es obligatorio']
  },
  executionDate: {
    type: Date,
    default: Date.now
  },
  module: {
    type: String,
    required: [true, 'El nombre del modulo accionado es obligatorio']
  },
  _idUser: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Audit', auditSchema);