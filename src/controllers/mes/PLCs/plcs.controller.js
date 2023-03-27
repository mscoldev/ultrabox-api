const { ControladorABMES } = require('../../../models/mes/PLCs/controladorAB.model')


const setValuesToPLC = async (infoPLC, materials) => {
  try {
    const controladorABMES = new ControladorABMES(infoPLC);
    controladorABMES.setValuesToPLC(materials);
  } catch (err) {
    console.log(err.message);
  }
}




module.exports = setValuesToPLC;
