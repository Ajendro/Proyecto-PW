const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const Authentication = require('../models/authenticationModel');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res) => {
    try {
        const { username, phoneNumber, fullName, birthDate, gender, bio, role, email, password } = req.body;
        let profilePicturePath = null;

        // Validar los datos del usuario
        const validRoles = ['vendedor', 'cliente'];
        if (!validRoles.includes(role.toLowerCase())) {
            return res.status(400).json({ error: 'Rol no válido' });
        }

        if (!username || !phoneNumber || !fullName || !email || !password || !role) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        // Validar que el email no esté ya registrado
        const existingUser = await Authentication.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear una nueva instancia de usuario
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

        // Guardar el nuevo usuario en la base de datos
        const user = await newUser.save();

        // Crear una entrada de autenticación para el usuario
        const newAuthentication = new Authentication({
            user: user._id,
            email,
            password: hashedPassword // Guardar la contraseña hasheada
        });

        // Guardar la entrada de autenticación en la base de datos
        await newAuthentication.save();

        // Enviar respuesta de éxito
        res.status(201).json({ message: 'Usuario y autenticación creados exitosamente', user });
    } catch (err) {
        console.error('Error creating user or authentication:', err);
        res.status(500).json({ error: 'Error al crear el usuario o la autenticación: ' + err.message });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Error al obtener usuarios: ' + error.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'Error al obtener usuario por ID: ' + error.message });
    }
};



exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, phoneNumber, fullName, birthDate, gender, bio, role, email, password } = req.body;

        // Validar datos del usuario
        const validRoles = ['vendedor', 'cliente'];
        if (role && !validRoles.includes(role.toLowerCase())) {
            return res.status(400).json({ error: 'Rol no válido' });
        }

        if (!username || !phoneNumber || !fullName || !email || !role) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        // Validar que el nuevo email no esté ya registrado
        if (email) {
            const existingUserByEmail = await User.findOne({ email });
            if (existingUserByEmail && existingUserByEmail._id.toString() !== id) {
                return res.status(400).json({ error: 'El email ya está registrado' });
            }
        }

        // Hash de la nueva contraseña si se proporciona
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Actualizar el usuario
        const updateData = { 
            username, 
            phoneNumber, 
            fullName, 
            birthDate, 
            gender, 
            bio, 
            role, 
            email 
        };
        if (hashedPassword) {
            updateData.password = hashedPassword; // Solo se actualiza la contraseña si se proporciona una nueva
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar la entrada de autenticación si el email o la contraseña han cambiado
        if (email || password) {
            const updateAuthData = {};
            if (email) {
                updateAuthData.email = email;
            }
            if (hashedPassword) {
                updateAuthData.password = hashedPassword;
            }

            await Authentication.findOneAndUpdate({ user: id }, updateAuthData);
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'No se pudo actualizar el usuario: Validación fallida', details: error.message });
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el usuario: Error interno del servidor', details: error.message });
        }
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'No se pudo eliminar el usuario: Error interno del servidor', details: error.message });
    }
};

