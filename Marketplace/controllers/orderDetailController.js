const OrderDetail = require('../models/orderDetailModel');

exports.createOrderDetail = async (req, res) => {
    try {
        const newOrderDetail = new OrderDetail(req.body);
        await newOrderDetail.save();
        res.status(201).json({ message: 'Orden de detalles creado exitosamente', orderDetail: newOrderDetail });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo crear el oden de detalles: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo crear el orden de detalles: Error interno del servidor', error: error.message });
        }
    }
};


exports.getOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetail.find();
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener oden de detalles', error: error.message });
    }
};


exports.getOrderDetailById = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.findById(req.params.id);
        if (!orderDetail) {
            return res.status(404).json({ message: 'Oden de detalles no encontrado' });
        }
        res.status(200).json(orderDetail);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener orden de detalles por ID', error: error.message });
    }
};


exports.updateOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrderDetail = await OrderDetail.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOrderDetail) {
            return res.status(404).json({ message: 'Orden de detalles no encontrado' });
        }
        res.status(200).json({ message: 'Orden de detalles actualizado exitosamente', orderDetail: updatedOrderDetail });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo actualizar el orden de detalles: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo actualizar el orden de detalles: Error interno del servidor', error: error.message });
        }
    }
};

exports.deleteOrderDetail = async (req, res) => {
    try {
        const deletedOrderDetail = await OrderDetail.findByIdAndDelete(req.params.id);
        if (!deletedOrderDetail) {
            return res.status(404).json({ message: 'Orden de detalles  no encontrado' });
        }
        res.status(200).json({ message: 'Orden de detalles eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el orden de detalles: Error interno del servidor', error: error.message });
    }
};


