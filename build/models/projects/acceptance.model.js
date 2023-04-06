"use strict";

var _require = require('mongoose'),
    model = _require.model,
    Schema = _require.Schema;

var pjAcceptanceSchema = Schema({
  _codeProjectERP: {
    type: String,
    required: true,
    unique: true
  },
  _idProjectERP: {
    type: Number,
    required: true,
    unique: true
  },
  dateAcceptance: {
    type: Date,
    required: true
  },
  serviceObject: {
    type: String,
    required: true
  },
  dateInit: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  erpRef: {
    client: {
      purchaseOrder: {
        type: String,
        required: true
      }
    },
    own: {
      proposal: {
        type: String,
        required: true
      }
    }
  },
  client: {
    company: {
      type: String,
      required: true
    },
    Name: {
      type: String,
      required: true
    },
    Position: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true
    }
  },
  controller: {
    Name: {
      type: String,
      required: true
    },
    Position: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true
    }
  },
  contractor: {
    Name: {
      type: String,
      required: true
    },
    Position: {
      type: String,
      required: true
    },
    Email: {
      type: String,
      required: true
    }
  },
  deliverables: [{
    _id: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    compliance: {
      type: Number,
      required: true
    },
    accepted: {
      type: Boolean,
      required: true
    }
  }],
  signatory: {
    client: {
      type: String,
      required: true
    },
    contractor: {
      type: String,
      required: true
    },
    controller: {
      type: String,
      required: true
    }
  },
  dateSign: {
    type: Date,
    required: true
  },
  citySign: {
    type: String,
    required: true
  },
  officeSign: {
    type: String,
    required: true
  },
  serviceValue: {
    type: Number,
    required: true
  },
  recommendations: {
    type: String,
    required: true
  },
  typeAcceptance: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  rejectedMessage: [{
    description: {
      type: String
    },
    date: {
      type: Date
    },
    by: {
      type: String
    }
  }],
  _idFiles: [{
    ref: 'File',
    type: Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
}); // Agrega un índice en los campos _id y _codeProjectERP

pjAcceptanceSchema.index({
  _id: 1,
  _codeProjectERP: 1
});
module.exports = model('PjAcceptance', pjAcceptanceSchema);