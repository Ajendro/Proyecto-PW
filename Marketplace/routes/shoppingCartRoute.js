const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');

router.post('/shoppingCartscreate', shoppingCartController.createShoppingCart);
router.post('/shoppingCarts', shoppingCartController.getShoppingCarts);
router.post('/shoppingCart/:id', shoppingCartController.getShoppingCartById);
router.put('/updateshoppingCarts/:id', shoppingCartController.updateShoppingCart);
router.delete('/deletedshoppingCarts/:id', shoppingCartController.deleteShoppingCart);

module.exports = router;
