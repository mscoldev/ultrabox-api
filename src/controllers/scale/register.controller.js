const { response, request } = require('express');
const Register = require('../../models/scale/register.model');


const getRegisters = async (req = request, res = response) => {
    try {
        const registers = await Register.findAll();
        res.status(200).json({
            msg: 'Lista de registros',
            registers
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getRegisterById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const register = await Register.findByPk(id);
        if (register != null) {
            res.status(200).json({
                msg: 'Información del Registro',
                register
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Registro no encontrado, verifique el Id ingresado'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateRegisterById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { weight, status, userRecorder } = req.body;
        const newRegister = await Register.findByPk(id);

        if (newRegister != null) {

            newRegister.secondWeight = weight;
            newRegister.secondDateWeight = null; //trigger setValue
            newRegister.status = status;
            newRegister.userRecorder = userRecorder;

            //*Autocalcular
            // newRegister.netWeigth = "";
            // newRegister.dateTara = "";
            // newRegister.dateNet = "";



            await newRegister.save();

            res.status(200).json({
                msg: 'Registro actualizado con exito',
                newRegister
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Registro con encontrado, verifique el Id ingresado'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}

//TODO: Pendiente Implementar
const deleteRegisterById = async (req = request, res = response) => {
    try {
        const paramsId = req.params.RegisterId;
        const body = { deleted: true }
        const deletedRegister = await Register.findByIdAndUpdate(paramsId, body);
        if (deletedRegister != null) {
            res.status(200).json({
                msg: 'Registers eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Registers no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


const createRegister = async (req = request, res = response) => {
    try {
        const {
            weight,
            status,
            userRecorder,
            _idProduct,
            _idDriver,
            _idTruck,
            _idClient,
            _idOrigin,
            _idSite,
            enabled } = req.body;

        const newRegister = await Register.create({
            weight,
            dateWeight: null,
            status,
            userRecorder,
            _idProduct,
            _idDriver,
            _idTruck,
            _idClient,
            _idOrigin,
            _idSite,
            enabled
        });


        res.status(201).json({
            msg: 'Registro creado satisfactoriamente!',
            newRegister
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getRegisters,
    getRegisterById,
    updateRegisterById,
    deleteRegisterById,
    createRegister
}