const express = require('express')

const router = express.Router();




const courses = [
    {title:"First course", price:3000, duration:"120 mins"},
    {title:"Second course", price:3000, duration:"120 mins"},
    {title:"Third course", price:3000, duration:"120 mins"},
];

// get all courses
router.get('/courses', (req, res) => {
    return res.json(courses);
})






module.exports = router;