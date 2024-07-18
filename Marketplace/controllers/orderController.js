const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: 'Orden creado exitosamente', order: newOrder });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo crear el order: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo crear el order: Error interno del servidor', error: error.message });
        }
    }
};


exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ordenes', error: error.message });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrado' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener orden por ID', error: error.message });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Orden no encontrado' });
        }
        res.status(200).json({ message: 'Orden actualizado exitosamente', order: updatedOrder });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo actualizar el orden: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo actualizar el orden: Error interno del servidor', error: error.message });
        }
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Orden no encontrado' });
        }
        res.status(200).json({ message: 'Orden eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el orden: Error interno del servidor', error: error.message });
    }
};


