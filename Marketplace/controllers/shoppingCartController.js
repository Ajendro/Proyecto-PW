const ShoppingCart = require('../models/shoppingCartModel');

exports.createShoppingCart = async (req, res) => {
    try {
        const newShoppingCart = new ShoppingCart(req.body);
        await newShoppingCart.save();
        res.status(201).json({ message: 'Carrito de compras creado exitosamente', shoppingCart: newShoppingCart });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo crear el carrito de compras: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo crear el carrito de compras: Error interno del servidor', error: error.message });
        }
    }
};


exports.getShoppingCarts = async (req, res) => {
    try {
        const shoppingCarts = await ShoppingCart.find();
        res.status(200).json(shoppingCarts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener carritos de compras', error: error.message });
    }
};


exports.getShoppingCartById = async (req, res) => {
    try {
        const cart = await ShoppingCart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito de compras no encontrado' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener carrito de compras por ID', error: error.message });
    }
};


exports.updateShoppingCart = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedShoppingCart) {
            return res.status(404).json({ message: 'Carrito de compras no encontrado' });
        }
        res.status(200).json({ message: 'Carrito de comrpas actualizado exitosamente', shoppingCart: updatedShoppingCart });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo actualizar el carrito de compras: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo actualizar el carrito de compras: Error interno del servidor', error: error.message });
        }
    }
};

exports.deleteShoppingCart = async (req, res) => {
    try {
        const deletedShoppingCart = await ShoppingCart.findByIdAndDelete(req.params.id);
        if (!deletedShoppingCart) {
            return res.status(404).json({ message: 'Carrito de compras no encontrado' });
        }
        res.status(200).json({ message: 'Carrito de compras eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar el carrito de compras: Error interno del servidor', error: error.message });
    }
};
