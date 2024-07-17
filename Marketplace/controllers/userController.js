const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');

exports.createUser = async (req, res) => {
        try {
            const { username, phoneNumber, fullName, birthDate, gender, bio, role } = req.body;
            let profilePicturePath = null;

            if (req.file) {
                profilePicturePath = `/uploads/${req.file.filename}`;
            }

            const newUser = new User({
                username,
                phoneNumber,
                fullName,
                birthDate,
                gender,
                profilePicture: profilePicturePath,
                bio,
                role
            });

            const user = await newUser.save();
            res.status(201).json({ message: 'Usuario creado exitosamente', user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario por ID', error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo actualizar el usuario: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo actualizar el usuario: Error interno del servidor', error: error.message });
        }
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el usuario: Error interno del servidor', error: error.message });
    }
};

