const mongoose = require('mongoose');

const User = require('../models/User');

exports.getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (err) {
    next(err);
  }
};
