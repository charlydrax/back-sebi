const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/api/user/add', userCtrl.signup);
router.post('/api/user/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/test', userCtrl.test);
router.get('/api_users', userCtrl.api_users);
router.get('/', userCtrl.home);
router.get('/api/test', userCtrl.create_test);


module.exports = router;