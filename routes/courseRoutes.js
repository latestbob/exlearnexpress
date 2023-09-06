const express = require('express')

const router = express.Router();

const courseController = require('../controllers/courseController');




// get all courses


router.get('/courses', courseController.getCourse);
// create new course

router.post('/course', courseController.createCourse);

// get unique course

router.get('/course/:coursecode', courseController.getUnique);







module.exports = router;