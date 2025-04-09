const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    message: String,
    targetRole: String,
    date: Date,
  });
  
  module.exports = mongoose.model('Notification', notificationSchema);
  