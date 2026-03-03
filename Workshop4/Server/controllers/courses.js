const Course = require('../models/course');

exports.getCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};

exports.createCourse = async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
};

exports.updateCourse = async (req, res) => {
    const updated = await Course.findByIdAndUpdate(req.query.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.query.id);
    res.json({ message: "Deleted" });
};