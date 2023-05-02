const {
  ControladorABMES,
} = require('../../../models/mes/PLCs/controladorAB.model');

const setValuesToPLC = async (infoPLC, material) => {
  try {
    const controladorABMES = new ControladorABMES(infoPLC);
    controladorABMES.setValuesToPLC(material);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = setValuesToPLC;
