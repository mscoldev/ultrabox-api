"use strict";

var _require = require('mongoose'),
    model = _require.model,
    Schema = _require.Schema;

var deviceSchema = Schema({
  ipAddress: {
    type: String,
    required: true,
    unique: true
  },
  slot: {
    type: Number,
    required: true,
    unique: true
  },
  cycleTime: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  tags: [{
    name: {
      type: String,
      required: false,
      unique: true
    },
    type: {
      type: String,
      required: false,
      unique: true
    },
    ambit: {
      type: String,
      required: false,
      unique: true
    }
  }]
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('device', deviceSchema);
//# sourceMappingURL=device.model.js.map