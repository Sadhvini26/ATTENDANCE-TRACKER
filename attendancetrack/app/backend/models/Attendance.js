const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    date: Date,
    status: Boolean,
  });

  
  module.exports = mongoose.model('Attendance', attendanceSchema);