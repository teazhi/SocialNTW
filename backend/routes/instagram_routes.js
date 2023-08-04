const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller'); // Update the import path

router.get('/dashboard', userController.getInstagramDashboard);

module.exports = router;
