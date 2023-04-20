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
    required: true,
    "default": Date.now
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
    required: true,
    "default": Date.now
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
      required: true,
      "default": 'No especificado'
    },
    Email: {
      type: String,
      required: true
    }
  },
  controller: {
    Name: {
      type: String,
      required: false
    },
    Position: {
      type: String,
      required: false,
      "default": 'No especificado'
    },
    Email: {
      type: String,
      required: false
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
      required: false
    },
    contractor: {
      type: String,
      required: false
    },
    controller: {
      type: String,
      required: false
    }
  },
  dateSign: {
    type: Date,
    required: true,
    "default": Date.now
  },
  citySign: {
    type: String,
    required: true,
    "default": 'Barranquilla'
  },
  officeSign: {
    type: String,
    required: true,
    "default": 'del cliente'
  },
  serviceValue: {
    type: Number,
    required: true
  },
  recommendations: {
    type: String,
    required: true,
    "default": 'No se especificaron recomendaciones para el contratista'
  },
  typeAcceptance: {
    type: String,
    required: true
  },
  stage: [{
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      "default": Date.now
    },
    completed: {
      type: Boolean,
      required: true,
      "default": false
    }
  }],
  rejectedMessage: [{
    description: {
      type: String
    },
    date: {
      type: Date,
      "default": Date.now
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
//# sourceMappingURL=acceptance.model.js.map