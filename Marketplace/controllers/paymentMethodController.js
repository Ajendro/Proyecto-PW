// paymentMethodController.js
const PaymentMethod = require('../models/paymentMethodModel');
const { sendPaymentConfirmationEmail } = require('../utils/sendEmail'); // Asegúrate de la ruta correcta

exports.createPaymentMethod = async (req, res) => {
    try {
        const { userId, email, cardNumber, expiry, cvc, name, address, zip, ownerName, paymentMethodType } = req.body;
        console.log('Datos recibidos:', { userId, email, cardNumber, expiry, cvc, name, address, zip, ownerName, paymentMethodType });

        if (!userId || !email) {
            return res.status(400).json({ error: 'ID del usuario o correo electrónico no proporcionado' });
        }

        // Crear y guardar el nuevo método de pago
        const newPaymentMethod = new PaymentMethod({
            user: userId,
            email,
            cardNumber,
            expiry,
            cvc,
            name,
            address,
            zip,
            ownerName,
            paymentMethodType,
        });

        await newPaymentMethod.save();

        // Llamar a la función para enviar el correo electrónico
        await sendPaymentConfirmationEmail(email, cardNumber, paymentMethodType);

        // Responder con éxito
        res.status(201).json({ message: 'Método de pago registrado con éxito' });
    } catch (error) {
        console.error('Error al crear el método de pago:', error);
        res.status(500).json({ error: 'Error al registrar el método de pago', details: error.message });
    }
};

exports.getPaymentMethods = async (req, res) => {
    try {
        const { _id } = req.body; // Obtener el _id del cuerpo de la solicitud

        if (!_id) {
            return res.status(400).json({ error: 'ID del usuario no proporcionado' });
        }

        // Obtener los métodos de pago del usuario usando _id
        const paymentMethods = await PaymentMethod.find({ user: _id }).exec();
        res.status(200).json({ paymentMethods });
    } catch (error) {
        console.error('Error fetching payment methods:', error);
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
        const { cardNumber, expiry, cvc, name, address, zip, ownerName, paymentMethodType  } = req.body;

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
            ownerNamem
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


exports.getProductsAndPaymentMethods = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Obtener métodos de pago
        const paymentMethods = await PaymentMethod.find({ user: userId }).exec();
        if (!paymentMethods.length) {
            return res.status(404).json({ error: 'Métodos de pago no encontrados para el usuario' });
        }

        // Obtener productos comprados
        const products = await Product.find({ userId: userId }).exec();
        if (!products.length) {
            return res.status(404).json({ error: 'Productos no encontrados para el usuario' });
        }

        // Responder con productos y métodos de pago
        res.status(200).json({ paymentMethods, products });
    } catch (error) {
        console.error('Error fetching payment methods and products:', error);
        res.status(500).json({ error: 'No se pudo obtener los métodos de pago y productos: Error interno del servidor', details: error.message });
    }
};