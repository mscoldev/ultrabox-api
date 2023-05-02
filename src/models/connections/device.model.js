const { model, Schema } = require('mongoose');

const deviceSchema = Schema(
  {
    ipAddress: {
      type: String,
      required: true,
      unique: true,
    },
    slot: {
      type: Number,
      required: true,
      unique: true,
    },
    cycleTime: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    tags: [
      {
        name: {
          type: String,
          required: false,
          unique: true,
        },
        type: {
          type: String,
          required: false,
          unique: true,
        },
        ambit: {
          type: String,
          required: false,
          unique: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('device', deviceSchema);
