const _ = require('lodash');
const boom = require('@hapi/boom');
const PjAcceptance = require('../../../models/projects/acceptance.model');

const updateDynamicAcceptance = async (_id, signatory, serviceValue, recommendations) => {
  console.log(`Consultando id: ${_id}`);
  //Obtener los datos del acta
  try {
    //Consultar registro
    console.log(`Consultando id: ${_id}`);
    const data = await readAcceptanceById(_id);
    console.log({ data });
    //Ultimo estado reportado
    const lastStage = await getLastStageName(data);
    console.log({ lastStage });
    //Evaluar los Stage y actualizar según el Stage
    var updatedAcceptance;
    switch (lastStage) {
      case 'new':
        const updateStepOne = {
          $set: {
            'signatory.contractor': signatory.contractor,
          },
          $push: {
            stage: {
              name: 'signedByContractor',
              completed: true,
            },
          },
        };
        console.log({ updateStepOne });
        updatedAcceptance = await setAcceptanceById(_id, updateStepOne);
        console.log({ updatedAcceptance });
        //Envía un correo al cliente con los datos para actualizar
        break;
      case 'signedByContractor':
        const updateStepTwo = {
          $set: {
            'signatory.client': signatory.client,
            'serviceValue': serviceValue,
            'recommendations': recommendations,
          },
          $push: {
            stage: {
              name: 'signedByClient',
              completed: true,
            },
          },
        };

        updatedAcceptance = await setAcceptanceById(_id, updateStepTwo);

        //Recibe la firma por parte del cliente y cambia el estado a "signClient"
        if (data.typeAcceptance === 'Parcial') {
          //El estado se mantiene igual
          //Se envía correo al gerente de proyecto del contractor para aceptación final.
          //TODO: Implementar envio de correo al gerente para cierre final del acta.
        } else {
          //Se empuja el estado de cerrado.
          const updateStepThree = {
            $push: {
              stage: {
                name: 'closed',
                completed: true,
              },
            },
          };
        };
          updatedAcceptance = await setAcceptanceById(_id, updateStepThree);
          break;
      case 'signedByClient':
        //Se debe enviar una aceptación de los pendientes
        const updateStepThree = {
          $push: {
            stage: {
              name: 'closed',
              completed: true,
            },
          },
        };

        updatedAcceptance = await setAcceptanceById(_id, updateStepThree);

        break;
      default:
        console.log('No se encontró ningún stage con ese nombre');
        result = 'No se encontró ningún stage con ese nombre';
        return updatedAcceptance;
    }
    return updatedAcceptance;
    } catch (err) {
      return err;
    }
  }


const setAcceptanceById = async (_id, update) => {
  try {
    console.log(`id para setAccep ${_id}`);
    const updateAcceptance = await PjAcceptance.findByIdAndUpdate(_id, update, {
      new: true,
    });

    if (updateAcceptance != null) {
      return updateAcceptance;
    } else {
      //TODO: Validar error boom en la función setAcceptanceById del archivo stage
      throw boom.notFound(`Oops!, acta con _id:${_id}, no encontrada`);;
    }
  } catch (err) {
    return err;
  }
};

const readAcceptanceById = async (_id) => {
  try {
    const acceptance = await PjAcceptance.findById(_id);
    if (acceptance != null) {
      return acceptance;
    } else {
      throw boom.notFound(`Oops!, acta con _id:${_id}, no encontrada`);
      throw boom.notFound(`Oops!, acta con _id:${_id}, no encontrada`);
    }
  } catch (err) {
    return err;
  }
};


const findSomeStageComplete = async (data, someStageName) => {
  // const data = await readAcceptanceById(_id);
  const existingStageComplete = data.stage.some(
    (stageSome) =>
      stageSome.name === someStageName && stageSome.completed === true
  );
  console.log(`Se encontró el estado ${someStageName} completo en el array`);
  const result = existingStageComplete === true ? someStageName : false;
  return result;
};


const updateSelectionStage = async (_id, stage) => {
  //Obtener los datos de la base datos por medio del _id
  const data = await readAcceptanceById(_id);
  //Identifica si el registro cumple con el estado buscado
  const confirmStage = await findSomeStageComplete(data, stage);
  return confirmStage;
};


const getLastStageName = async (data) => {
  const stages = _.orderBy(data.stage, ['date'], ['desc']);
  return stages.length > 0 ? stages[0].name : null;
};


module.exports = {
  updateDynamicAcceptance,
  setAcceptanceById,
  findSomeStageComplete,
  getLastStageName,
};
