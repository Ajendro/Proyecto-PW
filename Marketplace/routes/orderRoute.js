const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orderscreate', orderController.createOrder);
router.post('/orders', orderController.getOrders);
router.post('/order/:id', orderController.getOrderById);
router.put('/updateorders/:id', orderController.updateOrder);
router.delete('/deletedorders/:id', orderController.deleteOrder);

module.exports = router;
