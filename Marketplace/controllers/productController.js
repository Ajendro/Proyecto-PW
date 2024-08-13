const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        let imageUrl = null;

        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            Productimage:imageUrl
        });

        await newProduct.save();
        res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: newProduct });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo crear el producto: Error interno del servidor', error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener producto por ID', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto actualizado exitosamente', producto: updatedProduct });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo actualizar el producto: Error interno del servidor', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo eliminar el producto: Error interno del servidor', error: error.message });
    }
};

