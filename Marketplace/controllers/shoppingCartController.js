const ShoppingCart = require('../models/shoppingCartModel');

// Crear un nuevo carrito de compras
exports.createShoppingCart = async (req, res) => {
    try {
        const { cartItems, total } = req.body;

        // Verifica que se envíen los elementos del carrito
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'El carrito de compras no puede estar vacío.' });
        }

        // Crea un nuevo carrito de compras
        const newShoppingCart = new ShoppingCart({
            products: cartItems.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            total: total // Guarda el total en el carrito de compras
        });

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

// Obtener todos los carritos de compras
exports.getAllShoppingCarts = async (req, res) => {
    try {
        const shoppingCarts = await ShoppingCart.find();
        res.status(200).json(shoppingCarts);
    } catch (error) {
        res.status(500).json({ message: 'No se pudo obtener los carritos de compras: Error interno del servidor', error: error.message });
    }
};

// Obtener un carrito de compras por su ID
exports.getShoppingCartById = async (req, res) => {
    try {
        const shoppingCart = await ShoppingCart.findById(req.params.id);
        if (!shoppingCart) {
            return res.status(404).json({ message: 'Carrito de compras no encontrado' });
        }
        res.status(200).json(shoppingCart);
    } catch (error) {
        res.status(500).json({ message: 'No se pudo obtener el carrito de compras: Error interno del servidor', error: error.message });
    }
};

// Actualizar un carrito de compras por su ID
exports.updateShoppingCart = async (req, res) => {
    try {
        const { cartItems, total } = req.body;

        // Verifica que se envíen los elementos del carrito
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'El carrito de compras no puede estar vacío.' });
        }

        const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(
            req.params.id,
            {
                products: cartItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity
                })),
                total: total // Actualiza el total
            },
            { new: true, runValidators: true }
        );

        if (!updatedShoppingCart) {
            return res.status(404).json({ message: 'Carrito de compras no encontrado' });
        }

        res.status(200).json({ message: 'Carrito de compras actualizado exitosamente', shoppingCart: updatedShoppingCart });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'No se pudo actualizar el carrito de compras: Validación fallida', error: error.message });
        } else {
            res.status(500).json({ message: 'No se pudo actualizar el carrito de compras: Error interno del servidor', error: error.message });
        }
    }
};

// Eliminar un carrito de compras por su ID
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
