require('dotenv').config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

 

const app = express();
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');


app.use(express.json());

app.use(cors());

const port = process.env.PORT;



// register user routes

app.use('/api', userRoutes);

// register course routes

app.use('/api',courseRoutes);

app.listen(port, () => {
    console.log("server running in port " , port);
})


