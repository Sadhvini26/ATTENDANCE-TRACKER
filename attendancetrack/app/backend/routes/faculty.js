const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const { getStudents } = require('../controllers/facultyController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/students', authenticate, getStudents);

module.exports = router;
