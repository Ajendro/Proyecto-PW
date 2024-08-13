// paymentMethodController.js
const PaymentMethod = require('../models/paymentMethodModel');
const AuthUser = require('../models/authenticationModel'); // Modelo para la tabla de autenticación

exports.createPaymentMethod = async (req, res) => {
    try {
        // Supongamos que el email viene en el cuerpo de la solicitud o está disponible en la sesión
        const userEmail = req.body.email || req.session.email;
        
        if (!userEmail) {
            return res.status(400).json({ error: 'Correo electrónico del usuario no proporcionado' });
        }

        const { cardNumber, expiry, cvc, name, address, zip, ownerName } = req.body;

        // Verifica si todos los campos requeridos están presentes
        const requiredFields = ['cardNumber', 'expiry', 'cvc', 'name', 'address', 'zip', 'ownerName'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan campos requeridos: ${missingFields.join(', ')}` });
        }

        // Verifica que userEmail no sea undefined antes de llamar a toLowerCase()
        if (typeof userEmail !== 'string') {
            return res.status(400).json({ error: 'Correo electrónico inválido o no proporcionado' });
        }

        // Busca el usuario en la tabla de autenticación utilizando el email
        const authUser = await AuthUser.findOne({ email: userEmail.toLowerCase() });

        if (!authUser) {
            return res.status(404).json({ message: 'Usuario no encontrado en la tabla de autenticación' });
        }

        // Crea un nuevo método de pago
        const newPaymentMethod = new PaymentMethod({
            user: authUser._id,
            cardNumber,
            expiry,
            cvc,
            name,
            address,
            zip,
            ownerName
        });

        await newPaymentMethod.save();
        res.status(201).json({ message: 'Método de pago creado exitosamente', paymentMethod: newPaymentMethod });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'No se pudo crear el método de pago: Validación fallida', details: error.message });
        } else {
            res.status(500).json({ error: 'No se pudo crear el método de pago: Error interno del servidor', details: error.message });
        }
    }
};


// Obtener todos los métodos de pago
exports.getPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.status(200).json(paymentMethods);
    } catch (error) {
        console.error('Error getting payment methods:', error);
        res.status(500).json({ error: 'Error al obtener métodos de pago', details: error.message });
    }
};

// Obtener un método de pago por ID
exports.getPaymentMethodById = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }
        res.status(200).json(paymentMethod);
    } catch (error) {
        console.error('Error getting payment method by ID:', error);
        res.status(500).json({ error: 'Error al obtener método de pago por ID', details: error.message });
    }
};

// Actualizar un método de pago
exports.updatePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const { cardNumber, expiry, cvc, name, address, zip, ownerName } = req.body;

        // Verificar los campos requeridos
        const requiredFields = ['cardNumber', 'expiry', 'cvc', 'name', 'address', 'zip', 'ownerName'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Faltan campos requeridos: ${missingFields.join(', ')}` });
        }

        // Actualizar el método de pago
        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(id, {
            cardNumber,
            expiry,
            cvc,
            name,
            address,
            zip,
            ownerName
        }, { new: true });

        if (!updatedPaymentMethod) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }

        res.status(200).json({ message: 'Método de pago actualizado exitosamente', paymentMethod: updatedPaymentMethod });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: 'No se pudo actualizar el método de pago: Validación fallida', details: error.message });
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el método de pago: Error interno del servidor', details: error.message });
        }
    }
};

// Eliminar un método de pago
exports.deletePaymentMethod = async (req, res) => {
    try {
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
        if (!deletedPaymentMethod) {
            return res.status(404).json({ error: 'Método de pago no encontrado' });
        }
        res.status(200).json({ message: 'Método de pago eliminado exitosamente' });
    } catch (error) {
        console.error('Error deleting payment method:', error);
        res.status(500).json({ error: 'No se pudo eliminar el método de pago: Error interno del servidor', details: error.message });
    }
};
