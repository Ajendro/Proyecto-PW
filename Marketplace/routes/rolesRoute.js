const express = require('express');
const router = express.Router();
const roleController = require('../controllers/rolesController');

router.post('/rolescreate', roleController.createRole);
router.get('/roles', roleController.getRoles);
router.get('/rol/:id', roleController.getRoleById);
router.put('/updateroles/:id', roleController.updateRole);
router.delete('/deleteroles/:id', roleController.deleteRole);

module.exports = router;
