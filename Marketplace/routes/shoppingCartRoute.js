const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');

router.post('/shoppingCartscreate', shoppingCartController.createShoppingCart);
router.get('/shoppingCarts', shoppingCartController.getShoppingCarts);
router.get('/shoppingCart/:id', shoppingCartController.getShoppingCarttById);
router.put('/updateshoppingCarts/:id', shoppingCartController.updateShoppingCart);
router.delete('/deletedshoppingCarts/:id', shoppingCartController.deleteShoppingCart);

module.exports = router;
