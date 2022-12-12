const { response, request } = require('express');
const Role = require("../../models/role.model");


const getRoles = async (req = request, res = response) => {
    try {
        const roles = await Role.find({ "deleted": false });
        res.status(200).json({
            msg: 'List of Roles',
            roles
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getRoleById = async (req = request, res = response) => {
    const role = await Role.findById(req.params._id);
    if (role != null) {
        res.status(200).json({
            msg: 'Role por Id',
            role
        });
    } else {
        res.status(404).json({
            msg: 'Role no encontrado, verifique el Id ingresado'
        })
    }
}

const updateRoleById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        const body = req.body;
        const updatedRole = await Role.findByIdAndUpdate(paramsId, body, { new: true });
        if (updatedRole != null) {
            res.status(200).json({
                msg: 'Role actualizado por Id',
                updatedRole
            });
        } else {
            res.status(404).json({
                msg: 'Role no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteRoleById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        console.log(paramsId);
        const body = { deleted: true }
        const deletedRole = await Role.findByIdAndUpdate(paramsId, body);
        console.log(deletedRole);
        if (deletedRole != null) {
            res.status(200).json({
                msg: 'Role eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Role no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createRole = async (req = request, res = response) => {
    //TODO: Usar desestructuracion de objetos
    try {
        const body = req.body;
        console.log(body);
        const role = new Role(body);

        const roleSaved = await role.save();

        res.status(201).json({
            msg: 'Role created successfully',
            roleSaved
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}



module.exports = { createRole, getRoles, getRoleById, updateRoleById, deleteRoleById }