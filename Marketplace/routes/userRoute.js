const express = require('express');
const router = express.Router();
const upload = require('../config/imagenes'); 
const userController = require('../controllers/userController');

router.post('/userscreate', upload.single('profilePicture'),userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.put('/updateusers/:id',  upload.single('profilePicture'),userController.updateUser);
router.delete('/deletedusers/:id', userController.deleteUser);

module.exports = router;
