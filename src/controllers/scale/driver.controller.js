const { response, request } = require('express');
const Driver = require('../../models/scale/driver.model');


const getDrivers = async (req = request, res = response) => {
    try {
        const drivers = await Driver.findAll({ where: { enabled: true } });
        res.status(200).json({
            msg: 'Lista de conductores',
            drivers
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getDriverById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findByPk(id);

        if (driver != null) {
            res.status(200).json({
                msg: 'Información del conductor',
                driver
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Cliente no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateDriverById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, nit, enable } = req.body;
        const driverUpdated = await Driver.findByPk(id);

        if (driverUpdated != null) {
            console.log('found');
            driverUpdated.name = name;
            driverUpdated.nit = nit;
            driverUpdated.enable = enable;

            await driverUpdated.save();

            res.status(200).json({
                msg: 'Conductor actualizado',
                driverUpdated
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Conductor no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}

const deleteDriverById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const deletedDriver = await Driver.findByPk(id);
        if (deletedDriver != null) {
            deletedDriver.enabled = false;

            await deletedDriver.save();

            res.status(200).json({
                msg: `El conductor con Id: ${id}, ha sido eliminado`
            });
        } else {
            res.status(404).json({
                msg: `El conductor con Id: ${id}, no ha sido encontrado verifique el Id nuevamente`
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createDriver = async (req = request, res = response) => {
    try {
        const { name, nit } = req.body
        const newDriver = await Driver.create({
            name,
            nit,
        });

        res.status(201).json({
            msg: 'Conductor creado satisfactoriamente!',
            newDriver
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getDrivers,
    getDriverById,
    updateDriverById,
    deleteDriverById,
    createDriver
}