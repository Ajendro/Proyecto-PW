const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, userId } = req.body;
        let imageUrl = null;

        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        // Verifica si userId está definido y es un ObjectId válido
        if (!userId) {
            return res.status(400).json({ mensaje: 'ID de usuario no proporcionado' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            productImage: imageUrl,
            user: userId // Usa el ID del usuario proporcionado
        });

        await newProduct.save();
        res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: newProduct });
    } catch (error) {
        res.status(500).json({ mensaje: 'No se pudo crear el producto: Error interno del servidor', error: error.message });
    }
};

// Resto de los controladores no cambiaron
exports.getProducts = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const filter = categoryId ? { category: categoryId } : {};
        const products = await Product.find(filter);
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
