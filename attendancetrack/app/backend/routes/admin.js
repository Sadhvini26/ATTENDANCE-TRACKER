const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/users', authenticate, getAllUsers);

module.exports = router;
