const { response, request } = require('express');
const Register = require('../../models/scale/register.model');


const getRegisters = async (req = request, res = response) => {
    try {
        const registers = await Register.findAll();
        res.status(200).json({
            msg: 'Lista de vehiculos',
            registers
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getRegisterById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const Register = await Register.findByPk(id);
        if (register != null) {
            res.status(200).json({
                msg: 'Información del Vehiculo',
                register
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Vehiculo no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateRegisterById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { numberPlate, model, color, RegisterName, enable } = req.body;
        const newRegister = await Register.findByPk(id);

        if (newRegister != null) {
            console.log('found');

            newRegister.numberPlate = numberPlate;
            newRegister.model = model;
            newRegister.color = color;
            newRegister.RegisterName = RegisterName;
            newRegister.enable = enable;

            await newRegister.save();

            res.status(200).json({
                msg: 'Origen actualizado',
                newRegister
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Registero no encontrado, verifique id'
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
        const { date,
            serialScale,
            serialLog,
            qty,
            groosWeigth,
            netWeigth,
            tare,
            status,
            dateTara,
            dateNeto,
            error,
            userRecorder,
            _idProduct,
            _idDriver,
            _idTruck,
            _idClient,
            _idOrigin,
            _idProject,
            enabled } = req.body;

        const newRegister = await Register.create({
            date,
            serialScale,
            serialLog,
            qty,
            groosWeigth,
            netWeigth,
            tare,
            status,
            dateTara,
            dateNeto,
            error,
            userRecorder,
            _idProduct,
            _idDriver,
            _idTruck,
            _idClient,
            _idOrigin,
            _idProject,
            enabled
        });

        res.status(201).json({
            msg: 'Origen creado satisfactoriamente!',
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