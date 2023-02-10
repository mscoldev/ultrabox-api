const { response, request } = require('express');


const Register = require('../../models/scale/register.model');
const Truck = require('../../models/scale/truck.model');

const { createDriverFromRegister } = require('../../controllers/scale/driver.controller')


const getRegisters = async (req = request, res = response) => {
    try {
        const { limit, order, offset } = req.query;
        const registers = await Register.findAll({
            where: { enabled: true },
            include: { all: true },
            order: [['createdAt', order]],
            limit: limit,
            offset: offset
        });

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

const getLastRegisterByNumberPlate = async (req = request, res = response) => {

    try {
        const { numberPlate } = req.params
        const { limit, order, status, ...query } = req.query;

        const truckData = await Truck.findOne({ where: { numberPlate: numberPlate } });

        if (!truckData) {
            return res.status(404).json({ msg: 'El vehiculo ${numberPlate} no se ecuentra registrado' })
        }
        const registers = await Register.findOne({
            where: {
                _idTruck: truckData.id,
                status: status,
                enabled: true
            },
            include: { all: true },
            order: [['createdAt', order]],
            limit: limit
        });

        if (registers != null) {
            return res.status(200).json({
                msg: `Registro(s) activos para el vehiculo ${numberPlate}:`,
                registers
            })
        }
        return res.status(404).json({
            msg: `No se encontraron registros activos en estado "${status}" para el vehiculo de placas ${numberPlate}.
            Verifique los valores de la consulta o compruebe si "status" es valido.` })
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


            //*Identificar Cargando o Descargando

            if (newRegister.secondWeight > newRegister.weight) {
                //Estaba Cargando
                newRegister.tare = newRegister.weight;
                newRegister.groosWeight = newRegister.secondWeight;
                newRegister.netWeight = newRegister.groosWeight - newRegister.tare
                newRegister.operation = 'Cargando'

                console.log(`Primera Medida: ${newRegister.weight}`);
                console.log(`Segunda Medida: ${newRegister.secondWeight}`);
                console.log('####Cargando...');
            } else {
                //Estaba Descarnado
                console.log('####Descargando...');
                console.log(`Primera Medida: ${newRegister.weight}`);
                console.log(`Segunda Medida: ${newRegister.secondWeight}`);
                newRegister.operation = 'Descargando'
                newRegister.tare = newRegister.secondWeight;
                newRegister.groosWeight = newRegister.weight;
                newRegister.netWeight = newRegister.groosWeight - newRegister.tare
            }


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


const deleteRegisterById = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const deletedRegister = await Register.findByPk(id)
        if (deletedRegister != null) {

            deletedRegister.enabled = false;
            deletedRegister.save();


            res.status(202).json({
                msg: `Registro con Id: ${id}, eliminado`
            });
        } else {
            res.status(404).json({
                msg: `Registro con Id: ${id}, no encontrado, verifique el Id ingresado.`
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


const createRegister = async (req = request, res = response) => {
    const {
        weight,
        status,
        userRecorder,
        _idProduct,
        driver,
        _idTruck,
        _idClient,
        _idOrigin,
        _idSite,
        enabled } = req.body;

    if (driver._idDriver != null) {
        try {
            const getLastSerialLog = await Register.max('serialLog');
            const newRegister = await Register.create({
                serialLog: getLastSerialLog + 1,
                weight,
                dateWeight: null,
                status,
                userRecorder,
                _idProduct,
                _idDriver: driver._idDriver,
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
            return res.status(500).json({ message: `Oops! ha producido un error: ${err.message}` })
        }

    } else {
        try {
            const getLastSerialLog = await Register.max('serialLog');
            const newDriver = await createDriverFromRegister(driver)

            const newRegister = await Register.create({
                serialLog: getLastSerialLog + 1,
                weight,
                dateWeight: null,
                status,
                userRecorder,
                _idProduct,
                _idDriver: await newDriver.id,
                _idTruck,
                _idClient,
                _idOrigin,
                _idSite,
                enabled
            });
            res.status(201).json({
                msg: 'Registro creado satisfactoriamente!',
                newDriver,
                newRegister
            })

        } catch (err) {
            return res.status(500).json({ message: `Oops! ha producido un error: ${err.message}` })
        }

    }
}




module.exports = {
    getRegisters,
    getRegisterById,
    getLastRegisterByNumberPlate,
    updateRegisterById,
    deleteRegisterById,
    createRegister
}