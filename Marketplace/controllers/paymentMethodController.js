const PaymentMethod = require('../models/paymentMethodModel');

exports.createPaymentMethod = async (req, res) => {
    try {
        const newPaymentMethod = new PaymentMethod(req.body);
        await newPaymentMethod.save();
        res.status(201).json({ message: 'Metodo de pago  creado exitosamente', paymentMethod: newPaymentMethod });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo crear el metodo de pago: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo crear el metodo de pago: Error interno del servidor', error: error.message });
        }
    }
};


exports.getPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.status(200).json(paymentMethods);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener metodos de pagos', error: error.message });
    }
};


exports.getPaymentMethodById = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'Metodo de pago no encontrado' });
        }
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el metodo de pago por ID', error: error.message });
    }
};


exports.updatePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPaymentMethod) {
            return res.status(404).json({ message: 'Metodo de pago no encontrado' });
        }
        res.status(200).json({ message: 'Metodo de pago actualizado exitosamente', paymentMethod: updatedPaymentMethod });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo actualizar el metodo de pago: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo actualizar el metodo de pago: Error interno del servidor', error: error.message });
        }
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
        if (!deletedPaymentMethod) {
            return res.status(404).json({ message: 'Metodo de pago no encontrado' });
        }
        res.status(200).json({ message: 'Metodo de pago eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el metodo de pago: Error interno del servidor', error: error.message });
    }
};
