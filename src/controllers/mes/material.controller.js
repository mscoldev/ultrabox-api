const { response, request } = require('express');
const boom = require('@hapi/boom');
const { Types } = require('mongoose');
const Material = require("../../models/material.model");
const setValuesToPLC = require("../../controllers/mes/PLCs/plcs.controller");


const updateMaterialToPLC = async (req = request, res = response, next) => {
  const infoPLC = {
    ip: '192.168.201.108',
    slot: 3,
    nameTagChannelIn: 'TOLVA',
    limitInputs: 14,
    limitMaterials: 14,

  }

  const materials = [{
    name: 'CLINKER',
    _idController: 0
  }, {
    name: 'CALIZA',
    _idController: 1
  },
  {
    name: 'YESO',
    _idController: 2
  },
  {
    name: 'ESCORIA',
    _idController: 3
  },
  {
    name: 'CENIZA',
    _idController: 4
  },
  {
    name: 'ARCILLA T',
    _idController: 5
  }, ,
  {
    name: 'ANDESITA',
    _idController: 8
  }
  ]
  try {
    const responsePLC = setValuesToPLC(infoPLC, materials);
    if (!responsePLC) {
      throw boom.failedDependency('Falla en el modulo de conexion con controlador')
    }
    res.status(200).json({
      msg: 'Materiales actualizados en PLC',
      responsePLC: responsePLC
    })
  } catch (err) {
    next(err);
  }
}

const getMaterials = async (req = request, res = response,) => {
  try {
    const materials = await Material.find({ "deleted": false }).populate([{
      path: 'productionLineUse',
      model: 'ProductionLine',
      options: { lean: true },
      select: { name: 1 }
    }])
      .populate({
        path: 'unit',
        model: 'Unit',
      })
      .exec();
    res.status(200).json({
      msg: 'List of materials',
      materials
    })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


//TODO: Implementar verificacion de tipo de datos al realizar busquedas por ID.

const getMaterialsById = async (req = request, res = response, next) => {
  try {
    const material = await Material.findById(req.params.materialId);
    if (material != null) {
      res.status(200).json({
        msg: 'Material por Id',
        material
      })
    } else {
      throw boom.notFound('Material not found')
    }
  } catch (err) {
    next(err);
  }
}

const getMaterialsByLine = async (req = request, res = response, next) => {

  try {

    const { productionLineUse } = req.query
    const arrayProductionLineUse = productionLineUse.split(",");
    const objectIdArray = arrayProductionLineUse.map(id => Types.ObjectId(id));

    console.log(objectIdArray);

    const material = await Material.find({ 'productionLineUse': { $in: objectIdArray } })
      .populate([{
        path: 'productionLineUse',
        model: 'ProductionLine',
        options: { lean: true },
        select: { name: 1 }
      }])
      .populate({
        path: 'unit',
        model: 'Unit',
      })
      .exec();

    if (material != null) {
      res.status(200).json({
        msg: 'Materiales por linea de produccion',
        material
      })
    } else {
      throw boom.notFound('Material no encontrado')
    }

  } catch (err) {

    next(err);
  }

}

const updateMaterialById = async (req = request, res = response) => {
  try {
    const paramsId = req.params.materialId;
    const body = req.body;

    const updatedMaterial = await Material.findByIdAndUpdate(paramsId, body, { new: true });
    if (updatedMaterial != null) {
      res.status(200).json({
        msg: 'Material actualizado por Id',
        updatedMaterial
      });
    } else {
      res.status(404).json({
        msg: 'Material no encontrado, verifique el Id ingresado'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

const deleteMaterialById = async (req = request, res = response) => {
  try {
    const paramsId = req.params.materialId;
    const body = { deleted: true }
    const deletedMaterial = await Material.findByIdAndUpdate(paramsId, body);
    if (deletedMaterial != null) {
      res.status(202).json({
        msg: 'Material eliminado Id:' + paramsId
      });
    } else {
      res.status(404).json({
        msg: 'Material no encontrado, verifique el Id ingresado'
      })
    }
  } catch (error) { // Set custom error for unique keys
    let errMsg;
    if (error.code == 11000) {
      errMsg = Object.keys(error.keyValue)[0] + " already exists.";
    } else {
      errMsg = error.message;
    }
    res.status(400).json({ statusText: "Bad Request", message: errMsg });
  };
}

const createMaterial = async (req = request, res = response) => {
  //TODO: Usar desestructuracion de objetos
  try {
    const body = req.body;
    console.log(body);
    const material = new Material(body);

    const materialSaved = await material.save();

    res.status(201).json({
      msg: 'Material created successfully',
      materialSaved
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

}



module.exports = {
  createMaterial,
  getMaterials,
  getMaterialsById,
  getMaterialsByLine,
  updateMaterialById,
  deleteMaterialById,
  updateMaterialToPLC
}
