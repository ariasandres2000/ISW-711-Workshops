const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses');

router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);
router.put('/', courseController.updateCourse);
router.delete('/', courseController.deleteCourse);

module.exports = router;