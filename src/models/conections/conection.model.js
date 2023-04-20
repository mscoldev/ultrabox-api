const { model, Schema } = require('mongoose');

const connectionSchema = Schema({
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
    required: true,
  },
  tags: [{
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true,
      unique: true
    },
    ambit: {
      type: String,
      required: true,
      unique: true
    },

  }]
}, {
  timestamps: true,
  versionKey: false
});


module.exports = model('connection', connectionSchema);