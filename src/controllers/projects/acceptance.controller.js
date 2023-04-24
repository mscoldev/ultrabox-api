const { response, request } = require('express');
const boom = require('@hapi/boom');
const { Types } = require('mongoose');
const PjAcceptance = require('../../models/projects/acceptance.model');

const {
  updateDynamicAcceptance,
  setAcceptanceById,
  findSomeStageComplete,
} = require('../../helpers/validators/projects/stages');

const getAcceptanceById = async (req = request, res = response, next) => {
  try {
    const { _id, _codeProjectERP } = req.query;
    if ((_id == undefined) & (_codeProjectERP == undefined)) {
      throw boom.badRequest(
        'Debe definir mínimo un parámetro de consulta: _id o _codeProjectERP'
      );
    } else {
      //*Aquí buscamos en la base de datos por cualquiera de los dos parámetros.
      const acceptance = await PjAcceptance.findOne({
        $or: [{ _codeProjectERP }, { _id }],
      }).populate({ path: '_idFiles', model: 'File' });
      if (acceptance != null) {
        res.status(200).json({
          msg: 'Acta de aceptación',
          acceptance,
        });
      } else {
        throw boom.notFound(
          `Oops!, no se encontraron actas con alguno de los parámetros de búsqueda ingresados.`
        );
      }
    }
  } catch (err) {
    next(err);
  }
};

const setAcceptance = async (req = request, res = response, next) => {
  //* Crear un acta por medio del formulario y asignar por defecto la condición de "new". No permitir el ingreso de firmas en el primer estado.

  try {
    const stage = { name: 'new', date: Date.now(), completed: true };
    const { signatory, ...data } = req.body;
    data['stage'] = stage;
    const newAcceptance = new PjAcceptance(data);
    const acceptanceSaved = await newAcceptance.save();
    console.log(acceptanceSaved);
    res.status(200).json({
      msg: 'Nueva acta de aceptación de proyecto almacenada',
      acceptanceSaved,
    });
  } catch (err) {
    next(err);
  }
};

//TODO: Implementar actualización general de acta sin mensajes de rechazo.
//TODO: Implementar cambios de estado del acta automatizados desde el backend.

const updateAcceptanceById = async (req = request, res = response, next) => {
  try {
    const body = req.body;
    const { stage, signatory, serviceValue, recommendations } = req.body;
    const { rejectedMessage } = body;
    const _id = Types.ObjectId(req.params._id);

    //* Si el Stage del acta es new se reciben los datos para la firma por parte del contractor.
    //* las otros datos no se tienen en cuenta, debe verificarse el si stage es rejected al momento te recibir
    //* de ser asi, se almacena el rejectedMessage.description y el stage tendría un rejected

    //TODO: Terminar de validar el caso de mensajes rechazados.
    const description = data?.rejectedMessage?.description;
    // const a = typeof description === 'string';

    if (rejectedMessage) {
      const RejectedMessage = {
        $push: { rejectedMessage: rejectedMessage },
      };
      const updatedAcceptance = await setAcceptanceById(
        _id,
        RejectedMessage,
        serviceValue,
        recommendations
      );
      console.log('Activado rejected');
      res.status(200).json({
        msg: 'Acta actualizada',
        updatedAcceptance,
      });
    } else {
      const updatedAcceptance = await updateDynamicAcceptance(
        _id,
        signatory,
        serviceValue,
        recommendations
      );
      console.log('Activado updated');
      res.status(200).json({
        msg: 'Acta actualizada',
        updatedAcceptance,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  setAcceptance,
  getAcceptanceById,
  updateAcceptanceById,
};
