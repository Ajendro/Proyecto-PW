const express = require('express');
const router = express.Router(); 
const upload = require('../config/imagenes'); 
const productController = require('../controllers/productController');

router.post('/productscreate',upload.single('Productimage'),productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProductById);
router.put('/updateproducts/:id',upload.single('Productimage'), productController.updateProduct);
router.delete('/deleteproducts/:id', productController.deleteProduct);

module.exports = router;
