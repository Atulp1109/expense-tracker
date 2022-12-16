const express = require('express');
const app= express();
const cors = require('cors');
require('dotenv').config({path:"./config.env"});

const port =process.env.PORT||5000;

//using middleware
app.use(cors());
app.use(express.json());
//mongo connection
const con=require('./db/connection');

//using routes
app.use(require('./routes/route'))

//listening
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})