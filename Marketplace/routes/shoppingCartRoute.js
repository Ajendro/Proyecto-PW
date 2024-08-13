const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');


router.post('/shoppingCarts', shoppingCartController.createShoppingCart);
router.post('/shoppingCarts/all', shoppingCartController.getAllShoppingCarts);
router.post('/shoppingCarts/:id', shoppingCartController.getShoppingCartById);
router.put('/shoppingCarts/:id', shoppingCartController.updateShoppingCart);
router.delete('/shoppingCarts/:id', shoppingCartController.deleteShoppingCart);

module.exports = router;
