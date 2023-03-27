const boom = require('@hapi/boom');
const { Controller } = require('st-ethernet-ip')
const bufToArray = require('../../../libs/bufToArray.lib')


class ControladorABMES {

  constructor(infoPLC) {

    this.ip = infoPLC.ip; //IP del controlador
    this.slot = infoPLC.slot; //Slot del controladorSlot del controlador
    this.nameTagChannelIn = infoPLC.nameTagChannelIn; //nameTagChannelIn del controladorNombre con el que se definio para el canal de entrada de materiales.
    this.limitInputs = infoPLC.limitInputs; // Numero de canales de entrada.
    this.limitMaterials = infoPLC.limitMaterials; // Numero maximo de materiales a crear en el controlador.
    // this.materials = infoPLC.materials;
  };

  setValuesToPLC(materials) {
    const PLC = new Controller();
    PLC.connect(this.ip, this.slot).then(async () => {
      const descriptionPLC = PLC.properties
      console.log({ descriptionPLC });

      const nameTagChannelIn = this.nameTagChannelIn; //nameTagChannelIn del controladorNombre con el que se definio para el canal de entrada de materiales.
      const limitInputs = this.limitInputs; // Numero de canales de entrada.
      const limitMaterials = this.limitMaterials; // Numero maximo de materiales a crear en el controlador.
      const materialsData = materials;

      const newUpdateMaterial = materialsData.map(
        async function (material) {
          const id = material._idController
          const name = material.name

          for (let i = 0; i <= limitInputs; i++) {
            const lengthData = PLC.newTag(`${nameTagChannelIn}[${i}].MATERIAL[${id}].LEN`)
            const dataValue = PLC.newTag(`${nameTagChannelIn}[${i}].MATERIAL[${id}].DATA`, null, false, 1, 15)

            await PLC.readTag(lengthData);
            await PLC.readTag(dataValue);


            const bufferAB = bufToArray(Buffer.from(name))
            const length = bufferAB.length

            dataValue.value = bufferAB
            lengthData.value = length


            await PLC.writeTag(lengthData)
            await PLC.writeTag(dataValue)

          }
        })
      console.log(`Valores Actualizados en PLC con exito.`);
      return descriptionPLC
    }).catch(async e => {
      console.error(e);
    });
  }
}



module.exports = { ControladorABMES };
