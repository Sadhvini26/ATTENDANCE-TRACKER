const mongoose = require('mongoose');


exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await require('../models/User').find();
      res.json(users);
    } catch (err) {
      next(err);
    }
  };