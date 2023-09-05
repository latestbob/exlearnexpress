const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();


app.use(express.json());

app.use(cors());

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

// test endpoint

app.get('/users', (req, res) => {
    return res.json(users);
})


app.listen(process.env.PORT, () => {
    console.log("server running in port " , process.env.PORT);
})


