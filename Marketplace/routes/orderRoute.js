const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orderscreate', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/order/:id', orderController.getOrderById);
router.put('/updateorders/:id', orderController.updateOrder);
router.delete('/deletedorders/:id', orderController.deleteOrder);

module.exports = router;
