const mongoose = require('mongoose');

const Attendance = require('../models/Attendance');
const Project = require('../models/Project');

exports.markAttendance = async (req, res, next) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    next(err);
  }
};

exports.selectProject = async (req, res, next) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};