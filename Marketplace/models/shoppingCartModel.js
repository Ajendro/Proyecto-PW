const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    total: { type: Number, required: true }, // Campo total para guardar el total del carrito
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);
