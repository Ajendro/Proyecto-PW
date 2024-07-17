const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.post('/categoriescreate', categoryController.createCategory);
router.get('/categories', categoryController.getCategories);
router.get('/categorie/:id', categoryController.getCategoryById);
router.put('/updatecategories/:id', categoryController.updateCategory);
router.delete('/deletecategories/:id', categoryController.deleteCategory);

module.exports = router;
