const express = require('express');

const PingController = require('../controllers/PingController');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', PingController.ping);
router.post('/register', UserController.register);

module.exports = router;
