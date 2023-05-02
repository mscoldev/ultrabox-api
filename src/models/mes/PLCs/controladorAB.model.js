const boom = require('@hapi/boom');
const { Controller } = require('st-ethernet-ip');
const bufToArray = require('../../../libs/bufToArray.lib');

class ControladorABMES {
  constructor(infoPLC) {
    this.ipAddress = infoPLC.ipAddress; //IP del controlador
    this.slot = infoPLC.slot; //Slot del controladorSlot del controlador
    this.tagNameArray = infoPLC.tagNameArray; //tagNameArray del controladorNombre con el que se definió para el canal de entrada de materiales.
    this.limitInputs = infoPLC.limitInputs; // Numero de canales de entrada.
    this.limitMaterials = infoPLC.limitMaterials; // Numero maximo de materiales a crear en el controlador.
    // this.materials = infoPLC.materials;
  }

  //TODO : Error con crash de la API si la variable del PLC no existe. (Corregir)
  //! Error potencial si la variable del PLC no existe. (Corregir)

  setValuesToPLC(material) {
    const PLC = new Controller();
    PLC.connect(this.ipAddress, this.slot)
      .then(async () => {
        const descriptionPLC = PLC.properties;
        console.log({ descriptionPLC });
        const ipAddress = this.ipAddress;
        const tagNameArray = this.tagNameArray; //tagNameArray del controladorNombre con el que se definio para el canal de entrada de materiales.
        const limitInputs = this.limitInputs; // Numero de canales de entrada. ejemplo: Valvula 1 - 7 (Total: 7)
        const limitMaterials = this.limitMaterials; // Numero máximo de materiales a crear en el controlador.
        const materialsData = material;
        console.log({
          material,
          ipAddress,
          tagNameArray,
          limitInputs,
          limitMaterials,
          materialsData,
        });
        const newUpdateMaterial = materialsData.map(async function (material) {
          const id = material._idControllerMaterial;
          const name = material.name;
          console.log({ id, name });

          for (let i = 0; i <= limitInputs; i++) {
            const lengthData = PLC.newTag(
              `${tagNameArray}[${i}].MATERIAL[${id}].LEN`
            );
            const dataValue = PLC.newTag(
              `${tagNameArray}[${i}].MATERIAL[${id}].DATA`,
              null,
              false,
              1,
              15
            );

            await PLC.readTag(lengthData);
            await PLC.readTag(dataValue);

            const bufferAB = bufToArray(Buffer.from(name));
            const length = bufferAB.length;

            dataValue.value = bufferAB;
            lengthData.value = length;

            await PLC.writeTag(lengthData);
            await PLC.writeTag(dataValue);
          }
        });
        console.log(`Valores Actualizados en PLC con exito.`);
        return descriptionPLC;
      })
      .catch(async (e) => {
        console.error(e);
        throw new Error('No se pudo conectar al PLC');
      });
  }
}

module.exports = { ControladorABMES };
