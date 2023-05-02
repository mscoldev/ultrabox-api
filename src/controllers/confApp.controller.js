const { response, request } = require('express');
const boom = require('@hapi/boom');
const ConfApp = require('../models/confApp.model');
const Device = require('../models/connections/device.model');

const getConfActiveCompany = async (req = request, res = response) => {
  try {
    const confAppCompany = await ConfApp.findOne({ deleted: false });
    res.status(200).json({
      msg: 'Configuracion de la compania',
      confAppCompany,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'Algo ha salido mal...',
    });
  }
};

const setConfCompany = async (req = request, res = response) => {
  try {
    const body = req.body;

    const { _id } = await ConfApp.findOne({ deleted: false });

    const confAppCompanySaved = await ConfApp.findByIdAndUpdate(_id, body, {
      new: true,
    });

    res.status(201).json({
      msg: 'Configuracion cargada',
      confAppCompanySaved,
    });
  } catch (err) {
    return res.status(500).json({
      msg: `Algo ha salido mal...${err.message}`,
    });
  }
};

const setConnectionDeviceController = async (req, res, next) => {
  try {
    const body = req.body;
    console.log({ body });
    const device = new Device(body);
    console.log({ device });
    const newDevice = await device.save();
    console.log({ newDevice });
    if (!newDevice) {
      throw boom.badRequest('Algo salió mal, verifica el requerimiento');
    } else {
      res.status(201).json({
        message: 'Un nuevo device ha sido creado con exito',
        newDevice,
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateConnectionDeviceController = async (req, res, next) => {
  try {
    const body = req.body;
    const { _id } = req.params;
    console.log({ body });
    const device = await Device.findByIdAndUpdate(_id, body, { new: true });
    if (!device) {
      throw boom.badRequest('Algo salió mal, verifica el requerimiento');
    } else {
      res.status(201).json({
        message: `Cambios aceptados para el device con _id:${_id}`,
        device,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getConfActiveCompany,
  setConfCompany,
  setConnectionDeviceController,
  updateConnectionDeviceController,
};
