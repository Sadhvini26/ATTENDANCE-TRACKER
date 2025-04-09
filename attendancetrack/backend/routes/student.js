const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { markAttendance, selectProject } = require('../controllers/studentController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/attendance', authenticate, markAttendance);
router.post('/project', authenticate, selectProject);

module.exports = router;
