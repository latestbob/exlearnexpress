const express = require('express')

const router = express.Router();



// all users routes
const users = [
    {
        name:"john",
        age:24
    },
    {
        name:"james",
        age:25
    },
];
router.get('/users', (req,res) => {
    return res.json(users);
})







module.exports = router;