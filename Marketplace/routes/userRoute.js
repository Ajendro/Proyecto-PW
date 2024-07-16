const express = require('express');
const router = express.Router();
const upload = require('../config/imagenes'); 
const userController = require('../controllers/userCrontroller');

router.post('/userscreate', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.put('/updateusers/:id', userController.updateUser);
router.delete('/deletedusers/:id', userController.deleteUser);
router.post('/imageusers/:userId/profile-picture', upload.single('profilePicture'), userController.uploadProfilePicture);

module.exports = router;
