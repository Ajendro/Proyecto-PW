const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

router.post('/orderDetailscreate', orderDetailController.createOrderDetail);
router.get('/orderDetails', orderDetailController.getOrderDetails);
router.get('/orderDetail/:id', orderDetailController.getOrderDetailById);
router.put('/updateorderDetails/:id', orderDetailController.updateOrderDetail);
router.delete('/deletedorderDetails/:id', orderDetailController.deleteOrderDetail);

module.exports = router;