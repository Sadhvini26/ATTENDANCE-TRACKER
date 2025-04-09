const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    studentId: mongoose.Schema.Types.ObjectId,
    type: String,
    title: String,
  });
  
  module.exports = mongoose.model('Project', projectSchema);