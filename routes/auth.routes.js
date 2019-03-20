const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/register', authController.authenticate);
router.get('/register', authController.logout);


module.exports = router;
