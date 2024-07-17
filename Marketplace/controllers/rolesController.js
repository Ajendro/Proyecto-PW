const Role = require('../models/rolesModel');

exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newRole = new Role({ name, description });
        await newRole.save();
        res.status(201).json({ mensaje: 'Rol creado exitosamente', rol: newRole });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo crear el rol: Error interno del servidor', error: error.message });
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener roles', error: error.message });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener rol por ID', error: error.message });
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRole = await Role.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }
        res.status(200).json({ mensaje: 'Rol actualizado exitosamente', rol: updatedRole });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo actualizar el rol: Error interno del servidor', error: error.message });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }
        res.status(200).json({ mensaje: 'Rol eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo eliminar el rol: Error interno del servidor', error: error.message });
    }
};
